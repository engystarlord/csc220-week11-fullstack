const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.create({ email, password });
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (error) {
    return res.status(400).json({
      error: error.code === 11000 ? "Email is already registered" : error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    const correctPassword = user && await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
