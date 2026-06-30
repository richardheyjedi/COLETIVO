import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const [isDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {};

  return { isDark, toggleTheme };
};
