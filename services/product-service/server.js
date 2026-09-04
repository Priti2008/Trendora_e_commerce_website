const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      service: "product-service",
      api: "ok",
      database: "connected",
    });
  } catch (err) {
    res.status(200).json({
      service: "product-service",
      api: "ok",
      database: "disconnected",
      message: err.message || "Unable to connect to PostgreSQL",
    });
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("🚀 Trendora Backend is Running...");
});

// Check Database Connection
pool.query("SELECT NOW()")
  .then(() => {
    console.log("✅ PostgreSQL Connected");
  })
  .catch((err) => {
    console.error("❌ Database Connection Error:", err.message);
  });

// Start Server
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
