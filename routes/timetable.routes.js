const express = require("express");
const router = express.Router();
const Timetable = require("../models/Timetable");

router.post("/create", async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    const savedTimetable = await newTimetable.save();
    res.status(201).json({ message: "Timetable saved successfully!", data: savedTimetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json(timetables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:rollNumber", async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ rollNumber: req.params.rollNumber });
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
