import axios from "axios";
import type { Snippet } from "../types/snippet";

const API_URL = import.meta.env.VITE_API_URL;

export interface SnippetQuery {
  q?: string;
  category?: string;
  framework?: string;
}

// Fetch snippets with optional filters
export const fetchSnippets = async (params?: SnippetQuery): Promise<Snippet[]> => {
  const res = await axios.get<Snippet[]>(`${API_URL}/snippets`, { params });
  return res.data;
};

// Fetch a single snippet by ID
export const fetchSnippetById = async (id: string): Promise<Snippet> => {
  const res = await axios.get<Snippet>(`${API_URL}/snippets/${id}`);
  return res.data;
};
