const mongoose = require("mongoose");

const userSchame = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  verificated: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  mobile: {
    type: String,
  },
  check: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchame);
module.exports = User;
