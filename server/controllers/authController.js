const authService = require("../services/authServices");

// Inscription
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ message: "Registration done", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.status(200).json({ message: "Successfully connected", ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Déconnexion (Logout)
const logout = async (req, res) => {
  try {
    // For JWT-based auth, just respond — no server-side token invalidation unless you add a blacklist
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, logout };
