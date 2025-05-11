const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes.js");
// const jsomwebtoken = require("jsonwebtoken");

// custom imports
const connectDB = require("./config/dbconnect.js");
const PORT = process.env.PORT || 5000;
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// routes
app.use("/api/auth", authRoutes);
// connecting to db
connectDB();
// starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
