import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import snippetRoutes from "./routes/snippets.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("UI Forge backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
mongoose 
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(PORT, () => console.log(`✅ Server connected on port ${PORT}`)))
    .catch((err) => console.error("DB error:", err));