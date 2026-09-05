import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Fake in-memory database
let users = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "trendora_secret_key_2026";

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Trendora backend is working 🚀",
  });
});

// Register route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (password.length < 6) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 6 characters",
  });
}

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    };

    users.push(newUser);

    // Create JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
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
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication token required",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Profile route
app.get("/api/profile", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});