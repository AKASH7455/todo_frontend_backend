import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Todo App</h1>
        <p className="header-subtitle">Manage your tasks efficiently</p>
      </div>
    </header>
  );
};

export default Header;
