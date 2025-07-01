import React, { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(() => {
    return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={setDarkMode}
      size={24}
      moonColor="white"
      sunColor="black"
    />
  );
};

export default DarkModeToggle;
