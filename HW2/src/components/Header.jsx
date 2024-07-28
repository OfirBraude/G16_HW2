import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="w-full h-16 flex justify-between items-center px-4 bg-white dark:bg-gray-700 text-black dark:text-white fixed top-0 left-0 right-0">
      <Link to="/">
        <button className="text-lg font-bold">Main Menu</button>
      </Link>
      <button onClick={toggleTheme} className="text-lg font-bold">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;
