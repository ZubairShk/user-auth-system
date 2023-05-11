const passport = require("../config/passportAuth");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRY_TIME } = process.env;

// exports.loginUser = (req, res, next) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     passport.authenticate("local", { session: false }, (err, user, info) => {
//       if (user) {
//         console.log("user id", user.id);
//         const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
//           expiresIn: JWT_EXPIRY_TIME,
//         });
//         res.json({ success: true, user: user.email, token });
//       } else {
//         return res.status(403).send(info);
//       }
//     })(req, res, next);
//   } else {
//     return res.status(403).json({ success: false, message: "invalid inputs" });
//   }
// };

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    passport.authenticate("local", (err, user, info) => {
      if (user) {
        // const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        //   expiresIn: JWT_EXPIRY_TIME,
        // });

        req.logIn(user, function (err) {
          if (err) {
            return res.status(403).send(info);
          }
          if (!user.isVerified) {
            return res.json({
              success: false,
              redirect: true,
              message: `User logged in but verify your account with OTP`,
            });
          } else {
            return res.json({ success: true, user: user.email });
          }
        });
        // res.json({ success: true, user: user.email, token });
      } else {
        return res.status(403).send(info);
      }
    })(req, res, next);
  } else {
    return res.status(403).json({ success: false, message: "invalid inputs" });
  }
};
