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

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Clean input
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!cleanEmail) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if user already exists
    const existingUser = users.find(
      (user) => user.email === cleanEmail
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
      name: cleanName,
      email: cleanEmail,
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

    // Send response
    res.status(201).json({
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

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Clean email
    const cleanEmail = email.trim().toLowerCase();

    // Find user
    const user = users.find(
      (user) => user.email === cleanEmail
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

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

    // Send response
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
  const user = users.find(
    (user) => user.id === req.user.id
  );

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

// Logout route
app.post("/api/logout", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Logout successful",
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
