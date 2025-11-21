import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data: LoginPayload) => {
  const res = await axios.post(`${API_URL}/auth/login`, data);
  return res.data;
};
