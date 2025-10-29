const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  bookId: { type: String, required: true },
  user: { type: String, default: "Anonymous" },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
