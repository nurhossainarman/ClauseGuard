import express from "express";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/auth.js";
import concernsRouter from "./routes/concerns.js";
import scansRouter from "./routes/scans.js";
import { authenticateToken } from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.use("/api/auth", authRouter);
app.use("/api/concerns", concernsRouter);
app.use("/api/scans", scansRouter);

// Protected route example
app.get("/api/me", authenticateToken, (req, res) => {
  res.json({ userId: req.userId, email: req.userEmail });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
