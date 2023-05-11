const otpGenerator = require("otp-generator");

//** using otp generator library instead of manual code */
// exports.generateOTP = () => {
//   //https://codepen.io/sbmistry/pen/zYOLoEx
//   let digits = "0123456789";
//   let OTP = "";
//   for (let i = 0; i < 4; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }

//   //   const otpLength = 4;
//   //   let OTP = "";
//   //   for (let i = 0; i < otpLength; i++) {
//   //     OTP += Math.floor(Math.random() * 9);
//   //   }

//   return parseInt(OTP);
// };

exports.generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return parseInt(otp);
};
