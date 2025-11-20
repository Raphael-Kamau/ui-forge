import axios from "axios";

// Create an axios instance with base URL from .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:5000/api
  withCredentials: true, // if you use cookies
});

// Attach JWT token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Health check ---
export const getHealth = () => api.get("/health");

// --- Auth endpoints ---
export const register = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

// --- Snippets endpoints ---
export const getSnippets = (params?: { q?: string; category?: string; framework?: string }) =>
  api.get("/snippets", { params });

// --- Support endpoints ---
export const sendSupportMessage = (data: { email: string; message: string }) =>
  api.post("/support", data);

export default api;
