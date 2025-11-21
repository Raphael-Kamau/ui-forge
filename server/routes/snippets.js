// server/src/routes/snippets.js
import express from "express";
import { getSnippets, createSnippet } from "../controllers/snippetController.js";

const router = express.Router();

// --- Snippet Routes ---
router.get("/", getSnippets);
router.post("/", createSnippet);

export default router;
