const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const users = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
  verification: {
    otp: {
      type: Number,
      require: true,
    },
    validTill: {
      type: Date,
      require: true,
    },
  },
});
const User = mongoose.model("users", users);
module.exports = User;
