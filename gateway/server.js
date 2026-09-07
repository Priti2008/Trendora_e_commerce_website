const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// Product Service
// ===============================
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://product-service:5002",
    changeOrigin: true,
  })
);

// ===============================
// User Service
// ===============================
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://user-service:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "",
    },
  })
);

// ===============================
// Order Service
// ===============================
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://order-service:5003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": "",
    },
  })
);

// ===============================
// Health Check
// ===============================
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API Gateway is running",
  });
});

// ===============================
// 404
// ===============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Gateway route not found",
  });
});

// ===============================
// Start Gateway
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

