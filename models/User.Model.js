const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      trime: true,
    },
    password: {
      typr: String,
      require: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "manager"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
