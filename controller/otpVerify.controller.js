const moment = require("moment");
const User = require("../models/user.model");
const { generateOTP } = require("../services/generateOTP.service");
const { sendOTPmail } = require("../services/sendOTPmail.service");
const { AddMinutesToDate } = require("../services/common.service");

exports.SendOtp = async (req, res) => {
  try {
    if (req.user.isVerified) {
      return res.status(201).json({
        success: false,
        message: "account already verified cannot generate otp",
      });
    } else {
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
      //   sendOTPmail(req.user.email, otp);
      const user = await User.findByIdAndUpdate(req.user.id, queryObj);
      if (user) {
        return res.status(200).json({
          success: true,
          message: `${otp} created and sent to ${user.email}`,
        });
      } else {
        return res
          .status(401)
          .json({ success: true, message: `error occoured while updating` });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    if (req.user.isVerified) {
      return res.status(201).json({
        success: false,
        message: "account already verified",
      });
    } else {
      if (otp) {
        const userOtp = req.user.verification.otp;
        const validTill = req.user.verification.validTill;
        const today = new Date();
        console.log(
          moment(validTill).format("lll") + "   -- expiry",
          moment(today).format("lll") + "   -- current"
        );
        const expiryTime = new Date(validTill);
        console.log(expiryTime, today);
        if (validTill > today) {
          if (otp === userOtp) {
            const user = await User.findByIdAndUpdate(req.user.id, {
              isVerified: true,
            });
            if (user) {
              return res
                .status(200)
                .json({ success: true, message: "account verified" });
            }
          } else {
            return res
              .status(401)
              .json({ success: false, message: "otp invalid" });
          }
        } else {
          return res
            .status(401)
            .json({ success: false, message: "otp expired 1" });
        }
      } else {
        return res
          .status(401)
          .json({ success: false, message: "need otp in request body" });
      }
    }
  } catch (error) {
    res.send(error);
  }
};
