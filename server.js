const express = require("express");
const app = express();

// Enable CORS for FreeCodeCamp testing
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

// API endpoint
// ✅ Root for empty date -> current time
app.get("/api", (req, res) => {
  const date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// ✅ Route for specific date
app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
