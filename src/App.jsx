import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chatbot from './components/Chatbot';
import AppContext from './AppContext';
import decodeToken from "./components/JwtDecode";
function App() {
  // const [user, setUser] = useState(() => {
  //   const savedData = localStorage.getItem('user');
  //   return savedData ? savedData : null;
  // });
  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem('user', user);
  //   }
  // }, [user]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  // Retrieve token from localStorage
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
      setUser(decoded); // Store decoded data in state
    }
    else {
      console.warn('Invalid token detected, removing it from storage.');
      localStorage.removeItem('token');
      
    }
  }
}, [])
  return (
    <SnackbarProvider>
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login user={user} />} />
              <Route exact path="/signup" element={<Signup user={user} />} />
              <Route exact path="/chatbot" element={<Chatbot user={user}/>} />
          </Routes>
      </BrowserRouter>
    </AppContext.Provider>
    </SnackbarProvider>
  )
}

export default App;
