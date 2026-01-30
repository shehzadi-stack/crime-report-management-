const express = require("express");
const router = express.Router();
const multer = require("multer");

const Profile = require("../models/Profile");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// add the profile auth-code
router.post("/profile", upload.single("file"), async (req, res) => {
  try {
    const { email, education, occupation } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    // Check if profile already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this email",
      });
    }
    const profileEntry = new Profile({
      email,
      education,
      occupation,
      profilePhoto: req.file ? req.file.filename : null, // match schema
    });
    await profileEntry.save();
    return res.status(201).json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (err) {
    console.error("Error saving profile:", err);
    return res.status(500).json({
      success: false,
      message: err.message, // show real error during development
    });
  }
});

// ✅ view PROFILE
router.get("/profile", async (req, res) => {
  const data = await Profile.find();
  res.json(data);
});

module.exports = router;
