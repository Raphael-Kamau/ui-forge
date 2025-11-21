// server/src/controllers/snippetController.js
import Snippet from "../models/Snippet.js";

// Fetch snippets with optional filters
export const getSnippets = async (req, res, next) => {
  try {
    const { q, category, framework } = req.query;
    const filter = {};

    if (category && category !== "all") filter.category = category;
    if (framework && framework !== "all") filter.framework = framework;
    if (q) filter.title = { $regex: q, $options: "i" };

    const snippets = await Snippet.find(filter);
    res.json(snippets);
  } catch (err) {
    next(err);
  }
};

// Create a new snippet
export const createSnippet = async (req, res, next) => {
  try {
    const { title, code, category, framework } = req.body;

    if (!title || !code) {
      return res.status(400).json({ message: "Title and code are required" });
    }

    const snippet = await Snippet.create({
      title,
      code,
      category,
      framework,
      createdBy: req.user?.id || null, // optional: attach user if JWT middleware is used
    });

    res.status(201).json(snippet);
  } catch (err) {
    next(err);
  }
};
