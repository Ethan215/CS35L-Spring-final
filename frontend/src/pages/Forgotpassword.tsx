import React, { useRef, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  // Create a ref to store the email input element
  const emailRef = useRef<HTMLInputElement>(null);
  // Create a state variable to store any error message
  const [error, setError] = useState<string>('');
  // Create a state variable to store whether or not the form is loading
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Forgot Password</h2>
        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
            <input type="email" id="email" ref={emailRef} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Reset Password
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <Link to="/login" className="text-purple-600 hover:underline">Back to Log In</Link>
        </div>
      </div>
    </div>
  );
}
