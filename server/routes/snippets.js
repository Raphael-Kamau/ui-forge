// server/src/routes/snippets.js
import { Router } from "express";
import Snippet from "../models/Snippet.js";

const router = Router();

// list + basic filters
router.get("/", async (req, res) => {
  const { q, category, tag } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (q) filter.title = { $regex: q, $options: "i" };

  const snippets = await Snippet.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json(snippets);
});

// get one
router.get("/:id", async (req, res) => {
  const snippet = await Snippet.findById(req.params.id);
  res.json(snippet);
});

// create
router.post("/", async (req, res) => {
  const snippet = await Snippet.create(req.body);
  res.status(201).json(snippet);
});

// update
router.put("/:id", async (req, res) => {
  const updated = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// delete
router.delete("/:id", async (req, res) => {
  await Snippet.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
