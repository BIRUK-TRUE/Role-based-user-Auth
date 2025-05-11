const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth.middleware.js");
const authorizeRole = require("../middlewares/role.middleware.js");
// only admin can access this route
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
  res.json({ message: "Hello Admin" });
});

// both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Hello Manager" });
  }
);
// all can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRole("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "Hello User" });
  }
);

module.exports = router;
