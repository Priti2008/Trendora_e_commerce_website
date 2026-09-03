import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// TEMPORARY IN-MEMORY DATABASE
// ===============================

let users = [];

// ===============================
// JWT SECRET CHECK
// ===============================

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env file");
  process.exit(1);
}

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Trendora backend is working 🚀",
  });
});

// ===============================
// REGISTER
// ===============================

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = users.find(
      (user) => user.email === normalizedEmail
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
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    };

    users.push(newUser);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});

// ===============================
// LOGIN
// ===============================

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = users.find(
      (u) => u.email === normalizedEmail
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

    return res.json({
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

    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});

// ===============================
// AUTHENTICATION MIDDLEWARE
// ===============================

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is required",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ===============================
// PROTECTED PROFILE ROUTE
// ===============================

app.get(
  "/api/profile",
  authenticateToken,
  (req, res) => {
    const user = users.find(
      (u) => u.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
);

// ===============================
// LOGOUT ROUTE
// ===============================

app.post("/api/logout", authenticateToken, (req, res) => {
  return res.json({
    success: true,
    message: "Logout successful",
  });
});

// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ===============================
// ERROR HANDLER
// ===============================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Trendora backend running on http://localhost:${PORT}`);
});