const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Timetable = require('./models/Timetable');

const app = express();
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/FORM-1")
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Error:", err));

app.use(cors());
app.use(express.json());

app.post('/api/timetable/create', async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    const saved = await newTimetable.save();

    console.log("Saved timetable:", saved);

    res.status(201).json({
      message: 'Timetable saved successfully!',
      data: saved
    });
  } catch (err) {
    console.error("Error saving timetable:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/timetable/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const timetable = await Timetable.findOne({ rollNumber });
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(5000, () => {
  console.log(`Server running at http://localhost:${5000}`);
});
