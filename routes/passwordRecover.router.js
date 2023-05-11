const router = require("express").Router();
const paswordRecover = require("../controller/passwordRecover.controller");

router.post("/sendOtp", paswordRecover.sendPasswordRecoverymail);

router.post("/verifyOtp", paswordRecover.verifyOtpAndSetPassword);

module.exports = router;
