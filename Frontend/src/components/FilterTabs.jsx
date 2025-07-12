
import React from 'react';
import './FilterTabs.css';

const FilterTabs = ({ filters, activeFilter, onFilterChange, className = '' }) => {
  return (
    <div className={`filter-tabs ${className}`}>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-tab ${activeFilter === filter ? 'filter-tab-active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
