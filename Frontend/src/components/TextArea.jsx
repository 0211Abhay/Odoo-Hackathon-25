
import React from 'react';
import './TextArea.css';

const TextArea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 4,
  className = '',
  error = false,
  ...props 
}) => {
  const textareaClass = `
    textarea 
    ${error ? 'textarea-error' : ''}
    ${className}
  `.trim();

  return (
    <textarea
      className={textareaClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      {...props}
    />
  );
};

export default TextArea;
