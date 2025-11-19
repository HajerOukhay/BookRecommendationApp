const User = require("../models/User"); // Import du modèle User
const bcrypt = require("bcrypt"); // Pour le hash des mots de passe
const jwt = require("jsonwebtoken"); // Pour générer le token JWT
const authService = require("../services/authServices");

// =================== REGISTER ===================
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Utiliser le service pour créer l'utilisateur avec hash du password
    const user = await authService.registerUser(username, email, password);

    res.status(201).json({ message: "Registration done", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// =================== LOGIN ===================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifie l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // Générer un token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      user: { _id: user._id, username: user.username },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== LOGOUT ===================
const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, logout };
