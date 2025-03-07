const mongoose = require("mongoose");

//schema for attandance
const attendanceSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  attendance: { type: Object, required: true },
});


// create model for attendance
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports =  Attendance ;