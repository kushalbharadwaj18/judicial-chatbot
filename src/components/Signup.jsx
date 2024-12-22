// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import "./Style.css";
import { Eye, EyeOff } from 'lucide-react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Alert from './Alert';
import "./Style.css";
const Signup = (props) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  if (props.user) {
    navigate("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    let valid = true;
    if (!name) {
      setNameError("Name is required.");
      valid = false;
    }
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }
    if (password.length < 8) {
      setPasswordError("Password should have minimum 8 characters");
      valid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    }
    if (valid) {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setAlertType('error');
        setTimeout(() => setAlertMessage(''), 3000);
      }
      else {
        setAlertMessage(data.message);
        setAlertType('success');
        setTimeout(() => setAlertMessage(''), 3000);
        setTimeout(() => navigate('/login'), 3000);
      }
    }
  };
  return (
    <div className="auth-container min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4 overflow-hidden relative">
      {" "}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0033] to-[#0a001a] opacity-90 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      </div> */}
      <Alert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
      />
      <div className="form-box relative z-10 w-full max-w-md bg-[#0a001a] border border-purple-500/30 rounded-2xl p-8" style={{"zIndex": "1"}}>
        <h2 style={{ color: "white" }} className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-text">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box mt-4 relative">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              required
            />
            {nameError && <p className="error-text">{nameError}</p>}
          </div>
          <div className="input-box mt-4 relative">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-3 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="input-box mt-4 relative">
            <label>Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 pr-12 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="mt-4 absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-200 transition-colors"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {passwordError && <p className="error-text">{passwordError}</p>}
          </div>
          <div className="input-box mt-4 relative">
            <label>Confirm Password</label>
            <input
              type={passwordVisible1 ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 w-full px-4 py-3 pr-12 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              required
            />
              {confirmPasswordError && (
                <p className="error-text">{confirmPasswordError}</p>
              )}
            <button
              type="button"
              onClick={() => setPasswordVisible1(!passwordVisible1)}
              className="mt-4 absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-200 transition-colors"
              >
              {passwordVisible1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="mt-4 submit-btn w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-bold 
            hover:from-purple-700 hover:to-pink-600 transition-all duration-300 
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
        <Link to="/login" className="toggle-text text-purple-400 hover:text-purple-200 transition-colors text-sm">
          Already have an account? Login here.
        </Link>
        </div>
      </div>
    </div>
  );
};
export default Signup;
