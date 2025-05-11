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

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.passeord);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Error on the login user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
