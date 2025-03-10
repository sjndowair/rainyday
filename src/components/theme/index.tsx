import { useState, useEffect } from "react";
//store
import { useThemeStore } from "../../store";
import { ILayOutProps } from "../../types/create-membership";
import ToggleButton from "../../atoms/toggleButton";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "THIS_THEME_KEY";

const Theme = ({ children }: ILayOutProps) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    const isSavedTheme = localStorage.getItem(THEME_KEY);
    if (isSavedTheme === "dark") return toggleTheme();
  }, [toggleTheme]);

  useEffect(() => {
    isDarkMode
      ? localStorage.setItem(THEME_KEY, "dark")
      : localStorage.setItem(THEME_KEY, "light");
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen   transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"
          : "bg-gradient-to-br from-white via-purple-200 to-purple-300 text-gray-900"
      }`}
    >
      {children}
      <div className="fixed bottom-8 right-[1.5rem]">
        <ToggleButton />
      </div>
    </div>
  );
};

export default Theme;
