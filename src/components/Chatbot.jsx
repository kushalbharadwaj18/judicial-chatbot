import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [query, setQuery] = useState('');
    const [queryHistory, setQueryHistory] = useState([]);
    const [response, setResponse] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            // Add the query to the history
            setQueryHistory([...queryHistory, query]);
            // Mock response for now, in a real scenario an API call would go here
            setResponse(`Response to "${query}"`);
            setQuery(''); // Clear the query after submission
        }
    };

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
        </div>
    );
};
export default Chatbot;