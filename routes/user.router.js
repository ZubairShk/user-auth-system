const route = require("express").Router();
const registerUser = require("../controller/register.controller");
const loginUser = require("../controller/login.controller");

route.post("/register-user", registerUser.registerUser);
route.post("/login-user", loginUser.loginUser);

module.exports = route;
