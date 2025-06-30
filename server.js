const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS to allow FCC to test the API remotely
app.use(cors({ optionsSuccessStatus: 200 }));

// Root endpoint (optional)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});

// ✅ Handle no date param: return current time
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// ✅ Handle date param
app.get("/api/:date", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // Check if it's a timestamp (only digits)
  if (/^\d+$/.test(dateParam)) {
    // Parse as integer
    const timestamp = parseInt(dateParam);

    // IMPORTANT:
    // If the timestamp is 13 digits, treat it as milliseconds
    // If it is 5-10 digits, treat as seconds (convert to ms)
    if (dateParam.length === 13) {
      date = new Date(timestamp);
    } else {
      date = new Date(timestamp * 1000);
    }
  } else {
    // Parse as ISO date string
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
