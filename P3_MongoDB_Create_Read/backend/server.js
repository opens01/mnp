const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err.message));

app.use("/student", require("./routes/studentRoutes"));
app.get("/", (req, res) => res.send("Backend running successfully"));
app.listen(5000, () => console.log("Server running on port 5000"));
