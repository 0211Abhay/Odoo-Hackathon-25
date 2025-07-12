
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Select from '../components/Select';
import Avatar from '../components/Avatar';
import SkillTag from '../components/SkillTag';
import SkillSelectionModal from '../components/SkillSelectionModal';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: 'Sophia Bennett',
    email: 'sophia@example.com',
    location: 'San Francisco, CA',
    bio: 'Passionate designer with 5+ years of experience in creating beautiful user interfaces and brand identities.',
    availability: 'Weekends and evenings',
    profileImage: '/lovable-uploads/f8712c35-5168-401c-b0c0-c235f3d4cd57.png'
  });

  const [offeredSkills, setOfferedSkills] = useState([
    'Graphic Design',
    'UI/UX Design',
    'Illustration',
    'Branding',
    'Motion Graphics'
  ]);

  const [wantedSkills, setWantedSkills] = useState([
    'Photography',
    'Video Editing',
    'Copywriting',
    'Marketing Strategy'
  ]);

  const [showOfferedSkillsModal, setShowOfferedSkillsModal] = useState(false);
  const [showWantedSkillsModal, setShowWantedSkillsModal] = useState(false);

  const availabilityOptions = [
    'Weekdays',
    'Weekends',
    'Evenings',
    'Flexible',
    'Weekends and evenings'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOfferedSkillsSave = (newSkills) => {
    setOfferedSkills(newSkills);
  };

  const handleWantedSkillsSave = (newSkills) => {
    setWantedSkills(newSkills);
  };

  const removeOfferedSkill = (skillToRemove) => {
    setOfferedSkills(offeredSkills.filter(skill => skill !== skillToRemove));
  };

  const removeWantedSkill = (skillToRemove) => {
    setWantedSkills(wantedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    console.log('Profile updated:', {
      ...profileData,
      offeredSkills,
      wantedSkills
    });
    // Handle save logic here
    navigate('/profile');
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile-page">
      <Header showNavigation />
      <div className="edit-profile-container fade-in">
        <div className="edit-profile-header">
          <h1>Edit Profile</h1>
          <p>Update your information and skills</p>
        </div>

        <div className="edit-profile-content">
          <div className="profile-image-section">
            <Avatar
              src={profileData.profileImage}
              size="large"
              alt={profileData.fullName}
            />
            <Button variant="secondary" size="small">
              Change Photo
            </Button>
          </div>

          <div className="profile-form">
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <Input
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <Input
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <TextArea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell others about yourself"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>Availability</label>
                <Select
                  value={profileData.availability}
                  onChange={(value) => setProfileData(prev => ({ ...prev, availability: value }))}
                  options={availabilityOptions}
                  placeholder="Select your availability"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Skills Offered</h2>
              <div className="skills-section-header">
                <p>Select skills you can offer to others</p>
                <Button
                  size="small"
                  onClick={() => setShowOfferedSkillsModal(true)}
                >
                  Add Skills
                </Button>
              </div>
              <div className="skills-grid">
                {offeredSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <SkillTag skill={skill} />
                    <button
                      className="remove-skill"
                      onClick={() => removeOfferedSkill(skill)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {offeredSkills.length === 0 && (
                  <div className="no-skills">No skills added yet</div>
                )}
              </div>
            </div>

            <div className="form-section">
              <h2>Skills Wanted</h2>
              <div className="skills-section-header">
                <p>Select skills you want to learn from others</p>
                <Button
                  size="small"
                  onClick={() => setShowWantedSkillsModal(true)}
                >
                  Add Skills
                </Button>
              </div>
              <div className="skills-grid">
                {wantedSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <SkillTag skill={skill} variant="outlined" />
                    <button
                      className="remove-skill"
                      onClick={() => removeWantedSkill(skill)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {wantedSkills.length === 0 && (
                  <div className="no-skills">No skills added yet</div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SkillSelectionModal
        isOpen={showOfferedSkillsModal}
        onClose={() => setShowOfferedSkillsModal(false)}
        onSave={handleOfferedSkillsSave}
        existingSkills={offeredSkills}
        title="Select Skills to Offer"
      />

      <SkillSelectionModal
        isOpen={showWantedSkillsModal}
        onClose={() => setShowWantedSkillsModal(false)}
        onSave={handleWantedSkillsSave}
        existingSkills={wantedSkills}
        title="Select Skills to Learn"
      />
    </div>
  );
};

export default EditProfilePage;