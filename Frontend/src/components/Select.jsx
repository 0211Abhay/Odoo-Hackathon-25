
import React, { useState } from 'react';
import './Select.css';

const Select = ({ 
  placeholder, 
  options = [], 
  value, 
  onChange, 
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectClass = `
    select-container 
    ${isOpen ? 'select-open' : ''}
    ${className}
  `.trim();

  return (
    <div className={selectClass} {...props}>
      <div 
        className="select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`select-value ${!value ? 'select-placeholder' : ''}`}>
          {value || placeholder}
        </span>
        <span className={`select-arrow ${isOpen ? 'select-arrow-up' : ''}`}>
          ▼
        </span>
      </div>
      
      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => (
            <div
              key={index}
              className={`select-option ${value === option ? 'select-option-selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
