
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
          {typeof value === 'string' ? value : placeholder}
        </span>
        <span className={`select-arrow ${isOpen ? 'select-arrow-up' : ''}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {options.map((option, index) => {
            const optionText = typeof option === 'string' ? option : String(option);
            return (
              <div
                key={index}
                className={`select-option ${value === option ? 'select-option-selected' : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {optionText}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
