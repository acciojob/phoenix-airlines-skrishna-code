
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "data");
const file = path.join(dataDir, "bookings.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(file)) {
  fs.writeFileSync(file, "[]");
}

function readBookings() {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

app.get("/api/bookings", (req, res) => {
  res.json(readBookings());
});

app.post("/api/bookings", (req, res) => {
  const { passenger, flight } = req.body;

  if (
    !passenger?.name ||
    !passenger?.email ||
    !passenger?.phone ||
    !flight
  ) {
    return res.status(400).json({
      message: "Passenger and flight details are required."
    });
  }

  const booking = {
    ...req.body,
    id: randomUUID(),
    status: "Confirmed",
    bookedAt: new Date().toISOString()
  };

  const bookings = readBookings();
  bookings.push(booking);

  fs.writeFileSync(file, JSON.stringify(bookings, null, 2));

  res.status(201).json(booking);
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
