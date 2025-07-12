import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <Header showNavigation />
      <div className="home-container fade-in">
        <div className="welcome-section">
          <h1>Welcome to SkillSwap</h1>
          <p>Connect with people to exchange skills and learn something new</p>
          <div className="action-buttons">
            <Button onClick={() => navigate('/explore')} variant="primary">
              Explore Skills
            </Button>
            <Button onClick={() => navigate('/swap-form')} variant="secondary">
              Start a Swap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
