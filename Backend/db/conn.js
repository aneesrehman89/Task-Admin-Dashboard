const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/user"

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("DataBase Connected"))
.catch((error)=>{
  console.error("MongoDB connection error:", error);
})