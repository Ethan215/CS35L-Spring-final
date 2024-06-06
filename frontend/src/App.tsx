// App is the main component of the application
// it is responsible for routing and rendering the different pages and components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import LikeList from './pages/LikeList';
// user context

// pages and components
import About from './pages/About';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfiles';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Forgotpassword';
import Loading from './pages/Loading';
import SendMessage from './pages/SendMessage';

import UserContext from './contexts/UserContext';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);  // User login status
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useContext(UserContext)!;

  useEffect(() => {
    setIsLoading(true);

    // Assuming that there is a function to check the user's login status here
    const checkLoginStatus = async () => {
      // send a request to the backend to check the login status (GET /api/user/login)
      const response = await fetch("/api/user/login");

      // If the response is successful, update the login status
      if (response.ok) {
        setUserLoggedIn(true);

        //set user data
        // Get the user userId, username, and token from the response
        const data = await response.json();
        setUser({"_id": data.userId, "username": data.username, "email" : "", "password": "" });
      }
      else {
        setUserLoggedIn(false);
      }

      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    const logout = async () => {
      // send the logout request to the backend
      const response = await fetch("/api/user/logout", {
        method: "POST",
      });

      // If the response is successful, update the login status and redirect to the login page
      if (response.ok) {
        setUserLoggedIn(false);
      }
    }

    logout();
  };

  if (isLoading) {
    return <Loading/>; // Or your loading spinner
  }

  return (
    <div className="App">
        <BrowserRouter>
          {userLoggedIn && <Navbar handleLogout={handleLogout} />}  {/* Show Navbar only after user login */}
          <div className="pages">
            <Routes>
              <Route path="/login" element={userLoggedIn ? <Navigate replace to="/home" /> : <Login setUserLoggedIn={setUserLoggedIn} />} />
              <Route path="/signup" element={userLoggedIn ? <Navigate replace to="/home" /> : <Signup />} />
              <Route path="/forgot-password" element={userLoggedIn ? <Navigate replace to="/home" /> : <ForgotPassword />} />
              <Route path="/about" element={userLoggedIn ? <About /> : <Navigate replace to="/home"/>} />
              <Route path="/feed" element={userLoggedIn ? <Feed /> : <Navigate replace to="/home" />} />
              <Route path="/inbox" element={userLoggedIn ? <Inbox /> : <Navigate replace to="/home" />} />
              <Route path="/inbox/send-message/:username" element={userLoggedIn ? <SendMessage /> : <Navigate replace to="/home" />} /> 
              <Route path="/profile" element={userLoggedIn ? <Profile /> : <Navigate replace to="/home" />} />
              <Route path="/profile/:id" element={userLoggedIn ? <Profile /> : <Navigate replace to="/home" />} />
              <Route path="/edit-profile" element={userLoggedIn ? <EditProfile /> : <Navigate replace to="/home" />} />
              <Route path="/like-list" element={userLoggedIn ? <LikeList /> : <Navigate replace to="/home" />} /> 
              <Route path="/home" element={<Home userLoggedIn={userLoggedIn} />} />
              <Route path="/" element={userLoggedIn ? <Navigate replace to="/home" /> : <Navigate replace to="/home" />} />
            </Routes>
          </div>
        </BrowserRouter>  
    </div>
  );
}

export default App;