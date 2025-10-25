const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/", feedbackController.addFeedback);
router.get("/", feedbackController.getFeedbacks);

module.exports = router;
