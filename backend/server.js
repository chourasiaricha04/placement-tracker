const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is Running 🚀");
});

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
