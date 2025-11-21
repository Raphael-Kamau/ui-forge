// server/src/controllers/supportController.js
import SupportMessage from "../models/SupportMessage.js";
import { validateEmail } from "../utils/validators.js";

export const sendSupportMessage = async (req, res, next) => {
  try {
    const { email, message } = req.body;

    // --- Validation ---
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ message: "Message must be at least 10 characters long" });
    }

    // --- Save support message ---
    const supportMsg = await SupportMessage.create({ email, message });

    res.status(201).json({
      success: true,
      supportMsg,
    });
  } catch (err) {
    next(err); // pass to centralized error handler
  }
};
