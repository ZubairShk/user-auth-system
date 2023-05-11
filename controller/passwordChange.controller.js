const User = require("../models/user.model");
const { hashPassword, comparePassword } = require("../services/hasing.service");
const { generateOTP } = require("../services/generateOTP.service");
const { AddMinutesToDate } = require("../services/common.service");
const { sendPasswordOtpmail } = require("../services/sendOTPmail.service");

exports.changePassword = async (req, res) => {
  try {
    const { newPassword, currentPassword } = req.body;
    const currentUser = req.user;
    if (newPassword && currentPassword) {
      const isPasswordCorrect = comparePassword(
        currentPassword,
        currentUser.password
      );
      if (isPasswordCorrect) {
        const sypheredPassword = hashPassword(newPassword);
        const updateUser = await User.findByIdAndUpdate(currentUser.id, {
          password: sypheredPassword,
        });
        if (updateUser) {
          return res.status(200).json({
            success: true,
            message: "password updated for " + updateUser.email,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Opps!, something went wrong",
          });
        }
      } else {
        return res.status(401).json({
          success: false,
          message: "current password incorrect",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "need keys newPassword & currentPassword for password change",
      });
    }
  } catch (error) {
    res.send(error);
  }
};
