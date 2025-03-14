const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
// const authenticate = require("../middleware/authenticate");
const userdb = require('../models/userSchema');
const  usersFeedback = require('../models/feedbackSchema');
const Task = require('../models/taskSchema');
const  Attendance  = require('../models/attendanceSchema');


//for personalDetail
router.post('/personalDetail', async (req, res) => {

  const { fullName, email, password, confirmPassword, phone, address, jdate, gender } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "Fill all the details" })
  }

  try {
    const existingUser = await userdb.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "This Email is Already Exist" })
    }
    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Password and Confirm Password Not Match" })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const finalUser = new userdb({ fullName, email, password: hashedPassword, confirmPassword, phone, address, jdate, gender });
    const storeData = await finalUser.save();
    const token =  await storeData.generateToken();
    
    res.status(200).json({ message: "User registered successfully", storeData, token, userId:storeData._id.toString(), });  
    console.log("ApI storedata",storeData+ "register token ",token);
  }
  catch (error) {
    console.error("Error in /personalDetail:", error);
    res.status(500).json({ error: error });
  }
});

//for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("api login body", req.body);

  if (!email || !password) {
    return res.status(422).json({ error: "Fill all the details" });
  }
  try {
    const { email, password } = req.body;
    const userValid = await userdb.findOne({ email });

     if (!userValid) {
      return res.status(422).json({ error: "Invalid Email" });
    }

     const isMatch = await bcrypt.compare(password, userValid.password);
     console.log("invalid password error...",isMatch);
     
     if(!isMatch){
        return res.status(422).json({error:"Invalid Password"})
      } 
  
   return res.status(201).json({ message: "Login Successfully", user: userValid });

  }
  catch (error) {
    res.status(500).json({ error:error});
  }
});


//for feedback
router.post("/feedback", async (req, res) => {
  const { email, phone, title, feedback } = req.body;

  if (!email || !phone || !title || !feedback) {
    return res.status(422).json({ error: "Fill all the details" })
  }

  try {
    const existingFeedback = await usersFeedback.findOne({ email });
    if (existingFeedback) {
      // Update existing feedback
      existingFeedback.phone = phone;
      existingFeedback.title = title;
      existingFeedback.feedback = feedback;
      const updatedFeedback = await existingFeedback.save();
      return res.status(200).json({ message: "Feedback updated successfully.", updatedFeedback });
    }
    else {
      const feedbackData = new usersFeedback({ email, phone, title, feedback });
      const storefeedback = await feedbackData.save();
      return res.status(200).json({ message: "Feedback send successfully", storefeedback });
    }
  }
  catch (error) {
    console.error("Error in /feedback form:", error);
    res.status(500).json({ error: error });
  }
});

// Fetch User Details
router.get("/users/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await userdb.findOne({ email });

    if (!user) {
      return  res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }
  catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//update personal details
router.put('/personalDetail', async(req, res)=>{
  const { email, fullName, phone, address, jdate, gender } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required to update details" });
  }

  try {
    const updatedUser = await userdb.findOneAndUpdate(
      { email }, // Filter by email
      { fullName, phone, address, jdate, gender }, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Personal details updated successfully", updatedUser});
  } 
  catch (error) {
    console.error("Error updating personal details:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// Save or create tasks
router.post("/dashboard/:email", async(req, res) => {
  const { email } = req.params;
  const { addTaskDetail, inProgress, complete } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Email is required to update details" });
  }
  try {
    // Check if the user's tasks already exist
    const existingTask = await Task.findOne({ email });

    if (existingTask) {
      // Update the existing record
      existingTask.addTaskDetail = addTaskDetail;
      existingTask.inProgress = inProgress;
      existingTask.complete = complete;
      await existingTask.save();
      return res.json({ success: true, message: "Task data updated successfully." });
    }
    
    // Create a new record
    const newTask = new Task({ email, addTaskDetail, inProgress, complete });
    await newTask.save();
    return res.json({ success: true, message: "Task data saved successfully." });
  }
   catch (error) {
    console.error("Error saving task data:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

//Get task for user
 router.get("/tasks/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const tasks = await Task.findOne({ email });
    if (!tasks) {
      return res.status(200).json({ message: "No tasks found for this user", data: { addTaskDetail: [], complete: [], inProgress: [] } });
    }
    return res.status(200).json({ message: "Tasks retrieved successfully", data: tasks });
  } catch (error) {
    return res.status(400).json({ message: "Error retrieving tasks", error: error.message });
  }
});

//Delete task 
router.delete('/tasks/:email', async (req, res) => {
  const { email, task} = req.body;
  console.log("task",task);
  console.log(email);

  if (!email || !task) {
    return res.status(400).json({ message: 'Email and task name are required.' });
  }

  try {
    
    const result = await Task.deleteOne({ addTaskDetail:task });
    console.log("result",result);

    if (result === 0) {
      return res.status(404).json({ message: 'Task not found for the given email.' });
    }

    return res.status(200).json({ message: 'Task deleted successfully.' ,result });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// POST or PATCH Attendance Data
router.post("/attendance", async (req, res) => {
  const { email, attendance } = req.body;

  if (!email || !attendance) {
    return res.status(400).json({ message: "Email and attendance are required." });
  }

  try {
    // Check if the record already exists
    const existingRecord = await Attendance.findOne({ email });

    if (existingRecord) {
      // Update existing record
      existingRecord.attendance = attendance;
      await existingRecord.save();
      // console.log("Updated Attendance:", existingRecord.attendance);
      return res.status(200).json({message: "Attendance updated successfully.",attendance: existingRecord.attendance,});
    } else {
      // Create a new record
      const newAttendance = new Attendance({ email, attendance });
      await newAttendance.save();
      // console.log("New Attendance Saved:", newAttendance.attendance);
      return res.status(201).json({ message: "Attendance saved successfully.",attendance: newAttendance.attendance,});
    }
  } catch (error) {
    console.error("Error saving attendance:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// get attendance for user
router.get('/attendances/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const existingRecord = await Attendance.findOne({ email });

    if (existingRecord) {
      return res.status(200).json({ attendance: existingRecord.attendance });
    } else {
      return res.status(404).json({ message: "Attendance not found." });
    }
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


module.exports = router; 