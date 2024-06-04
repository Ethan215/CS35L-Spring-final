// src/pages/SendMessage.tsx

import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SendMessage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: username,
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setLoading(false);
      alert('Message sent successfully!');
      navigate('/inbox'); // Navigating to the inbox page after successfully sending a message
    } catch (err: unknown) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
        Send Game Invite
      </h1>
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text from-purple-400 via-pink-500 to-red-500  mb-6">
          Send Message to {username}
        </h2>
        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
            />
          </div>
          <div>
            <label htmlFor="body" className="text-sm font-semibold text-gray-300">
              Message Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold rounded-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
