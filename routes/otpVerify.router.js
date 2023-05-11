const route = require("express").Router();
const otpController = require("../controller/otpVerify.controller");

route.get("/send", otpController.SendOtp);

route.post("/verify", otpController.verifyOtp);

module.exports = route;
