import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-text">
          <h1 className="header-title">Todo List</h1>
          <p className="header-subtitle">Manage your tasks efficiently</p>
        </div>
        
        {user && (
          <div className="header-profile">
            <div className="profile-info">
              <span className="profile-name">{user.name || 'User'}</span>
              <span className="profile-email">{user.email}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
