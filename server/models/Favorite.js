const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookKey: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Unknown author",
    },
    cover: {
      type: String,
    },
  },
  { timestamps: true }
);

// Index pour éviter les doublons
favoriteSchema.index({ userId: 1, bookKey: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
