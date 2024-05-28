// App is the main component of the application
// it is responsible for routing and rendering the different pages and components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// pages and components
import Home from './pages/Home';
import Feed from './pages/Feed';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Forgotpassword';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);  // User login status

  useEffect(() => {
    // Assuming that there is a function to check the user's login status here
    const checkLoginStatus = async () => {
      // This is a simulated check, the actual application may require an API call.
      const loggedIn = localStorage.getItem('loggedIn');
      setUserLoggedIn(loggedIn === 'true');
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');  // Clear the login state from localStorage
    setUserLoggedIn(false);  // Update application status
  };
  return (
    <div className="App">
      <BrowserRouter>
        {userLoggedIn && <Navbar handleLogout={handleLogout} />}  {/* Show Navbar only after user login */}
        <div className="pages">
          <Routes>
            <Route path="/login" element={<Login setUserLoggedIn={setUserLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/feed" element={userLoggedIn ? <Feed /> : <Navigate replace to="/login" />} />
            <Route path="/inbox" element={userLoggedIn ? <Inbox /> : <Navigate replace to="/login" />} />
            <Route path="/profile" element={userLoggedIn ? <Profile /> : <Navigate replace to="/login" />} />
            <Route path="/home" element={userLoggedIn ? <Home /> : <Navigate replace to="/login" />} />
            <Route path="/" element={userLoggedIn ? <Navigate replace to="/home" /> : <Navigate replace to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>      
    </div>
  );
}

export default App;