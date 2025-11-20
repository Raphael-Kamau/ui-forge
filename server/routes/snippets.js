// server/routes/snippets.js
import express from "express";
import Snippet from "../models/Snippet.js";

const router = express.Router();

// GET /api/snippets?category=navbar&framework=tailwind&q=searchTerm
router.get("/", async (req, res) => {
  try {
    const { category, framework, q } = req.query;
    const filter = {};

    if (category && category !== "all") {
      filter.category = category.toLowerCase();
    }
    if (framework && framework !== "all") {
      filter.framework = framework.toLowerCase();
    }
    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }

    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
