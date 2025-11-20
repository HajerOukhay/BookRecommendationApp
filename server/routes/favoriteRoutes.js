const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");

// POST add favorite
router.post("/", favoriteController.addFavorite);

// DELETE remove favorite
router.delete("/", favoriteController.removeFavorite);

// GET favorites by userId
router.get("/:userId", favoriteController.getFavorites);

module.exports = router;
