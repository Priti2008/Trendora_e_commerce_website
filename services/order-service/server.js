const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let orders = [];

// Create order
app.post("/", async (req, res) => {
  try {
    const { items, total, userEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Simulate payment service call
    console.log("💳 Payment processed for:", total);

    // Simulate notification service call
    console.log("🔔 Notification sent to:", userEmail);

    const order = {
      id: Date.now(),
      items,
      total,
      userEmail,
      status: "Confirmed",
      createdAt: new Date(),
    };

    orders.unshift(order);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get all orders
app.get("/", (req, res) => {
  res.json(orders);
});

app.listen(5003, () => {
  console.log("🚀 Order Service running on port 5003");
});