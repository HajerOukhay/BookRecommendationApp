require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const bookController = require("./controllers/bookController");
const bookRoutes = require("./routes/bookRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
