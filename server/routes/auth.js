// server/src/routes/auth.js
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = Router();

// register (email)
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, passwordHash, provider: "local" });
  res.status(201).json({ id: user._id });
});

// login (email)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, provider: "local" });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// google/github: accept provider token -> verify -> issue JWT (implement later)
router.post("/provider", async (req, res) => {
  // { provider: "google"|"github", email, username, avatar }
  const { provider, email, username, avatar } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email, username, avatar, provider });
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

export default router;
