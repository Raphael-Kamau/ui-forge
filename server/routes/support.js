// server/src/routes/support.js
import express from "express";
import { sendSupportMessage } from "../controllers/supportController.js";

const router = express.Router();

// --- Support Routes ---
router.post("/", sendSupportMessage);

export default router;
