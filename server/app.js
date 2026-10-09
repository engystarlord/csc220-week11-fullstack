require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.get("/", (req, res) => {
  res.send("CSC220 Week 11 API is running");
});
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

async function start() {
  await connectDB();
  const port = process.env.PORT || 3000;
  return app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error("API startup failed:", error.message);
    process.exit(1);
  });
}

module.exports = app;
module.exports.start = start;
