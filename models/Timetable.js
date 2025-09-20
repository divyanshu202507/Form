const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  studentName: { type: String, required: true },
  course: String,
  majorSubjects: Number,
  minorSubjects: Number,
  optionalSubjects: [String],
  workingDays: [String],
  classDuration: Number,
  lunchBreak: Number,
  timetable: {
    Monday: { start: String, end: String },
    Tuesday: { start: String, end: String },
    Wednesday: { start: String, end: String },
    Thursday: { start: String, end: String },
    Friday: { start: String, end: String },
    Saturday: { start: String, end: String },
    Sunday: { start: String, end: String }
  }
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);
