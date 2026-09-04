const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:5002";
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:5001";
const ORDER_SERVICE_URL =
  process.env.ORDER_SERVICE_URL || "http://localhost:5003";

// Product Service
app.use(
  "/api/products",
  createProxyMiddleware({
    target: PRODUCT_SERVICE_URL,
    changeOrigin: true,
  })
);
// User Service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
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
    target: ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": "",
    },
  })
);
app.listen(5000, () => {
  console.log("API Gateway running on port 5000");
});
