const express = require("express");
const db = require("./config/db.config");
require("dotenv").config();
const passport = require("./config/passportAuth");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { isAuth, isUSerVerified } = require("./middleware/auth.middleware");
//db
const app = express();

//routes
const userRoutes = require("./routes/user.router");
const otpRoutes = require("./routes/otpVerify.router");
const passwordChange = require("./routes/passwordChange.router");
const passwordRecover = require("./routes/passwordRecover.router");

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");
const { json } = require("body-parser");

// const sessionStore = new MongoStore({
//   mongooseConnection: db,
//   collection: "sessions",
// });

let sessionStore = new MongoStore({
  mongoUrl: process.env.DB_URL,
  collection: "sessions",
});

app.use(cookieParser());
app.use(
  session({
    name: "expandito",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

//open routes that doesnt require authorization

//initialised passport
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".
// app.use(passport.initialize());
// app.use(passport.authenticate("jwt", { session: false }));

//-------------------------------------------------------------open routes that doesnt require authorization
app.use("/api", userRoutes);
app.use("/recoverPassword", passwordRecover);

app.use(isAuth);
//--------------------------------------------this will be accessable to only to logged in users even if they are not verified

//protected routes after passport initialised, this will be accessable to users even if they are not verified
app.get("/log-out", (req, res) => {
  req.logout((err) => {
    if (err) {
      return json.status(401).send(err);
    }
    res
      .status(200)
      .json({ success: true, message: "user successfully loged out" });
  });
});
//this otp for account verification will be accessable to users even if they are not verified
app.use("/otp", otpRoutes);

//apart from otp generation apis every account shold be verified before acessing other apis
app.use(isUSerVerified);
//--------------------------------------------------------------------user needs to be logged in and account should be verified

app.use("/password", passwordChange);

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "hello" });
});

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.listen(process.env.PORT, () =>
  console.log(">---- server started on : port - " + process.env.PORT + "---->")
);
