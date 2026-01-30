const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, match: /^[0-9]{6}$/ },
    email: { type: String, required: true, unique: true, lowercase: true },
    //chatgpt
    utype: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },

    mobileNo: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
