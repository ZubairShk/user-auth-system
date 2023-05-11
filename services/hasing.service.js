const bcrypt = require("bcrypt");
require("dotenv").config();

const salt = 10;

function hashPassword(password) {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

function comparePassword(password, userPassword) {
  const decipherdpass = bcrypt.compareSync(password, userPassword); // user provided password, password stored in db
  return decipherdpass;
}

const abcd = "abcd";

module.exports = { hashPassword, comparePassword, abcd };
