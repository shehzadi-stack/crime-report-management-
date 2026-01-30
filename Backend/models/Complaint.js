const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaintId: { type: String, required: true, unique: true },
  complaintType: { type: String, required: true },
  description: { type: String },
  dateTime: { type: Date, default: Date.now },
  file: { type: String },
  email: { type: String, required: true },

  status: {
    type: String,
    enum: ["Pending", "Open", "Assigned", "Closed", "Resolved"],
    default: "Pending", // ☑ Default is now Pending
  },
  assignedTo: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  note: {
    type: String,
  },
  solution: { type: String, default: "" },
  closedAt: Date, //chatgpt
  closedBy: String, //chatgpt
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
