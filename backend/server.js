import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

// Fake in-memory database
let users = [];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Trendora backend is working 🚀" });
});

// Register route
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
  };

  users.push(newUser);

  res.json({
    success: true,
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "trendora-secret-key",
    { expiresIn: "1d" }
  );

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Profile route
app.get("/api/profile", (req, res) => {
  res.json({
    success: true,
    user: {
      name: "Priti",
      email: "priti@example.com",
    },
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});