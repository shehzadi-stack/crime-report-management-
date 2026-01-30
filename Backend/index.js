// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const app = express();
// // Static file serving
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // CORS setup
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//   })
// );

// // Body parsing
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //Routes
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// //Start Server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));

// //MongoDb connection
// if (!process.env.MONGO_URI) {
//   console.error("X MONGO_URI is not set in .env file");
//   process.exit(1);
// }

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log(" ✅ MongoDB connected");
//   })
//   .catch((err) => {
//     console.error("❌MongoDB connection error:", err.message);
//     process.exit(1);
//   });

// // routes
// // const registerRoutes = require("./routes/UserRoute");
// // app.use("/api", registerRoutes);

// const userRoute = require("./routes/UserRoute");
// app.use("/api", userRoute);

// // extra to check in browser----http://localhost:5002/api/users
// // app.use("/api", require("./routes/UserRoute"));
// app.use("/api", require("./routes/ComplaintRoute"));
// app.use("/uploads", express.static("uploads"));
// app.use("/api", require("./routes/FeedbackRoute"));
// app.use("/api", require("./routes/InvestigatorRoute"));

// // --note :views are generating automatically here----------
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const profileRoutes = require("./routes/ProfileRoute");

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Body parsing (ONCE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ROUTES (REGISTER ONCE, BEFORE listen)
app.use("/api", require("./routes/UserRoute"));
app.use("/api", require("./routes/LoginRoute"));
// complaint routes for dashboard and registerd table for admin db
app.use("/api", require("./routes/ComplaintRoute"));
app.use("/api/complaints", require("./routes/ComplaintRoute"));
app.use("/api", require("./routes/FeedbackRoute"));
app.use("/api", require("./routes/InvestigatorRoute"));
app.use("/uploads", express.static("uploads"));
app.use("/api", profileRoutes);

// MongoDB
if (!process.env.MONGO_URI) {
  console.error("X MONGO_URI is not set in .env file");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// START SERVER (LAST)
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on the port ${PORT}`));
