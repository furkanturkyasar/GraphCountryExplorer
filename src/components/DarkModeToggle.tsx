import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode') || 'false'));

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
    
    if (darkMode) {
      document.body.style.backgroundColor = "#1a202c";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 p-2 bg-blue-500 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out"
    >
      {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
    </button>
  );
};

export default DarkModeToggle;
