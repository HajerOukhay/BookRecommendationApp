const Favorite = require("../models/Favorite");

// Ajouter aux favoris
exports.addFavorite = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const exists = await Favorite.findOne({ userId, bookId });
    if (exists) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    const fav = new Favorite({ userId, bookId });
    await fav.save();

    res.json({ message: "Added to favorites", favorite: fav });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer des favoris
exports.removeFavorite = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    await Favorite.findOneAndDelete({ userId, bookId });

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer les favoris
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;

    const favorites = await Favorite.find({ userId }).populate("bookId");

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
