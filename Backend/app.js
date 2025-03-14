const express = require("express");
const cors = require("cors");

const app = express();
require("./db/conn"); // Database connection
const router = require("./Controller/router");
const cookiParser = require("cookie-parser");

const port = process.env.PORT || 8009;  // Use environment variable for port

app.use(express.json());
app.use(cors({ origin: "https://your-frontend-url.vercel.app", credentials: true })); 
app.use(cookiParser());
app.use(router);

// Root endpoint for testing
app.get("/", (req, res) => {
    res.json({ message: "Server is running on Vercel 🚀" });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
