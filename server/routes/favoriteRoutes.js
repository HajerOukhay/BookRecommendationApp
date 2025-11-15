const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, favoriteController.getFavorites);
router.post("/", authMiddleware, favoriteController.addFavorite);
router.delete("/:bookKey", authMiddleware, favoriteController.removeFavorite);

module.exports = router;

const Favorite = require("../models/Favorite");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.status(200).json({ favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { bookKey, title, author, cover } = req.body;

    const existing = await Favorite.findOne({
      userId: req.user.id,
      bookKey,
    });

    if (existing) {
      return res.status(400).json({ error: "Book already in favorites" });
    }

    const newFavorite = new Favorite({
      userId: req.user.id,
      bookKey,
      title,
      author,
      cover,
    });

    await newFavorite.save();
    res
      .status(201)
      .json({ message: "Added to favorites", favorite: newFavorite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { bookKey } = req.params;

    await Favorite.findOneAndDelete({
      userId: req.user.id,
      bookKey,
    });

    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
