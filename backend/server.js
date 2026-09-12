const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = 5000;
const JWT_SECRET = "trendora-secret-key";

app.use(cors());
app.use(express.json());

let users = [];

// Pre-register Admin account
(async () => {
  const adminHash = await bcrypt.hash("admin123", 10);
  users.push({
    id: 1,
    name: "Store Admin",
    email: "admin@trendora.com",
    password: adminHash,
    role: "admin"
  });
})();

// Test
app.get("/", (req, res) => {
  res.json({
    message: "Trendora backend is working 🚀"
  });
});

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isTargetAdmin = email.toLowerCase() === "admin@trendora.com";

    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: isTargetAdmin ? "admin" : "customer"
    };

    users.push(user);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "customer"
      },
      JWT_SECRET,
      {
        expiresIn: "1d"
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
        role: user.role || (user.email.toLowerCase() === "admin@trendora.com" ? "admin" : "customer")
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Products
const sampleProducts = [
  { id: 1, name: "Air Max Elite", price: 4999, rating: 4.9, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80", category: "Footwear" },
  { id: 2, name: "Street Runner", price: 4599, rating: 4.8, image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80", category: "Footwear" },
  { id: 3, name: "Urban Force", price: 5199, rating: 4.9, image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=800&q=80", category: "Footwear" },
  { id: 4, name: "Pulse Watch", price: 7999, rating: 4.7, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=800&q=80", category: "Accessories" },
  { id: 5, name: "Classic Leather", price: 3799, rating: 4.7, image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=800&q=80", category: "Accessories" },
  { id: 6, name: "Sport Runner X", price: 4299, rating: 4.8, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80", category: "Footwear" },
  { id: 7, name: "Canvas Sneakers", price: 2899, rating: 4.6, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80", category: "Footwear" },
  { id: 8, name: "Premium Backpack", price: 2499, rating: 4.8, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80", category: "Accessories" },
  { id: 9, name: "Urban Sunglasses", price: 1999, rating: 4.5, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80", category: "Accessories" },
  { id: 10, name: "Classic White Tee", price: 1299, rating: 4.7, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80", category: "Clothing" },
  { id: 11, name: "Premium Hoodie", price: 2499, rating: 4.8, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80", category: "Clothing" },
  { id: 12, name: "Denim Jacket", price: 3499, rating: 4.7, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&w=800&q=80", category: "Clothing" }
];

app.get("/api/products", (req, res) => {
  const { search } = req.query;
  if (search) {
    const query = search.toLowerCase();
    const filtered = sampleProducts.filter((p) =>
      p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    );
    return res.json(filtered);
  }
  res.json(sampleProducts);
});

// Profile
app.get("/api/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token required"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    const user = users.find(
      (user) => user.id === decoded.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token"
    });
  }
});

// =========================
// ORDERS & ADMIN ROUTES
// =========================
let orders = [
  {
    id: "ORD-1001",
    customer: { name: "John Doe", email: "john@example.com" },
    items: [
      { name: "Air Max Elite", price: 4999, quantity: 1 },
      { name: "Pulse Watch", price: 7999, quantity: 1 }
    ],
    total: 12998,
    status: "Confirmed",
    createdAt: new Date().toLocaleDateString()
  }
];

// Create Order
app.post("/api/orders", (req, res) => {
  try {
    const { items, total, customer, address } = req.body;
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: customer || { name: "Guest User", email: "guest@example.com" },
      items: items || [],
      total: total || 0,
      address: address || {},
      status: "Confirmed",
      createdAt: new Date().toLocaleDateString()
    };
    orders.unshift(newOrder);
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error placing order" });
  }
});

// Admin: Get Users
app.get("/api/admin/users", (req, res) => {
  const sanitizedUsers = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: "Customer"
  }));
  res.json({
    success: true,
    total: sanitizedUsers.length,
    users: sanitizedUsers
  });
});

// Admin: Get Orders
app.get("/api/admin/orders", (req, res) => {
  res.json({
    success: true,
    total: orders.length,
    orders
  });
});

// Admin: Update Order Status
app.put("/api/admin/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ success: false, message: "Order not found" });
  }
  order.status = status;
  res.json({ success: true, message: "Status updated successfully", order });
});

// Start server
app.listen(PORT, () => {
  console.log(
    `Trendora backend running on http://localhost:${PORT}`
  );
});
