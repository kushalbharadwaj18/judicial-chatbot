import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import './Style.css';
const Login = () => {
    const { setUser } = useContext(AppContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        let valid = true;
        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        }
        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        }
        if (valid) {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.status != 200) {
                alert(data.message);
            }
            else {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", JSON.stringify(data.name));
                setUser(data.name);
                navigate('/');
            }
        }
    };
    return (
        <div className="auth-container">
            <div className="form-box">
                <h2 style={{"color": "white"}}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <p className="error-text">{emailError}</p>}
                    </div>
                    <div className="input-box">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p className="error-text">{passwordError}</p>}
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <Link to="/signup" className="toggle-text">Don't have an account? Sign up here.</Link>
            </div>
        </div>
    );
};
export default Login;