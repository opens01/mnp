const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
router.post("/", async (req, res) => {
  try { const student = await Student.create(req.body); res.status(201).json(student); }
  catch (err) { res.status(400).json({ message: err.message }); }
});
router.get("/", async (req, res) => {
  try { res.json(await Student.find()); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;
