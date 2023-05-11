const passport = require("passport");
const User = require("../models/user.model");
const LocalStrategy = require("passport-local").Strategy;
// const JWTstrategy = require("passport-jwt").Strategy;
// const ExtractJWT = require("passport-jwt").ExtractJwt;
const { comparePassword } = require("../services/hasing.service");
const { JWT_SECRET_KEY } = process.env;

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: JWT_SECRET_KEY,
// };

const verifyCallback = async (email, password, done) => {
  const emailLowecase = email.toLocaleLowerCase().replace(/\s/g, "");
  try {
    const user = await User.findOne({ email: emailLowecase });
    if (user) {
      const decipherdpass = comparePassword(password, user.password);
      if (!decipherdpass) {
        return done(null, false, {
          succes: false,
          msg: "Incorrect password.",
        });
      } else {
        return done(null, user);
      }
    } else {
      return done(null, false, {
        succes: false,
        msg: "Incorrect Email.",
      });
    }
  } catch (error) {}
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

// passport.use(
//   "jwt",
//   new JWTstrategy(opts, async (token, done) => {
//     try {
//       const user = await User.findById(token.id);
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false, { succes: false, msg: "unauthorised" });
//       }
//     } catch (error) {
//       return done(null, false);
//     }
//   })
// );

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

module.exports = passport;
