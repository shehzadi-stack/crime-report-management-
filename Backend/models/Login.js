const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const LoginSchema = new mongoose.Schema(
  {
    utype: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
      default: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ THIS LINE WAS MISSING (CRITICAL)
module.exports = mongoose.model("Login", LoginSchema);
