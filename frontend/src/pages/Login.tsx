import React, { useRef, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define the LoginProps type
interface LoginProps {
  setUserLoggedIn: (loggedIn: boolean) => void;
}

// Define the Login component and pass in the LoginProps type.
const Login: React.FC<LoginProps> = ({ setUserLoggedIn }) => {
    // Use useRef to get a reference to the email and password input boxes.
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  //useState to set the initial values of error and loading.
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate hooks to get navigation functions

  //  Define the handleSubmit function, which is used to handle form submissions.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Block the default submit behavior of the form
    
    // Get the values of the email and password fields
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

      // Determine if email and password are empty
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Set loading to true to simulate login logic.
    setLoading(true);
     // Set a timer to wait 1000 milliseconds before updating loading to false, setting localStorage, and jumping to the home page.
    setTimeout(() => {
      setLoading(false);
      // Assuming successful authentication, update the login status and jump to the home page.
      setUserLoggedIn(true);
      localStorage.setItem('loggedIn', 'true'); // Update local storage to maintain login status
      navigate('/home'); // Navigating to the home page using the navigate function
    }, 1000);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Log In</h2>
        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
            <input type="email" id="email" ref={emailRef} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
            <input type="password" id="password" ref={passwordRef} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Log In
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <Link to="/forgot-password" className="text-purple-600 hover:underline">Forgot Password?</Link><br/>
          <Link to="/signup" className="text-purple-600 hover:underline">Need an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
