
import React, { useState } from 'react';
import Button from './Button';
import Avatar from './Avatar';
import ProfileModal from './ProfileModal';
import RequestDetailsModal from './RequestDetailsModal';
import './RequestCard.css';

const RequestCard = ({ request, className = '', style = {} }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRequestDetailsModal, setShowRequestDetailsModal] = useState(false);
  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return '#27ae60';
      case 'rejected': return '#e74c3c';
      default: return '#666';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStatusText = (status, date) => {
    switch (status) {
      case 'accepted': return `Request accepted on ${formatDate(date)}`;
      case 'rejected': return `Request rejected on ${formatDate(date)}`;
      default: return `Request sent on ${formatDate(date)}`;
    }
  };

  return (
    <div className={`request-card ${className}`} style={style}>
      <div className="request-card-content">
        <Avatar src={request.avatar} alt={request.name} size="medium" />
        <div className="request-info">
          <h3 className="request-name">{request.name}</h3>
          <p className="request-date" style={{ color: getStatusColor(request.status) }}>
            {getStatusText(request.status, request.date)}
          </p>
        </div>
        <div className="request-actions">
          {request.status === 'pending' && (
            <div className="pending-actions">
              <Button variant="secondary" size="small">
                Accept
              </Button>
              <Button variant="outline" size="small" onClick={() => setShowProfileModal(true)}>
                View Profile
              </Button>
              <Button variant="outline" size="small" onClick={() => setShowRequestDetailsModal(true)}>
                View Details
              </Button>
            </div>
          )}
          {request.status === 'accepted' && (
            <div className="status-indicator accepted"></div>
          )}
          {request.status === 'rejected' && (
            <div className="status-indicator rejected"></div>
          )}
        </div>
      </div>

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={{
          name: request.name,
          avatar: request.avatar,
          bio: 'Passionate developer with expertise in React and Node.js. Always eager to learn new technologies and share knowledge with the community.',
          location: 'San Francisco, CA',
          skills: ['React', 'Node.js', 'JavaScript', 'TypeScript'],
          seeking: ['Python', 'Machine Learning', 'DevOps']
        }}
      />

      <RequestDetailsModal
        isOpen={showRequestDetailsModal}
        onClose={() => setShowRequestDetailsModal(false)}
        requestDetails={{
          requester: request.name,
          offeredSkill: 'React Development',
          desiredSkill: 'Python Programming',
          message: 'Hi! I would love to learn Python programming. I can help you with React development in exchange. I have 3 years of experience with React and would be happy to share my knowledge. Let me know if you\'re interested!',
          date: request.date
        }}
      />
    </div>
  );
};

export default RequestCard;