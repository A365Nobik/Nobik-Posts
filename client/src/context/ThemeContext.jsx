import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const body = document.body;

    const applyTheme = (theme) => {
      body.classList.remove("light", "dark");
      body.classList.add(theme);
    };

    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme:dark)");
      const systemDark = mql.matches ? "dark" : "light";
      applyTheme(systemDark);

      const listenet = (event) => applyTheme(event .matches ? "dark" : "light");
      mql.addEventListener("change", listenet);
      return () => mql.removeEventListener("change", listenet);
    } else {
      applyTheme(theme);
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
