
import React, { useState } from 'react';
import './SkillFilter.css';

const SkillFilter = ({ availableSkills = [], selectedSkills = [], onSkillsChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSkillToggle = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    onSkillsChange(updatedSkills);
  };

  const clearAllFilters = () => {
    onSkillsChange([]);
  };

  return (
    <div className="skill-filter">
      <div className="filter-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="filter-label">
          Filter by Skills {selectedSkills.length > 0 && `(${selectedSkills.length})`}
        </span>
        <span className={`filter-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <span>Select skills to filter by</span>
            {selectedSkills.length > 0 && (
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>
          
          <div className="skills-list">
            {availableSkills.map((skill, index) => (
              <label key={index} className="skill-checkbox">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <span className="checkmark"></span>
                <span className="skill-name">{skill}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillFilter;