import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot';
import AppContext from './AppContext';
function App() {
  const [user, setUser] = useState(() => {
    const savedData = localStorage.getItem('user');
    return savedData ? savedData : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    }
  }, [user]);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/chatbot" element={<Chatbot user={user}/>} />
          </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App;
