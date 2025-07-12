
import React from 'react';
import Avatar from './Avatar';
import SkillTag from './SkillTag';
import Button from './Button';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, user, onRequestSwap }) => {
  if (!isOpen || !user) return null;

  const handleRequestSwap = () => {
    onRequestSwap(user);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal slide-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Profile Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          <div className="profile-header">
            <Avatar 
              src={user.image} 
              alt={user.name} 
              size="large" 
            />
            <div className="profile-info">
              <h3>{user.name}</h3>
              <p className="availability">Available: {user.availability}</p>
            </div>
          </div>

          <div className="profile-section">
            <h4>Skills Offered</h4>
            <div className="skills-grid">
              {user.skills?.map((skill, index) => (
                <SkillTag key={index} skill={skill} />
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h4>Skills Seeking</h4>
            <div className="skills-grid">
              {user.seeking?.map((skill, index) => (
                <SkillTag key={index} skill={skill} variant="outlined" />
              ))}
            </div>
          </div>

          {user.bio && (
            <div className="profile-section">
              <h4>About</h4>
              <p className="bio">{user.bio}</p>
            </div>
          )}

          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleRequestSwap}>
              Request Swap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
