module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};

module.exports.isUSerVerified = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isVerified) {
      next();
    } else {
      res.status(200).json({
        success: true,
        redirect: true,
        message: `User logged in but verify your account with OTP`,
      });
    }
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to view this resource" });
  }
};
