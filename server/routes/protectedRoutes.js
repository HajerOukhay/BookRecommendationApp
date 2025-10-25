const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middlewares/authMiddleware");

// Example: list all users (only for authenticated users)
router.get("/users", protect, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
