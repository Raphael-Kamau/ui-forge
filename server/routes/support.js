// server/routes/support.js
import express from "express";
import SupportMessage from "../models/SupportMessage.js";

const router = express.Router();

// Submit a support/enquiry message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new SupportMessage({ name, email, message });
    await newMessage.save();

    res.json({ success: true, message: "Support message received" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// (Optional) Admin-only: view all messages
router.get("/", async (req, res) => {
  try {
    const messages = await SupportMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
