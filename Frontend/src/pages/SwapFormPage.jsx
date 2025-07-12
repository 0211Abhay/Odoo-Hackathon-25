import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import './SwapFormPage.css';

const SwapFormPage = () => {
  const [offeredSkill, setOfferedSkill] = useState('');
  const [wantedSkill, setWantedSkill] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const skillOptions = [
    'Graphic Design',
    'UI/UX Design',
    'Web Development',
    'Photography',
    'Video Editing',
    'Copywriting',
    'Digital Marketing',
    'Data Analysis'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    navigate('/requests');
  };

  return (
    <div className="swap-form-page">
      <Header showNavigation />
      <div className="swap-form-container fade-in">
        <div className="swap-form">
          <h1 className="form-title">Initiate a Skill Swap</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="offered-skill">Offered Skill</label>
              <Select
                id="offered-skill"
                placeholder="Select a skill you can offer"
                options={skillOptions}
                value={offeredSkill}
                onChange={setOfferedSkill}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wanted-skill">Wanted Skill</label>
              <Select
                id="wanted-skill"
                placeholder="Select a skill you want to learn"
                options={skillOptions}
                value={wantedSkill}
                onChange={setWantedSkill}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <TextArea
                id="message"
                placeholder="Write a message to the other person"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
              />
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SwapFormPage;