const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Notification Service is healthy" });
});

app.post("/notify", (req, res) => {
  const { type, message, userEmail } = req.body;

  console.log("🔔 Notification sent:");
  console.log("Type:", type);
  console.log("To:", userEmail);
  console.log("Message:", message);

  res.json({
    success: true,
    type,
    userEmail,
    message,
    sentAt: new Date().toISOString(),
  });
});

const PORT = 5005;

app.listen(PORT, () => {
  console.log(`🔔 Notification Service running on port ${PORT}`);
});