import React from 'react';
import Button from './Button';
import SkillTag from './SkillTag';
import './RequestDetailsModal.css';

const RequestDetailsModal = ({ isOpen, onClose, requestDetails }) => {
    if (!isOpen) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="request-details-modal-overlay" onClick={onClose}>
            <div className="request-details-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="request-details-modal-header">
                    <h2>Request Details</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="request-details-modal-body">
                    <div className="request-info-section">
                        <div className="requester-info">
                            <h3>From: {requestDetails.requester}</h3>
                            <p className="request-date">Requested on {formatDate(requestDetails.date)}</p>
                        </div>

                        <div className="skills-exchange">
                            <div className="skill-offer">
                                <h4>Offering</h4>
                                <SkillTag skill={requestDetails.offeredSkill} />
                            </div>
                            <div className="exchange-arrow">⇄</div>
                            <div className="skill-desire">
                                <h4>Wanting to Learn</h4>
                                <SkillTag skill={requestDetails.desiredSkill} variant="outlined" />
                            </div>
                        </div>

                        <div className="message-section">
                            <h4>Message</h4>
                            <div className="message-content">
                                <p>{requestDetails.message}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="request-details-modal-footer">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsModal; 