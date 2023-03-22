const mongoose = require("mongoose");
const { boolean } = require("yargs");

// const crypto = require("crypto");

const User = mongoose.model("Users", {
  email: {
    type: String,
    required: true,
    // unique: "email already exists",
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  address: {
    streetNumber: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  admin: {
    type: Boolean,
    required: true,
  } 
});

module.exports = User;
