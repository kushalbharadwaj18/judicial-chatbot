import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; 
import './Style.css';
const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        let valid = true;
        if (!name) {
            setNameError('Name is required.');
            valid = false;
        }
        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        }
        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            valid = false;
        }
        if (valid) {
            // console.log('Signup successful with:', { name, email, password });
            const response = await fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status != 200) {
                const data = await response.json();
                alert(data.message);
            }
            else {
                navigate('/login');
            }
        }
    };
    return (
        <div className="auth-container"> {/* Apply auth-container class here */}
            <div className="form-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label>Name</label>
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {nameError && <p className="error-text">{nameError}</p>}
                    </div>
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
                    <div className="input-box">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm your password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && <p className="error-text">{confirmPasswordError}</p>}
                    </div>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <Link to="/login" className="toggle-text">Already have an account? Login here.</Link>
            </div>
        </div>
    );
};
export default Signup;