const express = require("express");
const router = express.Router();
const Investigator = require("../models/Investigator");
const Complaint = require("../models/Complaint");

// extract the frontend inputs
router.post("/investigator", async (req, res) => {
  try {
    const {
      investigatorId,
      name,
      email,
      phone,
      department,
      designation,
      assignedComplaints,
      status,
      dateJoined,
      action,
    } = req.body;
    const investigator = new Investigator({
      investigatorId,
      name,
      email,
      phone,
      department,
      designation,
      assignedComplaints: assignedComplaints
        ? assignedComplaints.split(",") // if sent as comma-separated string
        : [],
      status,
      dateJoined,
      action,
    });
    await investigator.save();
    res.status(201).json({
      success: true,
      message: "Investigator added successfully",
    });
  } catch (error) {
    console.error("Investigator error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// investigator view fetch-----working✅
router.get("/investview", async (req, res) => {
  try {
    const investigators = await Investigator.find().sort({ dateJoined: -1 });
    res.json(investigators);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching investigator data",
      error: error.message,
    });
  }
});

// Investigatorview delete-----working✅
router.delete("/InvestDel/:id", async (req, res) => {
  try {
    await Investigator.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// INVESTIGATOR LOGIN API-----working✅
router.post("/investigatorlogin", async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Email and phone are required",
      });
    }
    const investigator = await Investigator.findOne({
      email,
      phone,
    });
    if (!investigator) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.status(200).json({
      success: true,
      user: investigator, // 🔥 frontend expects this
    });
  } catch (error) {
    console.error("Investigator login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

//investigator dashboard routes

//View INVESTIGATOR CASES-----working✅
router.get("/investigator/cases/:investigatorId", async (req, res) => {
  try {
    const investigatorId = req.params.investigatorId; // ❗ NO lowercase
    const cases = await Complaint.find({ assignedTo: investigatorId });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// INVESTIGATOR RESOLVE
router.post("/investigator/resolve", async (req, res) => {
  try {
    const { complaintId, investigatorId, message } = req.body;

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId, assignedTo: investigatorId },
      {
        status: "Resolved",
        solution: message,
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found / not assigned",
      });
    }

    res.json({
      success: true,
      complaint,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ADMIN CLOSE CASE ✅
router.post("/admin/close", async (req, res) => {
  try {
    const { complaintId, feedback } = req.body;

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId },
      {
        status: "Closed",
        note: feedback,
        closedAt: new Date(),
        closedBy: "Admin",
      },
      { new: true }
    );

    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

//optional to check  for investigator login api-----working✅
router.get("/investigatorlogin", async (req, res) => {
  const data = await Investigator.find();
  res.json(data);
});

//optional to check all investigator api's.-----working✅
router.get("/investigator", async (req, res) => {
  const data = await Investigator.find();
  res.json(data);
});

module.exports = router;
