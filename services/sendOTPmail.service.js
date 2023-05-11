const transporter = require("../config/mail.config");

exports.sendOTPmail = (email, otp) => {
  let detail = {
    from: '"Eater Pan 👻" <eaterpan123@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Verify account", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>${otp} is your OTP for verifying your account. will expire in 5 mins</b>`, // html body
  };
  transporter.sendMail(detail, (err) => {
    if (err) {
      console.log("there is error", err);
    }
  });
};

exports.sendPasswordOtpmail = (email, otp) => {
  let detail = {
    from: '"Eater Pan 👻" <eaterpan123@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "OTP for password reset", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>${otp} is your OTP for reseting password for your account. will expire in 5 mins</b>`, // html body
  };
  transporter.sendMail(detail, (err) => {
    if (err) {
      console.log("there is error", err);
    }
  });
};
