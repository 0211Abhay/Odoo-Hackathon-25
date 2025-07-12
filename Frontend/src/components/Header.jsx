
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ showNavigation = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home' },
    { label: 'Explore', path: '/explore' },
    { label: 'My Skills', path: '/profile' },
    { label: 'Requests', path: '/requests' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => navigate('/home')}>
            <span className="logo-icon">◆</span>
            <span className="logo-text">SkillSwap</span>
          </div>
        </div>

        {showNavigation && (
          <>
            <nav className="header-nav">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="header-right">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
              </div>
              <button className="notification-btn">🔔</button>
              <div className="user-avatar" onClick={() => navigate('/profile')}>
                <img src="/lovable-uploads/f8712c35-5168-401c-b0c0-c235f3d4cd57.png" alt="User" />
              </div>
            </div>
          </>
        )}

        {!showNavigation && (
          <div className="header-right">
            <button className="nav-link">Browse</button>
            <button className="nav-link">My Skills</button>
            <button className="nav-link">Messages</button>
            <button className="get-started-btn" onClick={() => navigate('/home')}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
