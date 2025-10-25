const Feedback = require("../models/Feedback");

const createFeedback = async (data) => {
  const feedback = new Feedback(data);
  return await feedback.save();
};

const getFeedbacks = async () => {
  return await Feedback.find().populate("user");
};

const getFeedbacksByBook = async (bookId) => {
  return await Feedback.find({ bookId }).populate("user");
};

const updateFeedback = async (id, data) => {
  return await Feedback.findByIdAndUpdate(id, data, { new: true });
};

const deleteFeedback = async (id) => {
  return await Feedback.findByIdAndDelete(id);
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedbacksByBook,
  updateFeedback,
  deleteFeedback,
};
