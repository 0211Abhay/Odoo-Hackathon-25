import React from 'react';
import './Avatar.css';

const Avatar = ({ src, alt, size = 'medium', className = '' }) => {
  const avatarClass = `avatar avatar-${size} ${className}`.trim();

  return (
    <div className={avatarClass}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Avatar;