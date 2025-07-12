
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <div className={`search-bar ${className}`}>
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;