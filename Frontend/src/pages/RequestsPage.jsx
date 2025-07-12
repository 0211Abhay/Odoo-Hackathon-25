import React from 'react';
import Header from '../components/Header';
import RequestCard from '../components/RequestCard';
import './RequestsPage.css';

const RequestsPage = () => {
  const pendingRequests = [
    {
      id: 1,
      name: 'Sarah Miller',
      avatar: '/lovable-uploads/1c828d19-6240-4c4d-b9e0-30c8f0626339.png',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      name: 'David Lee',
      avatar: '/lovable-uploads/1c828d19-6240-4c4d-b9e0-30c8f0626339.png',
      date: '2024-01-18',
      status: 'pending'
    }
  ];

  const acceptedRequests = [
    {
      id: 3,
      name: 'Emily Chen',
      avatar: '/lovable-uploads/1c828d19-6240-4c4d-b9e0-30c8f0626339.png',
      date: '2024-01-10',
      status: 'accepted'
    }
  ];

  const rejectedRequests = [
    {
      id: 4,
      name: 'Michael Brown',
      avatar: '/lovable-uploads/1c828d19-6240-4c4d-b9e0-30c8f0626339.png',
      date: '2024-01-05',
      status: 'rejected'
    }
  ];

  return (
    <div className="requests-page">
      <Header showNavigation />
      <div className="requests-container fade-in">
        <h1 className="page-title">Requests</h1>

        <section className="requests-section slide-in">
          <h2 className="section-title">Pending</h2>
          <div className="requests-list">
            {pendingRequests.map((request, index) => (
              <RequestCard
                key={request.id}
                request={request}
                className="slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </section>

        <section className="requests-section slide-in">
          <h2 className="section-title">Accepted</h2>
          <div className="requests-list">
            {acceptedRequests.map((request, index) => (
              <RequestCard
                key={request.id}
                request={request}
                className="slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </section>

        <section className="requests-section slide-in">
          <h2 className="section-title">Rejected</h2>
          <div className="requests-list">
            {rejectedRequests.map((request, index) => (
              <RequestCard
                key={request.id}
                request={request}
                className="slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RequestsPage;