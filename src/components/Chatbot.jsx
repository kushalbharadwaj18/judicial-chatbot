import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Chatbot.css';
import AppContext from "../AppContext";
import { Link } from "react-router-dom";
const Chatbot = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const { user, setUser } = useContext(AppContext);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSend = async () => {
        if (inputValue.trim()) {
            const newMessages = [
                ...messages,
                { type: 'user', text: inputValue },
                { type: 'bot', text: 'Waiting for response...' } 
            ];
            setMessages(newMessages);
            setChatHistory([...chatHistory, inputValue]); 
            setInputValue('');
            try {
                const response = await fetch(' https://e610-34-143-213-194.ngrok-free.app/query', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: inputValue }),
                });
                const data = await response.json();
                const updatedMessages = [...newMessages];
                updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: data.answer };
                setMessages(updatedMessages);
            } catch (error) {
                console.error('Error fetching the bot response:', error);
                const updatedMessages = [...newMessages];
                updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: 'Failed to fetch response. Try again!' };
                setMessages(updatedMessages);
            }
        }
    };

    const handleLogout = () => {
      setUser(null);
      localStorage.setItem("user", null);
      navigate("/login");
    };
    let u = null;
    try {
      const storedUser = localStorage.getItem('user');
      u = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      u = null; 
    }
    return (
        <div className="chatbot-container">
            {/* Sidebar */}
            <div
                className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
                onMouseEnter={() => setIsSidebarOpen(true)}
                onMouseLeave={() => setIsSidebarOpen(false)}
            >
                <div className="sidebar-header">
                    <h2>Chat History</h2>
                    <div className="sidebar-buttons">
                        <button
                            onClick={() => {
                                setMessages([]);
                                setInputValue('');
                            }}
                            title="Start New Chat"
                        >
                            ➕
                        </button>
                    </div>
                </div>
                <div className="chat-history">
                    {chatHistory.map((item, index) => (
                        <div key={index} className="history-item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`chat-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {/* User Dropdown */}
                {u ?
                (<div className="user-area">
                    <div
                        className="user-icon"
                        onMouseEnter={() => setIsUserDropdownOpen(true)}
                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                        >
                        👤
                        {isUserDropdownOpen && (
                          <div className="user-dropdown">
                                <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
                            </div>
                        )}
                    </div>
                </div>)
                : 
                (<nav className="nav-links">
               <span>
                 <Link to="/login" className="login-link">
               Log in
                </Link>
          </span>
           <span>
            <Link to="/signup" className="signup-link">
             Sign up
             </Link>
           </span>
                    </nav>)
                  }

                {/* Messages Area */}
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.type}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="input-area">
                    <div className="search-wrapper">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = "50px"; // Reset height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault(); // Prevent newline creation
                                    handleSend(); // Call send function
                                }
                            }}
                            placeholder="Type your message..."
                        />
                        <button
                            className="send-button"
                            onClick={handleSend}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
