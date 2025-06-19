import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";
import { Link } from "react-router-dom";
import decodeToken from "./JwtDecode";
import { Mic, StopCircle, Trash2 } from "lucide-react";
import Alert from "./Alert";
import "./Style.css";
const Chatbot = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session") || null
  );
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [rawTranscripts, setRawTranscripts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); 
  const recognitionRef = useRef(null);
  
  const processTranscription = (text) => {
    console.log("Full Transcription:", text);
    const wordCount = text.split(" ").length;
    const upperCaseText = text.toUpperCase();
    return {
      original: text,
      wordCount: wordCount,
      upperCase: upperCaseText,
    };
  };
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript.trim();
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
            setRawTranscripts((prev) => [...prev, transcript]);
          } else {
            interimTranscript = transcript;
          }
        }
        const cleanedTranscript = (finalTranscript + interimTranscript).trim();
        setTranscription(cleanedTranscript);
      };
      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };
    } else {
      console.warn("Speech recognition not supported");
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);
  const startRecording = async () => {
    try {
      setTranscription("");
      setRawTranscripts([]);
      setIsEditing(false);
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(false);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Could not start recording. Please check permissions.");
    }
  };
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsEditing(true);
      console.log(transcription);
    }
  };
  const clearTranscription = () => {
    setTranscription("");
    setRawTranscripts([]);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser(decoded);
        localStorage.setItem("username", decoded.name)
      } else {
        console.warn("Invalid token detected, removing it from storage.");
        localStorage.removeItem("token");
      }
    }
  }, []);
  const handleCheck = () => {
    if (user) {
      handleSend();
    } else {
      setAlertMessage("Please Login to continue");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 3000);
      // setInputValue("");
      // setTranscription("");
    }
  };
  const handleCheck2 = () => {
    console.log(user);
    if (user) {
      return true;
    }
    return false;
  }
  const [queries, setQueries] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  useEffect(() => {
    if (!fetched) {
      if (handleCheck2()) {
        setAlertMessage('Fetching...');
        setAlertType("success");
      }
      else {
        setAlertMessage("Please Login to continue");
        setAlertType("error");
        setTimeout(() => setAlertMessage(""), 3000);
      }
    }
    else {
      setAlertMessage('');
    }
  }, [fetched]);
  const handleSend = async () => {
    const finalInput = transcription.length != 0 ? transcription : inputValue;
    if (finalInput.length === 0) {
      setAlertMessage("Please enter some text");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 3000);
    }
    else if (finalInput.trim()) {
      // setQueries((prevQueries) => [...prevQueries, inputValue]);
      console.log(finalInput);
      setInputValue("");
      setTranscription("");
      setFetched(false);
      // console.log(query);
      try {
        const response = await fetch("http://localhost:3000/api/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            sessionId,
            user,
            query: finalInput,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          if (data.message == "Forbidden") {
            setAlertMessage("Your session has been expired please login again");
            setAlertType("error");
            setTimeout(() => setAlertMessage(""), 3000);
          }
          // setAlertMessage(data.message);
          // setAlertType("error");
        }
        else {
          setFetched(true);
          console.log(data);
          setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: data.type,
            query: data.query,
            headers: data.headers || [],
            data: data.data || [],
            
            answer: data.answer || "",
          },
        ]);
      }
      } catch (error) {
        console.error("Error fetching the bot response:", error);
      }
    } else {
      setAlertMessage("Please Login to continue");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };
  // const handleChange = (e) => {
  //   if (isRecording) {
  //     setInputValue(transcription);
  //     console.log(inputValue);
  //   }
  //   setInputValue(e.target.value);
  // };
  const handleChange = (e) => {
    if (isRecording) {
      setTranscription(e.target.value); // Allow editing of transcription
    } else {
      setInputValue(e.target.value);
    }
  };
  const handleNewChat = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();
      setSessionId(data.sessionId);
      setMessages([]);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sessionId: data.sessionId },
      ]);
      localStorage.setItem("sessionId", data.sessionId);
    } catch (error) {
      console.error("Failed to start new chat session:", error);
    }
  };
  // setQueries((prevQueries) => [...prevQueries, transcription]);
  useEffect(() => {
    const fetchQueries = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("No username found in localStorage");
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/getqueries/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // setMessages(
          //   data.map((item) => ({
          //     type: item.response.type,
          //     query: item.query,
          //     headers: item.response.headers || [],
          //     data: item.response.data || [],
          //     answer: item.response.answer || "",
          //   }))
            
          //);
          setMessages(data);
        } else {
          console.error("Failed to fetch queries:", data.message);
        }
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
  
    fetchQueries();
  }, []);
  
  return (
    <>
      <div className="chatbot-container bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        {/* Sidebar */}
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage("")}
        />
        <div className={`chat-area ${isSidebarOpen ? "sidebar-open" : ""}`}>
          {user ? (
            <div className="user-area">
              <div
                className="user-icon"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <img
                  src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                  width="50"
                  height="50"
                  className="profile-image"
                />
                {isUserDropdownOpen && (
                  <div
                    className="user-dropdown flex"
                    style={{ backgroundColor: "white" }}
                  >
                    <button
                      onClick={handleLogout}
                      class="flex justify-center items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold"
                    >
                      <img
                        src="https://tse4.mm.bing.net/th?id=OIP.CNMzRgX6mICCCTzVK9RK7QHaHa&pid=Api&P=0&h=180"
                        width="30"
                        height="10"
                        style={{ marginRight: "5px" }}
                      />
                      Logout
                    </button>{" "}
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
          <div className="messages-container box">
            {messages.map((msg, idx) => (
              <div key={idx} style={{ color: "white" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <h1
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      textAlign: "center",
                      color: "black",
                      backgroundColor: "#e9f7df",
                      borderRadius: "5px",
                      padding: "10px 10px",
                      margin: 0,
                      marginTop: "20px",
                    }}
                  >
                    {msg.query}
                  </h1>
                </div>
                {msg.answer.length != 0 ? (
                  <div
                    style={{
                      backgroundColor: "#2d74d6",
                      borderRadius: "5px",
                      padding: "10px 10px",
                      margin: "50px 0px",
                      position: "relative",
                      top: "50px",
                      lineHeight: 2
                    }}
                  >
                    {msg.answer && msg.answer.map((l, p) => <p>{l}</p>)}
                  </div>
                ) : (
                  <div></div>
                )}
                {msg.headers && (
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "60px 0px",
                      position: "relative",
                      top: "50px",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          backgroundColor: "#f4f4f9",
                          textAlign: "left",
                        }}
                      >
                        {msg.headers.map((val, i) => (
                          <th
                            key={i}
                            style={{
                              padding: "10px 15px",
                              border: "1px solid #ddd",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            {val
                              .replace(/"/g, "")
                              .trim()
                              .split(",")
                              .join("\u00A0\u00A0\u00A0\u00A0\u00A0")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {msg.data.map((val, j) => (
                        <tr
                          key={j}
                          style={{
                            backgroundColor:
                              j % 2 === 0 ? "#fafafa" : "#ffffff",
                          }}
                        >
                          {val.map((v, k) => (
                            <td
                              key={k}
                              style={{
                                padding: "10px 15px",
                                border: "1px solid #ddd",
                                color: "#555",
                                wordWrap: "break-word",
                                maxWidth: "200px",
                              }}
                            >
                              {v
                                .replace(/"/g, "")
                                .trim()
                                .split(",")
                                .join("\u00A0\u00A0\u00A0\u00A0\u00A0")}
                            </td>
                          ))}
                          {val.length < msg.headers.length &&
                            Array(msg.headers.length - val.length)
                              .fill()
                              .map((_, i) => (
                                <td
                                  key={`empty-${i}`}
                                  style={{
                                    padding: "10px 15px",
                                    border: "1px solid #ddd",
                                    color: "#555",
                                  }}
                                ></td>
                              ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
          <div className="input-area">
            <div className="search-wrapper">
              <textarea
                value={isRecording ? transcription : transcription || inputValue}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.style.height = "50px";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCheck();
                  }
                }}
                className="mt-2 w-full px-4 py-3 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                placeholder="Type your message or start recording..."
              />
              <div></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: "30px",
                  right: "60px",
                }}
              >
                <div className="flex">
                  {!isRecording ? (
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={startRecording}
                      className="send-button p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                      aria-label="Start Recording"
                    >
                      <Mic size={24} />
                    </button>
                  ) : (
                    <button
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={stopRecording}
                      className="send-button p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      aria-label="Stop Recording"
                    >
                      <StopCircle size={24} />
                    </button>
                  )}
                </div>
              </div>
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
