const express = require('express');
const app = express();
require("./db/conn");
const router = require("./Controller/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const port = 8009;

// Load environment variables from .env file
// const dotenv = require('dotenv');
// dotenv.config();

app.use(express.json());  // Parses JSON requests
app.use(cors());         // Handles Cross-Origin Resource Sharing
app.use(router);         // Mounts the router for API routes
app.use(cookiParser());

// Use environment variable PORT or fallback to 8009
// const PORT = process.env.PORT ;
// console.log(">>><<<<>>>><<<<",process.env.PORT)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
