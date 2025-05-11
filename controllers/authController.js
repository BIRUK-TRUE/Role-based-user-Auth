const bcrypt = require("bcryptjs");
const User = require("../models/User.Model.js=");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    if (name || password || role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.log("Error on the registering user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};
