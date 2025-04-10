const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/getUser", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user);
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } else {
      return res.status(404).json({});
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password: password });
    user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
