const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// 🟢 GET all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟢 GET feedbacks for a specific book
router.get("/works/:workId", async (req, res) => {
  try {
    const workId = `/works/${req.params.workId}`; // match your MongoDB format
    const feedbacks = await Feedback.find({ bookId: workId });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🟢 POST a new feedback for a book
router.post("/works/:workId", async (req, res) => {
  try {
    const feedback = new Feedback({
      user: req.body.user || null,
      bookId: `/works/${req.params.workId}`,
      comment: req.body.comment,
      rating: req.body.rating,
    });

    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
