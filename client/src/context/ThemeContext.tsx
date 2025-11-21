import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Optional: persist theme in localStorage
  useEffect(() => {
    const stored = localStorage.getItem("appTheme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Background colors for each theme
  const backgroundColor = theme === "light" ? "#f8f9fa" : "#121212";
  const textColor = theme === "light" ? "#212529" : "#f8f9fa";

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        data-bs-theme={theme}
        style={{
          minHeight: "100vh",
          backgroundColor,
          color: textColor,
          transition: "background-color 0.3s ease, color 0.3s ease"
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
