// App is the main component of the application
// it is responsible for routing and rendering the different pages and components
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// user context
import { UserProvider } from './contexts/UserContext';

// pages and components
import Home from './pages/Home';
import Feed from './pages/Feed';
import Inbox from './pages/Inbox';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/Forgotpassword';
import Loading from './pages/Loading';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);  // User login status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // Assuming that there is a function to check the user's login status here
    const checkLoginStatus = async () => {
      // send a request to the backend to check the login status (GET /api/user/login)
      const response = await fetch("/api/user/login");

      // If the response is successful, update the login status
      if (response.ok) {
        setUserLoggedIn(true);
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
    return <Loading></Loading>; // Or your loading spinner
  }

  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          {userLoggedIn && <Navbar handleLogout={handleLogout} />}  {/* Show Navbar only after user login */}
          <div className="pages">
            <Routes>
              <Route path="/login" element={userLoggedIn ? <Navigate replace to="/home" /> : <Login setUserLoggedIn={setUserLoggedIn} />} />
              <Route path="/signup" element={userLoggedIn ? <Navigate replace to="/home" /> : <Signup />} />
              <Route path="/forgot-password" element={userLoggedIn ? <Navigate replace to="/home" /> : <ForgotPassword />} />

              <Route path="/feed" element={userLoggedIn ? <Feed /> : <Navigate replace to="/home" />} />
              <Route path="/inbox" element={userLoggedIn ? <Inbox /> : <Navigate replace to="/home" />} />
              <Route path="/profile" element={userLoggedIn ? <Profile /> : <Navigate replace to="/home" />} />
              <Route path="/home" element={<Home userLoggedIn={userLoggedIn} />} />
              <Route path="/" element={userLoggedIn ? <Navigate replace to="/home" /> : <Navigate replace to="/home" />} />
            </Routes>
          </div>
        </BrowserRouter>  
      </UserProvider>    
    </div>
  );
}

export default App;