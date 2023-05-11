const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
});

module.exports = transporter;
