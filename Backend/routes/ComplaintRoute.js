// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// // Import Models
// const Complaint = require("../models/Complaint");

// // Multer config-----used to upload the photos
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // create Complaint route
// router.post("/Complaint", upload.single("file"), async (req, res) => {
//   try {
//     const {
//       // complaintId,
//       complaintType,
//       description,
//       // dateTime,
//       // email,
//       // status,
//       // assignedTo,
//       // solution,
//     } = req.body;
//     // Find the latest complaint by complaintId
//     const lastComplaint = await Complaint.findOne().sort({ createdAt: -1 });

//     let newComplaintId = "CMP-01";

//     if (lastComplaint && lastComplaint.complaintId) {
//       const lastIdNum = parseInt(lastComplaint.complaintId.split("-")[1]);
//       const nextIdNum = lastIdNum + 1;
//       newComplaintId = "CMP-" + String(nextIdNum).padStart(2, "0"); // CMP-02, CMP-03...
//     }

//     const complaint = new Complaint({
//       complaintId: newComplaintId, // auto-generated sequential ID
//       complaintType: req.body.complaintType,
//       file: req.file ? req.file.filename : null,
//     });
//     console.log("Comp data");

//     // Check if already exists
//     const existingUser = await Complaint.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: " 🚫 Email already registered" });
//     }

//     // Save in Register collection
//     const ComplaintEntry = new Complaint({
//       // complaintId,
//       complaintType,
//       description,
//       // dateTime,
//       // email,
//       // status,
//       // assignedTo,
//       // solution,
//       file: req.file ? req.file.filename : null,
//     });

//     await ComplaintEntry.save(); // complaint saves in db

//     //response as its success
//     res.status(201).json({
//       success: true,
//       message: "🎉User Complaint registered succesfully",
//     });
//   } catch (error) {
//     //Showing error in backend console
//     console.error("✖️Error in complaint registering of user:", error);
//     res
//       .status(500)
//       .json({ success: false, message: " ❌ User Complaint  failed" });
//   }
// });
// router.post("/complaint", upload.single("file"), async (req, res) => {
//   try {
//     const { complaintType, description } = req.body;

//     // Find the latest complaint
//     const lastComplaint = await Complaint.findOne().sort({ createdAt: -1 });

//     let newComplaintId = "CMP-01";

//     if (lastComplaint && lastComplaint.complaintId) {
//       const lastIdNum = parseInt(lastComplaint.complaintId.split("-")[1]);
//       newComplaintId = "CMP-" + String(lastIdNum + 1).padStart(2, "0");
//     }

//     const ComplaintEntry = new Complaint({
//       complaintId: newComplaintId,
//       complaintType,
//       description,
//       file: req.file ? req.file.filename : null,
//     });

//     await ComplaintEntry.save();

//     res.status(201).json({
//       success: true,
//       message: "🎉 User Complaint registered successfully",
//     });
//   } catch (error) {
//     console.error("✖️ Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "❌ User Complaint failed",
//     });
//   }
// });

// // Compview data is fetched
// router.get("/compview", async (req, res) => {
//   try {
//     const complaint = await Complaint.find().sort({ createdAt: -1 });
//     res.json(complaint);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching Complaints", error: error.message });
//   }
// });

// // Complaintview delete
// router.delete("/CompDel/:id", async (req, res) => {
//   try {
//     await Complaint.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// //  TOP 5 LATEST COMPLAINTS
// router.get("/complaints/latest-complaints", async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ createdAt: -1 }).limit(5);

//     res.status(200).json(complaints);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch complaints" });
//   }
// });

// // PUT API for updating complaint status
// // ComplaintRoute.js
// router.put("/complaints/:id/status", async (req, res) => {
//   const { id } = req.params; // e.g. "cmp-03"
//   const { status } = req.body; // e.g. "Resolved"
//   console.log(
//     "Received request to update complaint:",
//     id,
//     "to status:",
//     status
//   );

//   try {
//     const updatedComplaint = await Complaint.findOneAndUpdate(
//       { complaintId: id }, // match by complaintId
//       { status: status }, // update with new status
//       { new: true } // return updated document
//     );
//     if (!updatedComplaint) {
//       console.log("Complaint not found:", id);
//       return res
//         .status(404)
//         .json({ success: false, message: "Complaint not found" });
//     }

//     console.log("Updated complaint:", updatedComplaint);
//     return res.json({
//       success: true,
//       complaint: updatedComplaint,
//     });
//   } catch (err) {
//     console.error("Error updating complaint:", err.message);
//     return res
//       .status(500)
//       .json({ success: false, message: "Error updating status" });
//   }
// });

// // Get all complaints of users on browser api-----extra
// router.get("/complaint", async (req, res) => {
//   try {
//     const complaint = await Complaint.find();
//     res.status(200).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/complaintadmin", async (req, res) => {
//   try {
//     const complaint = await Complaint.find();
//     res.status(200).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //optional to check all feedback api's.
// // router.get("/feedback", async (req, res) => {
// //   const data = await Feedback.find();
// //   res.json(data);
// // });

// module.exports = router;

// --------------------------------2nd code----------------------------
const express = require("express");
const router = express.Router();
const multer = require("multer");

// Import Models
const Complaint = require("../models/Complaint");

// Multer config-----used to upload the photos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 1. Add complaint-------working✅
router.post("/complaint", upload.single("file"), async (req, res) => {
  try {
    const { complaintType, description, email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    // Find the latest complaint by complaintId
    const lastComplaint = await Complaint.findOne().sort({ createdAt: -1 });
    let newComplaintId = "CMP-01";
    if (lastComplaint && lastComplaint.complaintId) {
      const lastIdNum = parseInt(lastComplaint.complaintId.split("-")[1]);
      const nextIdNum = lastIdNum + 1;
      newComplaintId = "CMP-" + String(nextIdNum).padStart(2, "0");
    }
    //same email blocks
    // const existingComplaint = await Complaint.findOne({ email });
    // if (existingComplaint) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Email already exists",
    //   });
    // }
    const ComplaintEntry = new Complaint({
      complaintId: newComplaintId,
      complaintType,
      description,
      email,
      file: req.file ? req.file.filename : null,
    });
    await ComplaintEntry.save(); // complaintsaves
    return res.status(201).json({
      success: true,
      message: "🎉 User Complaint registered successfully",
    });
  } catch (error) {
    console.error("✖️ Error in complaint registering:", error);
    res.status(500).json({
      success: false,
      message: "❌ User Complaint failed",
    });
  }
});

// 2. Compview data is fetched---- working✅
router.get("/compview", async (req, res) => {
  try {
    const complaint = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaint);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching Complaints", error: error.message });
  }
});

// 3. Complaintview delete added-------working✅
router.delete("/CompDel/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

//4. USER COMPLAINTS of userdashboard auth code------working✅
router.get("/user-complaints/:email", async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();
    const complaints = await Complaint.find({ email });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 5. view admindashboard TOP 5 LATEST COMPLAINTS--------working✅
router.get("/complaints/latest-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

// 6. View all ASSIGNED COMPLAINTS (ADMIN VIEW)--working✅
// --only assigned,opened and resolved in admin sidebar
router.get("/assigned-complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: { $ne: null },
    }).sort({ createdAt: -1 });

    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 7. view assigned complaints of individual investigators-admindashboardworking✅
router.get("/assigned-complaints/:investigatorId", async (req, res) => {
  const complaints = await Complaint.find({
    assignedTo: req.params.investigatorId,
  }).sort({ createdAt: -1 });
  res.json(complaints);
});

// 8. admindashboard view-----working✅
router.get("/complaints/dashboard-counts", async (req, res) => {
  const total = await Complaint.countDocuments();
  const assigned = await Complaint.countDocuments({ status: "Assigned" });
  const resolved = await Complaint.countDocuments({ status: "Resolved" });
  const closed = await Complaint.countDocuments({ status: "Closed" });
  res.json({
    totalComplaints: total,
    assignedComplaints: assigned,
    resolvedComplaints: resolved,
    closedComplaints: closed,
  });
});

/* 9. View all COMPLAINTS (ADMIN VIEW)*/ //-----working✅
router.get("/complaints/complaintadmin", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});

/* 10. ACCEPT COMPLAINT (Pending → Open) */ //adding complaints
router.put("/complaints/:complaintId/accept", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId },
      { status: "Open" },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Accept failed",
    });
  }
});

/* 11. ASSIGN COMPLAINT TO INVESTIGATOR (Open → Assigned)*/
router.put("/complaints/assign", async (req, res) => {
  try {
    const { complaintId, investigatorId } = req.body;
    if (!complaintId || !investigatorId) {
      return res.status(400).json({
        success: false,
        message: "complaintId and investigatorId are required",
      });
    }
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId },
      {
        assignedTo: investigatorId,
        status: "Assigned",
      },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.json({ success: true, complaint });
  } catch (err) {
    console.error("ASSIGN ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Assignment failed",
    });
  }
});

/* 12. INVESTIGATOR RESOLVES COMPLAINT (Assigned → Resolved)---chatgpt*/
router.put("/complaints/:complaintId/resolve", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findOneAndUpdate(
      { complaintId },
      { status: "Resolved" },
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({
      success: true,
      complaint,
      message: "Complaint resolved",
    });
  } catch (err) {
    res.status(500).json({ message: "Resolve failed" });
  }
});

/* ADMIN CLOSES COMPLAINT (Resolved → Closed)------------chatgpt */
router.put("/complaints/:complaintId/close", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const complaint = await Complaint.findOne({ complaintId });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    if (complaint.status !== "Resolved") {
      return res.status(400).json({
        message: "Only resolved complaints can be closed",
      });
    }
    complaint.status = "Closed";
    complaint.closedAt = new Date();
    await complaint.save();
    res.json({
      success: true,
      message: "Complaint closed",
      complaint,
    });
  } catch (err) {
    res.status(500).json({ message: "Close failed" });
  }
});

/* 6️⃣ VIEW SINGLE COMPLAINT BY complaintId*/ //-----working✅
router.get("/complaint/byid/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      complaintId: req.params.id,
    });
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// add Investigator sends solution----working✅
router.put("/complaints/:complaintId/resolve", async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { solution } = req.body;

    if (!solution) {
      return res.status(400).json({ message: "Solution is required" });
    }
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { complaintId }, // match complaint
      {
        solution: solution, // SAVE SOLUTION HERE
        status: "RESOLVED", // optional but recommended
      },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json({ success: true, complaint: updatedComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all complaints
// router.get("/complaint", async (req, res) => {
//   try {
//     const complaint = await Complaint.find();
//     res.status(200).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// 11. view complaints----working✅
router.get("/complaint", async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
});
// Get all complaints admin
// router.get("/complaints/complaints_admin", async (req, res) => {
//   try {
//     const complaint = await Complaint.find();
//     res.status(200).json(complaint);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//12. view complaints of complaintadmin----admindashboard working✅
router.get("/complaints/complaintadmin", async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
});
// 13. add all complaints //working✅
router.post("/complaint", async (req, res) => {
  const { complaintType, description, email } = req.body;
  console.log(email);
});
/* 14. View investigator cases */ //working✅
router.get("/investigator/cases/:investigatorId", async (req, res) => {
  try {
    const investigatorId = req.params.investigatorId.trim().toLowerCase();
    const cases = await Complaint.find({
      assignedTo: investigatorId,
    });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
