const feedbackService = require("../services/feedbackService");

const addFeedback = async (req, res) => {
  try {
    const newFeedback = await feedbackService.createFeedback(req.body);
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getFeedbacks();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addFeedback, getFeedbacks };
