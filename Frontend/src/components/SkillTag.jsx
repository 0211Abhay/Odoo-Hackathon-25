
import React from 'react';
import './SkillTag.css';

const SkillTag = ({ skill, variant = 'filled', className = '' }) => {
  const tagClass = `skill-tag skill-tag-${variant} ${className}`.trim();

  return (
    <span className={tagClass}>
      {skill}
    </span>
  );
};

export default SkillTag;
