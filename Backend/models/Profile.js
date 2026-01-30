const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    education: { type: String, default: "" },
    occupation: { type: String, default: "" },
    profilePhoto: { type: String, default: "" }, // 👈 camelCase
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
