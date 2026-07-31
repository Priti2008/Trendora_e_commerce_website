const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Register
app.post("/api/users/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  users.push({
    name,
    email,
    password: hashed,
  });

  res.json({
    message: "User registered",
  });
});

// Login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ email }, "secretkey", {
    expiresIn: "1d",
  });

  res.json({ token });
});

app.listen(5001, () => {
  console.log("User Service running on port 5001");
});