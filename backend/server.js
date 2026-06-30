const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

// Start Server
app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
