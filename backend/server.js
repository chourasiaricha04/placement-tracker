

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load .env BEFORE importing routes/services
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/resume", resumeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Started on Port ${PORT}`);
});
