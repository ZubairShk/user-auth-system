const User = require("../models/user.model");
const { hashPassword } = require("../services/hasing.service");
const { generateOTP } = require("../services/generateOTP.service");
const { sendOTPmail } = require("../services/sendOTPmail.service");
const moment = require("moment");

exports.registerUser = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    // check if all credentials exist else return incomplete data error
    //check id user already exist with same email
    User.findOne({ email: email }, (err, result) => {
      if (result) {
        console.log(result);
        // return user already exist error
        return res
          .status(403)
          .json({ success: false, message: "user already exist" });
      } else {
        //register user if not email doen't exist in db

        userData = {
          email,
          password: hashPassword(password),
          isVerified: false,
          createdAt: moment().format("lll"),
          verification: {
            otp: 0,
            createdAt: "",
            validTill: "",
          },
        };

        const user = new User(userData);
        user
          .save()
          .then((result) => {
            res.status(200).json({
              success: true,
              message: `user created`,
            });
          })
          .catch((err) => {
            return res.status(500).send({ err });
          });
      }
    });
  } else {
    return res.status(403).json({ success: false, message: "incmplete data" });
  }
};

// const otp = generateOTP();
// const otpMaster = new OtpMaster({
//   userId: result.id,
//   otp: otp,
//   createdAt: moment().format("lll"),
//   validTill: moment().format("lll").add(1, "minutes"),
// });
// otpMaster
//   .save()
//   .then((otps) => {})
//   .catch((err) => {
//     console.log(err);
//   });

// const minutesFromNow = moment().add(5, "minutes");
// sendOTPmail(email, otp);
// const otpMaster = new OtpMaster({
//   userId: result.id,
//   otp: otp,
//   createdAt: moment().format("lll"),
//   validTill: minutesFromNow.format("lll"),
// });
// otpMaster
//   .save()
//   .then((otps) => {
//     res.status(200).json({
//       success: true,
//       message: `user created And OTP sent to ${email}`,
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
