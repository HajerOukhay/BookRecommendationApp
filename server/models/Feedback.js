const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  user: { type: String, default: "Anonymous" },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
