const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../services/hasing.service");
const { generateOTP } = require("../services/generateOTP.service");
const { AddMinutesToDate } = require("../services/common.service");
const { sendPasswordOtpmail } = require("../services/sendOTPmail.service");

exports.sendPasswordRecoverymail = async (req, res) => {
  try {
    const email = req.body.email;
    if (email) {
      const otp = generateOTP();
      console.log(otp, "otp generated");
      const now = new Date();
      const minutesFromNow = AddMinutesToDate(now, 5);
      const queryObj = {
        verification: {
          otp: otp,
          validTill: minutesFromNow,
        },
      };

      const user = await User.findOneAndUpdate({ email: email }, queryObj);
      if (user) {
        sendPasswordOtpmail(email, otp);
        return res.status(200).json({
          success: true,
          message: `${otp} created and sent to ${user.email}`,
        });
      } else {
        return res.status(401).json({
          success: true,
          message: `could not find user with email: ${email}`,
        });
      }
    } else {
      return res.status(401).json({
        success: true,
        message: "need user email in payload",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.verifyOtpAndSetPassword = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    if (email && newPassword && otp) {
      const user = await User.findOne({ email: email });
      if (user) {
        const userOtp = user.verification.otp;
        const validTill = user.verification.validTill;
        const today = new Date();
        if (validTill > today) {
          if (otp === userOtp) {
            const encryptedPassword = hashPassword(newPassword);
            const updateUser = await User.findByIdAndUpdate(user.id, {
              password: encryptedPassword,
            });
            if (updateUser) {
              return res
                .status(200)
                .json({ success: true, message: "password updated, login" });
            } else {
              return res
                .status(401)
                .json({ success: false, message: "could not update password" });
            }
          } else {
            return res
              .status(401)
              .json({ success: false, message: "otp invalid" });
          }
        } else {
          return res
            .status(401)
            .json({ success: false, redirect: true, message: "otp expired " });
        }
      } else {
        res.status(401).json({
          success: false,
          message: `user with email: ${email} not found`,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: "payload must include email, newPassword & otp ",
      });
    }
  } catch (error) {
    res.send(error);
  }
};
