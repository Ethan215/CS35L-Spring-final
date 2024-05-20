import React, { useRef, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  // Declare the email, password, and password confirm input elements using the useRef hook
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  // Declare the error and loading state using the useState hook
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle form submission
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // If the passwords do not match, set the error state and return
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      setError("Passwords do not match");
      return;
    }
    setLoading(false);
  }

  // Return the signup form
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Sign Up</h2>
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
          <div>
            <label htmlFor="password-confirm" className="text-sm font-semibold text-gray-700">Confirm Password</label>
            <input type="password" id="password-confirm" ref={passwordConfirmRef} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <Link to="/login" className="text-purple-600 hover:underline">Already have an account? Log In</Link>
        </div>
      </div>
    </div>
  );
}
