const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.json(students);
  } catch {
    return res.status(500).json({ error: "Could not load students" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name, major, score } = req.body || {};
    const student = await Student.create({ name, major, score });
    return res.status(201).json(student);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    return res.status(204).end();
  } catch {
    return res.status(400).json({ error: "Invalid student id" });
  }
});

module.exports = router;
