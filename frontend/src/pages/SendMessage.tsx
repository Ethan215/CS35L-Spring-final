// src/pages/SendMessage.tsx

import { ProfileData } from '@common/profile';
import React, { useState, FormEvent, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SendMessage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [toUser, setToUser] = useState(username);
  const [friends, setFriends] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/friends');
        const data = await response.json();
        const friendUsernames = data.map((friend: { username: string }) => friend.username);
        setFriends(friendUsernames);
      } catch (error) {
        console.error('Failed to fetch friends', error);
      }
    };
    fetchFriends();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!title || !body) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const profileResponse = await fetch(`/api/profiles/username/${toUser}`);
    if (!profileResponse.ok) {
      setError('User not found');
      setLoading(false);
      return;
    }
    const profileJSON = await profileResponse.json();
    const profileData = profileJSON.profile;
    if (!profileData) {
      setError('User not found');
      setLoading(false);
      return;
    }
    console.log(profileData);
    console.log(profileData.userId)
    const receiverId = profileData.userId;
    console.log(receiverId);
    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: receiverId,
          title,
          body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setLoading(false);
      setSuccess(true);
      navigate('/inbox');
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
      <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
        Send Game Invite
      </h1>
      <div className="w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
          Send Message to {toUser}
        </h2>
        {error && <div className="mb-4 text-sm text-red-500 text-center transition-all duration-300">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-500 text-center transition-all duration-300">Message sent successfully!</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="toUser" className="text-sm font-semibold text-gray-300">
              Send To
            </label>
            <select
              id="toUser"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
            >
              <option value={username}>{username}</option>
              {friends.map((friend) => (
                <option key={friend} value={friend}>
                  {friend}
                </option>
              ))}
            </select>
          </div>
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
              rows={6}
              required
              className="w-full h-48 px-4 py-2 border rounded-md 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-purple-500 
                        focus:border-transparent 
                        bg-gray-700 text-white"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 
                      text-transparent bg-clip-text 
                      bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold rounded-md 
                      hover:from-purple-500 
                      hover:via-pink-600 
                      hover:to-red-600 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-purple-500 
                      focus:ring-offset-2 ${loading ? 'cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
