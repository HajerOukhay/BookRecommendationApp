const Favorite = require("../models/Favorite");

// Add favorite
exports.addFavorite = async (req, res) => {
  try {
    const { userId, bookKey, title, author, cover } = req.body;

    // Check if already exists
    const exists = await Favorite.findOne({ userId, bookKey });
    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const fav = new Favorite({ userId, bookKey, title, author, cover });
    await fav.save();

    res.json({ message: "Added to favorites", favorite: fav });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove favorite
exports.removeFavorite = async (req, res) => {
  try {
    const { userId, bookKey } = req.body;

    await Favorite.findOneAndDelete({ userId, bookKey });
    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get favorites for a user
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
