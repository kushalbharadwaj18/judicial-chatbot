// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import './Chatbot.css';
// import AppContext from "../AppContext";
// import { Link } from "react-router-dom";
// const Chatbot = () => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [inputValue, setInputValue] = useState('');
//     const [chatHistory, setChatHistory] = useState([]);
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//     const { user, setUser } = useContext(AppContext);
//     const navigate = useNavigate(); // Initialize the navigate function

//     const handleSend = async () => {
//         if (inputValue.trim()) {
//             const newMessages = [
//                 ...messages,
//                 { type: 'user', text: inputValue },
//                 { type: 'bot', text: 'Waiting for response...' }
//             ];
//             setMessages(newMessages);
//             setChatHistory([...chatHistory, inputValue]);
//             setInputValue('');
//             try {
//                 const response = await fetch('https://798a-34-19-118-254.ngrok-free.app/query', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ query: inputValue }),
//                 });
//                 const data = await response.json();
//                 const updatedMessages = [...newMessages];
//                 updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: data.answer };
//                 setMessages(updatedMessages);
//             } catch (error) {
//                 console.error('Error fetching the bot response:', error);
//                 const updatedMessages = [...newMessages];
//                 updatedMessages[updatedMessages.length - 1] = { type: 'bot', text: 'Failed to fetch response. Try again!' };
//                 setMessages(updatedMessages);
//             }
//         }
//     };

//     const handleLogout = () => {
//       setUser(null);
//       localStorage.setItem("user", null);
//       navigate("/login");
//     };
//     let u = null;
//     try {
//       const storedUser = localStorage.getItem('user');
//       u = storedUser ? JSON.parse(storedUser) : null;
//     } catch (error) {
//       console.error("Error parsing user data from localStorage:", error);
//       u = null;
//     }
//     return (
//         <div className="chatbot-container">
//             {/* Sidebar */}
//             <div
//                 className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
//                 onMouseEnter={() => setIsSidebarOpen(true)}
//                 onMouseLeave={() => setIsSidebarOpen(false)}
//             >
//                 <div className="sidebar-header">
//                     <h2>Chat History</h2>
//                     <div className="sidebar-buttons">
//                         <button
//                             onClick={() => {
//                                 setMessages([]);
//                                 setInputValue('');
//                             }}
//                             title="Start New Chat"
//                         >
//                             ➕
//                         </button>
//                     </div>
//                 </div>
//                 <div className="chat-history">
//                     {chatHistory.map((item, index) => (
//                         <div key={index} className="history-item">
//                             {item}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Main Chat Area */}
//             <div className={`chat-area ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//                 {/* User Dropdown */}
//                 {u ?
//                 (<div className="user-area">
//                     <div
//                         className="user-icon"
//                         onMouseEnter={() => setIsUserDropdownOpen(true)}
//                         onMouseLeave={() => setIsUserDropdownOpen(false)}
//                         >
//                         👤
//                         {isUserDropdownOpen && (
//                           <div className="user-dropdown">
//                                 <button onClick={handleLogout}>Logout</button> {/* Logout Button */}
//                             </div>
//                         )}
//                     </div>
//                 </div>)
//                 :
//                 (<nav className="nav-links">
//                <span>
//                  <Link to="/login" className="login-link">
//                Log in
//                 </Link>
//           </span>
//            <span>
//             <Link to="/signup" className="signup-link">
//              Sign up
//              </Link>
//            </span>
//                     </nav>)
//                   }

//                 {/* Messages Area */}
//                 <div className="messages-container">
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message ${msg.type}`}
//                         >
//                             {msg.text}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Input Area */}
//                 <div className="input-area">
//                     <div className="search-wrapper">
//                         <textarea
//                             value={inputValue}
//                             onChange={(e) => setInputValue(e.target.value)}
//                             onInput={(e) => {
//                                 e.target.style.height = "50px"; // Reset height
//                                 e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
//                             }}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter" && !e.shiftKey) {
//                                     e.preventDefault(); // Prevent newline creation
//                                     handleSend(); // Call send function
//                                 }
//                             }}
//                             placeholder="Type your message..."
//                         />
//                         <button
//                             className="send-button"
//                             onClick={handleSend}
//                         >
//                             ➤
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chatbot;
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Chatbot.css";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";
import { decodeToken } from "./JwtDecode";
const Chatbot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // const { user, setUser } = useContext(AppContext);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser(decoded); // Store decoded data in state
      }
    }
  }, []);
  const handleCheck = () => {
      if (user) {
        handleSend();
      }
      else {
        alert("Please Login");
      }
  }
  const navigate = useNavigate();
  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [
        ...messages,
        { type: "user", text: inputValue },
        { type: "bot", text: "Waiting for response..." },
      ];
      setMessages(newMessages);
      setChatHistory([...chatHistory, inputValue]);
      setInputValue("");
      try {
        const response = await fetch("http://localhost:3000/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ query: inputValue }),
        });
        // if (!response.ok) {
        //   alert("Please Login!");
        // }
        const data = await response.json();
        console.log(data.message);
        let formattedMessage;
        if (data.format === "text") {
          formattedMessage = { type: "bot", text: data.answer };
        } else if (data.format === "table") {
          formattedMessage = {
            type: "bot",
            text: (
              <table>
                <thead>
                  <tr>
                    {data.table.headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ),
          };
        } else if (data.format === "csv") {
          const csvBlob = new Blob([data.csvContent], { type: "text/csv" });
          const csvUrl = URL.createObjectURL(csvBlob);
          formattedMessage = {
            type: "bot",
            text: (
              <a href={csvUrl} download="response.csv">
                Download CSV
              </a>
            ),
          };
        } else {
          formattedMessage = { type: "bot", text: "Unknown response format." };
        }
        const updatedMessages = [...newMessages];
        updatedMessages[updatedMessages.length - 1] = formattedMessage;
        setMessages(updatedMessages);
      } catch (error) {
        console.error("Error fetching the bot response:", error);
        const updatedMessages = [...newMessages];
        updatedMessages[updatedMessages.length - 1] = {
          type: "bot",
          text: "Failed to fetch response. Try again!",
        };
        setMessages(updatedMessages);
      }
    } else {
      alert("Please Login");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", null);
    navigate("/login");
  };

  // let u = null;
  // try {
  //     const storedUser = localStorage.getItem('user');
  //     u = storedUser ? JSON.parse(storedUser) : null;
  // } catch (error) {
  //     console.error("Error parsing user data from localStorage:", error);
  //     u = null;
  // }

  return (
    <>
      <div className="chatbot-container bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          onMouseEnter={() => setIsSidebarOpen(true)}
          onMouseLeave={() => setIsSidebarOpen(false)}
        >
          <div className="sidebar-header">
            <h2>Chat History</h2>
            <div className="sidebar-buttons">
              <button
                onClick={() => {
                  setMessages([]);
                  setInputValue("");
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
        <div className={`chat-area ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {/* User Dropdown */}
          {user ? (
            <div className="user-area">
              <div
                className="user-icon"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                {/* 👤 */}
                <img
                  src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                  width="50"
                  height="50"
                  className="profile-image"
                />
                {isUserDropdownOpen && (
                  <div className="user-dropdown">
                    <button onClick={handleLogout} class="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold">Logout</button>{" "}
                    {/* Logout Button */}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <nav className="nav-links">
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
            </nav>
          )}

          {/* Messages Area */}
          <div className="messages-container box">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {typeof msg.text === "string" ? msg.text : msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="input-area bg-[#0a001a] border border-purple-500/30 shadow-2xl shadow-purple-500/20">
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
                    handleCheck(); // Call send function
                  }
                }}
                className="mt-2 w-full px-4 py-3 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Type your message..."
              />
              <button
                className="send-button bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-bold"
                onClick={handleCheck}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
