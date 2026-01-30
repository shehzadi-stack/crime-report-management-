const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  aboutService: {
    type: String,
    required: true,
    trim: true,
  },
  comments: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Feedback", FeedbackSchema);
