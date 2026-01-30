const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// import models
const Login = require("../models/Login");
const Register = require("../models/Register");

router.post("/login", async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log(req.body);
    const { email, password } = req.body;

    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      success: true,
      user: {
        email: user.email,
        utype: user.utype,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//api
router.get("/login", async (req, res) => {
  const data = await Login.find();
  res.json(data);
});

module.exports = router;
