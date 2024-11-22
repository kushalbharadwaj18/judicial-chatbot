import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../AppContext';
import './Chatbot.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Chatbot = (props) => {
    const { user, setUser } = useContext(AppContext);
    const [query, setQuery] = useState('');
    const [queryHistory, setQueryHistory] = useState([]);
    const [response, setResponse] = useState('');
    const [isHovered, setHovered] = useState(false);
    const Navigate = useNavigate();
    const handleSearch = () => {
        if (query.trim()) {
            setQueryHistory([...queryHistory, query]);
            setResponse(`Response to "${query}"`);
            setQuery('');
        }
    };
    const handleLogout = () => {
        setUser(null);
        localStorage.setItem("user", null);
        Navigate('/login');
    }
    const handleClickOutside = (event) => {
        setHovered(false);
      };
    useEffect(() => {
        // Add global click listener when the card is visible
        if (isHovered) {
          document.addEventListener('click', handleClickOutside);
        }
    
        // Cleanup listener when the component unmounts or visibility changes
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [isHovered]);
    return (
        <div className="chatbot-container">
            {/* Sidebar showing query history */}
            <div className="sidebar">
                <h3>Previous Queries</h3>
                <ul>
                    {queryHistory.map((q, index) => (
                        <li key={index}>{q}</li>
                    ))}
                </ul>
            </div>
            <div className="h1-user" onMouseEnter={() => setHovered(true)} /*onMouseLeave={() => setHovered(false)}*/>
            {props.user ?
            <h2 className="user">{ props.user.charAt(0).toUpperCase() }</h2>
            :
        <nav>
          <div>
            <Link to="/login" className="login-link">Log in</Link>
          </div>
          <div>
            <Link to="/signup" className="signup-link">Sign up</Link>
          </div>
        </nav>
        }
            </div>
            {/* Main chat interface */}
            <div className="chatbox">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Type your query here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch}>Go</button>
                </div>
                {response && <div className="response">{response}</div>}
            </div>
            {
                isHovered ? 
                <div
                style={{
                    position: 'absolute',
                    top: '50px', 
                    right: '16px',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '10px',
                    zIndex: 10,
                  }}
                  >
                    {/* <h2>{ user }</h2> */}
                    <button
            style={{
              padding: '0px 10px',
               backgroundColor: 'white',
              color: 'black',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontFamily: 'Arial',
              display: 'flex',
              fontSize: '15px',
              fontStyle: 'bold'
            }}
            onClick={handleLogout}
          >
            <img src="https://static.vecteezy.com/system/resources/previews/016/451/134/original/logout-icon-sign-vector.jpg" style={{"width": "25px", "height": "21px", "position": "relative", "bottom": "1px", "right": "10px"}}/>
            <strong>Log out</strong>
          </button>
                </div> 
                : <div> </div>
            }
        </div>
    );
};
export default Chatbot;