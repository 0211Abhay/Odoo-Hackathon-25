
import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import SkillTag from '../components/SkillTag';
import Avatar from '../components/Avatar';
import './ProfilePage.css';

const ProfilePage = () => {
  const [isPublic, setIsPublic] = useState(true);

  const offeredSkills = [
    'Graphic Design',
    'UI/UX Design',
    'Illustration',
    'Branding',
    'Motion Graphics'
  ];

  const wantedSkills = [
    'Photography',
    'Video Editing',
    'Copywriting',
    'Marketing Strategy'
  ];

  return (
    <div className="profile-page">
      <Header showNavigation />
      <div className="profile-container fade-in">
        <div className="profile-header">
          <Avatar 
            src="/lovable-uploads/f8712c35-5168-401c-b0c0-c235f3d4cd57.png"
            size="large"
            alt="Sophia Bennett"
          />
          <div className="profile-info">
            <h1>Sophia Bennett</h1>
            <p className="location">San Francisco, CA</p>
            <Button variant="secondary" size="small">
              Edit Profile
            </Button>
          </div>
        </div>

        <div className="profile-content">
          <section className="skills-section slide-in">
            <h2>Skills Offered</h2>
            <div className="skills-grid">
              {offeredSkills.map((skill, index) => (
                <SkillTag key={index} skill={skill} />
              ))}
            </div>
          </section>

          <section className="skills-section slide-in">
            <h2>Skills Wanted</h2>
            <div className="skills-grid">
              {wantedSkills.map((skill, index) => (
                <SkillTag key={index} skill={skill} variant="outlined" />
              ))}
            </div>
          </section>

          <section className="availability-section slide-in">
            <h2>Availability</h2>
            <p>Available for skill swaps on weekends and evenings.</p>
          </section>

          <section className="visibility-section slide-in">
            <h2>Profile Visibility</h2>
            <div className="visibility-control">
              <div className="visibility-info">
                <h3>Public</h3>
                <p>Your profile is visible to other users on the platform.</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;