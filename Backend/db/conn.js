const mongoose = require("mongoose");
require("dotenv").config();

console.log("MONGO_URL from .env:", process.env.MONGO_URL); // Debugging line

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));
