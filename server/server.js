require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const bookRoutes = require("./routes/bookRoutes");
const feedbackRoutes = require("./routes/feedbacks");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// ──────────────────────────────────────────────
// 🧩 Middleware
// ──────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);

// ──────────────────────────────────────────────
// 🌐 Database Connection
// ──────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ──────────────────────────────────────────────
// 🛠️ Routes
// ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/favorites", favoriteRoutes);
// ──────────────────────────────────────────────
// 🚀 Server Start
// ──────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
