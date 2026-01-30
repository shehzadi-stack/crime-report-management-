// const express = require("express");
// const router = express.Router();

// // Import Models
// const Complaint = require("../models/Feedback");
// const { default: Feedback } = require("../../frontend/src/Components/Feedback");
//  // Check if already exists
//     const existingUser = await Feedback.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "  Email already registered" });
//     }

//     // Save in Register collection
//     const ComplaintEntry = new Feedback({
//      email:"",
//      AboutServices:"",
//      Comments:"",
//     });

//     await FeedbackEntry.save();
//     res.status(201).json({
//       success: true,
//       message: "🎉User feedback registered succesfully",
//     });
//    catch (error) {
//     console.error("✖️Error in feedback :", error);
//     res
//       .status(500)
//       .json({ success: false, message: " ❌ User Feedback  failed" });
//   }

// // Get all registered users-----extra
// router.get("/feedback", async (req, res) => {
//   try {
//     const complaint = await Feedback.find();
//     res.status(200).json(feedback);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// CREATE FEEDBACK
router.post("/feedback", async (req, res) => {
  try {
    const { email, aboutService, comments, action } = req.body;

    const feedback = new Feedback({
      email,
      aboutService,
      comments,
      action,
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
    });
  } catch (error) {
    console.error("Feedback not submitted:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//feedback view
router.get("/feedview", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching feedbacks", error: error.message });
  }
});
// Feedbackview delete
router.delete("/FeedDel/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});
//optional to check all feedback api's.
router.get("/feedback", async (req, res) => {
  const data = await Feedback.find();
  res.json(data);
});
module.exports = router;
