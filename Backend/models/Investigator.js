const mongoose = require("mongoose");

const InvestigatorSchema = new mongoose.Schema({
  investigatorId: { type: String, required: true, unique: true }, // e.g., inv-01
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  department: { type: String, default: "Cyber Crime Unit" },
  designation: { type: String, default: "Investigator" },
  assignedComplaints: [{ type: String }], // store complaintId values
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Investigator", InvestigatorSchema);
