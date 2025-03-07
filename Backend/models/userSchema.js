const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "ZrZGcCDxAFNLNAspCdJSgcCugPJPrQS";

// schema for userDetail
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    required: true,
    minlength: 10
  },
  address: {
    type: String,
    required: true,
  },
  jdate: {
    type: String,
    format: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  // tokens: [
  //   {
  //     token: {
  //       type: String,
  //       required: true,
  //     }
  //   }
  // ]
});




//token generation
userSchema.methods.generateToken = async function() {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SECRET_KEY || JWT_SECRET_KEY, // Fallback to JWT_SECRET_KEY if not in environment variables
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error("Error in generateToken:", error);
    throw new Error("Error generating token");
  }
};


// creating model for userDetail
const userdb = mongoose.model("users", userSchema);

module.exports = userdb;