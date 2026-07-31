const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

// Product Service
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
  })
);

// User Service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "/",
    },
  })
);

// Order Service
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": "",
    },
  })
);

app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});