const router = require("express").Router();
const passwordChange = require("../controller/passwordChange.controller");

router.post("/change", passwordChange.changePassword);

module.exports = router;
