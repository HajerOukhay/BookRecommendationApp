const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Inscription
const registerUser = async (username, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already used");

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashed });
  await newUser.save();

  const { password: pw, ...userWithoutPassword } = newUser.toObject();
  return userWithoutPassword;
};

// Connexion
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password: pw, ...userWithoutPassword } = user.toObject();
  return { user: userWithoutPassword, token };
};

module.exports = { registerUser, loginUser };
