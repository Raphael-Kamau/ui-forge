import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: string;
  name?: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // try to fetch current user
    axios.get("/api/auth/me").then(res => setUser(res.data)).catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await axios.post("/api/auth/logout").catch(() => {});
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
