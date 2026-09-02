const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// register
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
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

// Login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secretkey",
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

app.listen(5001, () => {
  console.log("User Service running on port 5001");
});