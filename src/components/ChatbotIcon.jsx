import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ChatbotIcon.css';
const Chatbot = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleChatbotClick = () => {
     navigate('/chatbot');
  }
  return (
	<div 
      className="doj-chatbot-container"
      onClick={handleChatbotClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
    >
      <svg 
        className="doj-chatbot-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100"
      >
        {/* Circular Background */}
        <circle cx="50" cy="50" r="45" fill="#002D62"/>
        
        {/* Justice Scales */}
        <path 
          d="M30 40 L50 55 L70 40" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* Chat Dots */}
        <circle cx="40" cy="65" r="4" fill="#FFFFFF"/>
        <circle cx="50" cy="65" r="4" fill="#FFFFFF"/>
        <circle cx="60" cy="65" r="4" fill="#FFFFFF"/>
      </svg>

      {/* Hover Tooltip */}
      {isHovered && (
        <div className="doj-chatbot-tooltip">
          Need Help? Ask bot
        </div>
      )}
    </div>

  )
}
export default Chatbot