import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import "./ThemeToggle.css";

type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.setAttribute("data-theme", resolvedTheme);
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = sessionStorage.getItem("theme") as Theme | null;
    const initialTheme =
      stored === "light" || stored === "dark" ? stored : "system";
    applyTheme(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const getNextTheme = (currentTheme: Theme): Theme => {
    if (currentTheme === "light") return "dark";
    if (currentTheme === "dark") return "system";
    return "light";
  };

  const getThemeLabel = (themeValue: Theme): string => {
    return themeValue.charAt(0).toUpperCase() + themeValue.slice(1);
  };

  const cycleTheme = () => {
    const nextTheme = getNextTheme(theme);

    setTheme(nextTheme);
    applyTheme(nextTheme);

    if (nextTheme === "system") {
      sessionStorage.removeItem("theme");
    } else {
      sessionStorage.setItem("theme", nextTheme);
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return faSun;
      case "dark":
        return faMoon;
      case "system":
        return faCircleHalfStroke;
    }
  };

  const getTitle = () => {
    const nextTheme = getNextTheme(theme);
    return `${getThemeLabel(theme)} mode (click for ${getThemeLabel(nextTheme).toLowerCase()})`;
  };

  return (
    <button
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={getTitle()}
      title={getTitle()}
    >
      <FontAwesomeIcon icon={getIcon()} />
    </button>
  );
}

export default ThemeToggle;
