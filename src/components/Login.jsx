import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../AppContext";
import { Eye, EyeOff } from "lucide-react";
import "./Style.css";
const Login = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    let valid = true;
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    }
    if (valid) {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        setUser(data.name);
        navigate("/");
      }
      // if (response.status != 200) {
      //     alert(data.message);
      // }
      // else {
      //     localStorage.setItem("token", data.access_token);
      //     localStorage.setItem("user", JSON.stringify(data.name));
      //     setUser(data.name);
      //     navigate('/');
      // }
    }
  };
  return (
    <div className="auth-container min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0033] to-[#0a001a] opacity-90 z-0"></div> */}
      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
      </div> */}
      <div className="form-box relative z-10 w-full max-w-md bg-[#0a001a] border border-purple-500/30 rounded-2xl p-8">
        <h2
          style={{ color: "white" }}
          className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-text"
        >
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box mt-4 relative">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              className="mt-2 w-full px-4 py-3 bg-transparent border border-purple-500/50 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-text">{emailError}</p>}
          </div>
          <div className="input-box mt-4 relative">
            <label>Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
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
          <button
            type="submit"
            className="submit-btn mt-4 submit-btn w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-white font-bold 
            hover:from-purple-700 hover:to-pink-600 transition-all duration-300 
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/signup"
            className="toggle-text toggle-text text-purple-400 hover:text-purple-200 transition-colors text-sm"
          >
            Don't have an account? Sign up here.
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
