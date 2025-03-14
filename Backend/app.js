const express = require('express');
const app = express();
require("./db/conn");
const router = require("./Controller/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");

app.use(express.json());  
app.use(cors());       
app.use(router);        
app.use(cookiParser());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running on Vercel 🚀" });
});

module.exports=app