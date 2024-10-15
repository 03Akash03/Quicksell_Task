import React, { useState } from 'react';

function Card({ ticket, userName }) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  return (
    <div className={`card priority-${ticket.priority}`}>
      <h3>{ticket.title}</h3>
      <button onClick={toggleDetails} className="feature-request-button">
        Feature Request
      </button>
      {isDetailsVisible && (
        <div className="feature-details">
          <span>User: {ticket.userName}</span><br />
          <span>Status: {ticket.status}</span><br />
          <span>Priority: {ticket.priority}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
