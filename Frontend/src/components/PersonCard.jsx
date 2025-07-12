// import React from 'react';
// import Button from './Button';
// import Avatar from './Avatar';
// import SkillTag from './SkillTag';
// import './PersonCard.css';

// const PersonCard = ({ person, className = '', style = {} }) => {
//   return (
//     <div className={`person-card ${className}`} style={style}>
//       <div className="person-card-content">
//         <div className="person-info">
//           <h3 className="person-name">{person.name}</h3>
//           <div className="person-details">
//             <p><strong>Offering:</strong> {person.skills.join(', ')}</p>
//             <p><strong>Seeking:</strong> {person.seeking.join(', ')}</p>
//             <p><strong>Available:</strong> {person.availability}</p>
//           </div>
//           <Button variant="secondary" size="small">
//             Request
//           </Button>
//         </div>
//         <div className="person-avatar">
//           <Avatar src={person.image} alt={person.name} size="large" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonCard;

import React from 'react';
import Button from './Button';
import Avatar from './Avatar';
import SkillTag from './SkillTag';
import './PersonCard.css';

const PersonCard = ({ person, className = '', style = {}, onRequestSwap, onViewProfile }) => {
  return (
    <div className={`person-card ${className}`} style={style}>
      <div className="person-card-content">
        <div className="person-info">
          <h3 className="person-name">{person.name}</h3>
          <div className="person-details">
            <p><strong>Offering:</strong> {person.skills.join(', ')}</p>
            <p><strong>Seeking:</strong> {person.seeking.join(', ')}</p>
            <p><strong>Available:</strong> {person.availability}</p>
          </div>
          <div className="card-actions">
            <Button 
              variant="secondary" 
              size="small"
              onClick={onViewProfile}
            >
              View Profile
            </Button>
            <Button 
              variant="primary" 
              size="small"
              onClick={onRequestSwap}
            >
              Request
            </Button>
          </div>
        </div>
        <div className="person-avatar">
          <Avatar src={person.image} alt={person.name} size="large" />
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
