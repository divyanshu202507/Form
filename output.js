async function fetchAndRenderTimetable(rollNumber) {
  const url = `http://localhost:5000/api/timetable/${rollNumber}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      alert('Timetable not found for roll number ' + rollNumber);
      return;
    }
    const data = await response.json();
    renderTimetable(data);
  } catch (error) {
    console.error('Error fetching timetable:', error);
  }
}

function renderTimetable(data) {
  const tbody = document.querySelector('tbody');
  // Clear existing timetable content
  tbody.querySelectorAll('tr').forEach(tr => {
    tr.querySelectorAll('td').forEach(td => td.textContent = '');
  });

  // Get day names from table header (skip first header for time)
  const dayNames = Array.from(document.querySelectorAll('thead th')).slice(1).map(th => th.textContent);
  // Get time slots from first column of tbody
  const timeSlots = Array.from(tbody.querySelectorAll('tr th')).map(th => th.textContent);

  // Populate timetable cells by matching day and time
  dayNames.forEach((day, dayIdx) => {
    if (!data.workingDays.includes(day)) return;
    const daySchedule = data.timetable[day];
    if (!daySchedule || !daySchedule.slots) return;

    daySchedule.slots.forEach(slot => {
      const timeIdx = timeSlots.indexOf(slot.time);
      if (timeIdx === -1) return;
      const row = tbody.querySelectorAll('tr')[timeIdx];
      if (row) {
        const cell = row.querySelectorAll('td')[dayIdx];
        if (cell) {
          cell.textContent = slot.subject;
        }
      }
    });
  });
}

// Example usage: call this with the roll number you want to fetch timetable for
fetchAndRenderTimetable('12345');
