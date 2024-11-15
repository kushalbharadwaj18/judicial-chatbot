import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot';
function App() {
  return (
    <> 
      <div>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/chatbot" element={<Chatbot />} />
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
