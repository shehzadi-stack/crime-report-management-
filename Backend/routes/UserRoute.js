// // const express = require("express");
// // const router = express.Router();
// // const bcrypt = require("bcryptjs");

// // // Import Models
// // const Register = require("../models/Register");
// // const Login = require("../models/Login");

// // // Register route
// // router.post("/register", async (req, res) => {
// //   try {
// //     const { fullName, gender, dob, city, address, pincode, email, mobileNo } =
// //       req.body;
// //     console.log("reg data");

// //     // Check if already exists
// //     const existingUser = await Register.findOne({ email });
// //     if (existingUser) {
// //       return res
// //         .status(400)
// //         .json({ success: false, message: " 🚫 Email already registered" });
// //     }
// //     // used to encrpt the  pwd
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // Save in Register collection
// //     const registerEntry = new Register({
// //       fullName,
// //       gender,
// //       dob,
// //       city,
// //       address,
// //       pincode,
// //       email,
// //       mobileNo,
// //     });

// //     await registerEntry.save();

// //     const LoginEntry = new Login({
// //       email,
// //       hashedPassword,
// //     });
// //     await LoginEntry.save();

// //     res
// //       .status(201)
// //       .json({ success: true, message: "🎉User Registerd succesfully" });
// //   } catch (error) {
// //     console.error("Error registering user:", error);
// //     res
// //       .status(500)
// //       .json({ success: false, message: " ❌ User Registration failed" });
// //   }
// // });

// // // Get all registered users-----optional
// // // router.get("/Register", async (req, res) => {
// // //   try {
// // //     const users = await Register.find();
// // //     res.status(200).json(Register);
// // //   } catch (error) {
// // //     res.status(500).json({ message: error.message });
// // //   }
// // // });

// // //optional-----api check
// // router.get("/register", async (req, res) => {
// //   const data = await Register.find();
// //   res.json(data);
// // });

// // // regview data is fetched
// // router.get("/regview", async (req, res) => {
// //   try {
// //     const register = await Register.find().sort({ createdAt: -1 });
// //     res.json(register);
// //   } catch (error) {
// //     res
// //       .status(500)
// //       .json({ message: "Error fetching registration", error: error.message });
// //   }
// // });
// // // Regview delete
// // router.delete("/RegDel/:id", async (req, res) => {
// //   try {
// //     await Register.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: "Deleted successfully" });
// //   } catch (err) {
// //     res.status(500).json({ message: "Delete failed" });
// //   }
// // });

// // // login authentication
// // router.post();

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");

// // Import Models
// const Register = require("../models/Register");
// const Login = require("../models/Login");

// // REGISTER ROUTE
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password, utype } = req.body;

//     const user = await Login.findOne({ email, utype });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or user type",
//       });
//     }

//     //PLAIN comparison (because register saved plain password)
//     if (password !== user.password) {
//       return res.status(400).json({
//         message: "Invalid password",
//       });
//     }

//     res.json({
//       success: true,
//       email: user.email,
//       utype: user.utype,
//     });
//   } catch (error) {
//     console.error("LOGIN ERROR:", error.message);
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// //   LOGIN AUTH ROUTE

// router.post("/login_auth", async (req, res) => {
//   try {
//     const { email, password, utype } = req.body;

//     const user = await Login.find({ email, utype });
//     if (!user) {
//       return res.status(400).json({ message: "🚫 Invalid email or user type" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "🚫 Invalid password" });
//     }

//     res.json({
//       success: true,
//       email: user.email,
//       utype: user.utype,
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "❌ Login failed" });
//   }
// });

// // --------------------OPTIONAL ROUTES-----------------------------------------

// //register api
// router.get("/register", async (req, res) => {
//   const data = await Register.find();
//   res.json(data);
// });

// //regview  route
// router.get("/regview", async (req, res) => {
//   try {
//     const register = await Register.find().sort({ createdAt: -1 });
//     res.json(register);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching registration",
//       error: error.message,
//     });
//   }
// });

// // regview delete
// router.delete("/RegDel/:id", async (req, res) => {
//   try {
//     await Register.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// import models
const Register = require("../models/Register");
const Login = require("../models/Login");
const complaint = require("../models/Complaint");

// POST - Register user
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      gender,
      dob,
      city,
      address,
      pincode,
      email,
      mobileNo,
      password,
    } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save Register data
    const registerEntry = new Register({
      fullName,
      gender,
      dob: new Date(dob),
      city,
      address,
      pincode,
      email,
      mobileNo,
    });

    await registerEntry.save();

    // Save Login data
    const loginEntry = new Login({
      email: email,
      password: hashedPassword,
    });

    await loginEntry.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET - registration Fetch registrations
router.get("/regview", async (req, res) => {
  try {
    const register = await Register.find().sort({ createdAt: -1 });
    res.json(register);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching registration data",
      error: err.message,
    });
  }
});

//register api
router.get("/register", async (req, res) => {
  const data = await Register.find();
  res.json(data);
});

// register route delete
router.delete("/regdel/:id", async (req, res) => {
  try {
    await Register.findByIdAndDelete(req.params.id);
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: " Error deleting register details",
      error: error.message,
    });
  }
});

module.exports = router;
