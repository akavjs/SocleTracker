import { useState, useEffect } from 'react';

const STORAGE_KEY = 'relivio-dark-mode';

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isDarkMode));
    
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.background = '#1a1a1a';
      document.body.style.color = '#e5e7eb';
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.style.background = '#f9fafb';
      document.body.style.color = '#111827';
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev: boolean) => !prev);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    setIsDarkMode
  };
}
