
import React from 'react';
import Button from './Button';
import Avatar from './Avatar';
import './RequestCard.css';

const RequestCard = ({ request, className = '', style = {} }) => {
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
            <Button variant="secondary" size="small">
              Accept
            </Button>
          )}
          {request.status === 'accepted' && (
            <div className="status-indicator accepted"></div>
          )}
          {request.status === 'rejected' && (
            <div className="status-indicator rejected"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;