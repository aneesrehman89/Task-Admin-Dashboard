const mongoose = require("mongoose");
// schema for feedback form
const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10
  },
  title: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  }
});

// creating model for feedback 
const usersFeedback = mongoose.model("usersFeedback", feedbackSchema);

module.exports =  usersFeedback ;

