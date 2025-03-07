const mongoose = require("mongoose");

// schema for Task
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

// create model for task
const Task = mongoose.model("Task", taskSchema);


module.exports =  Task;