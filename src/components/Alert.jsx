import React from 'react';
import './Alert.css'; // Import custom CSS styles

const Alert = ({ message, type, onClose }) => {
  if (!message) return null; // Don't render anything if there's no message

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Alert;
