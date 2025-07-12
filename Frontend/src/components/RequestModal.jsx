
import React, { useState } from 'react';
import Button from './Button';
import Select from './Select';
import TextArea from './TextArea';
import './RequestModal.css';

const RequestModal = ({ isOpen, onClose, targetUser, currentUserSkills = [] }) => {
  const [formData, setFormData] = useState({
    offeredSkill: '',
    desiredSkill: '',
    message: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.offeredSkill || !formData.desiredSkill) {
      alert('Please select both offered and desired skills');
      return;
    }
    
    console.log('Swap request submitted:', {
      targetUser: targetUser?.name,
      ...formData
    });
    
    // Reset form and close modal
    setFormData({ offeredSkill: '', desiredSkill: '', message: '' });
    onClose();
  };

  const handleCancel = () => {
    setFormData({ offeredSkill: '', desiredSkill: '', message: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="request-modal slide-in" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request Skill Swap</h2>
          <button className="close-button" onClick={handleCancel}>×</button>
        </div>

        <div className="modal-content">
          <div className="user-info">
            <p>Send a swap request to <strong>{targetUser?.name}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-group">
              <label>Skill You're Offering</label>
              <Select
                value={formData.offeredSkill}
                onChange={(value) => handleInputChange('offeredSkill', value)}
                options={currentUserSkills}
                placeholder="Select a skill to offer"
              />
            </div>

            <div className="form-group">
              <label>Skill You Want to Learn</label>
              <Select
                value={formData.desiredSkill}
                onChange={(value) => handleInputChange('desiredSkill', value)}
                options={targetUser?.skills || []}
                placeholder="Select desired skill"
              />
            </div>

            <div className="form-group">
              <label>Message (Optional)</label>
              <TextArea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Add a personal message..."
                rows={4}
              />
            </div>

            <div className="modal-actions">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Send Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
