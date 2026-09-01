const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Payment Service is healthy" });
});

app.post("/pay", (req, res) => {
  const { amount, orderId } = req.body;

  res.json({
    success: true,
    orderId,
    amount,
    paymentId: "PAY_" + Date.now(),
    status: "paid",
  });
});

const PORT = 5004;

app.listen(PORT, () => {
  console.log(`💳 Payment Service running on port ${PORT}`);
});
