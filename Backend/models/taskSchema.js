const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  addTaskDetail: {
    type: [String],
    default: [],
  },
  inProgress: {
    type: [String],
    default: [],
  },
  complete: {
    type: [String],
    default: [],
  },
},
  { timestamps: true, type: String, format: Date }
);

const Task = mongoose.model("Task", taskSchema);


module.exports =  Task;