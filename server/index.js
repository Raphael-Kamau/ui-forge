import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import snippetRoutes from "./routes/snippets.js";
import authRoutes from "./routes/auth.js";
import supportRoutes from "./routes/support.js";

dotenv.config();

const app = express();

// --- Middleware ---
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // restrict origin if needed
app.use(express.json());
app.use(morgan("dev"));

// --- Routes ---
app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/support", supportRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "UI Forge backend is running 🚀" });
});

// --- Error handling middleware ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --- Database connection ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI not set in environment variables");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

// --- Graceful shutdown ---
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});
