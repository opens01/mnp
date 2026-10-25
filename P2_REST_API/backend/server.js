const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const students = [
  { id: 1, name: "Rahul", course: "BSc IT" },
  { id: 2, name: "Priya", course: "BSc DS" },
  { id: 3, name: "Ankit", course: "BCom" }
];
app.get("/", (req, res) => res.send("Student REST API is running"));
app.get("/students", (req, res) => res.json(students));
app.listen(5000, () => console.log("Server running on port 5000"));
