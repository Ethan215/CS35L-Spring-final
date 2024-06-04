import React, { useContext, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import UserContext from '../contexts/UserContext';

const ProfileContent: React.FC = () => {
    const { user, setUser } = useContext(UserContext)!;
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        bio: '',
        region: '',
        language: '',
        stars: 0,
    });

    useEffect(() => {
        if (user && !editMode) {
            setFormData({
                username: user.username,
                email: user.email,
                bio: user.bio || '',
                region: user.region || '',
                language: user.language || '',
                stars: user.stars || 0,
            });
        }
    }, [user, editMode]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('Updating profile with data:', formData);
            const response = await fetch('/api/profiles', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('Updated user data:', updatedUser);
                setUser(updatedUser);
                setEditMode(false);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-900 p-6">
            {editMode ? (
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="block text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Region</label>
                        <input
                            type="text"
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Save
                    </button>
                </form>
            ) : (
                <div>
                    <p className="text-white mb-2"><strong>Username:</strong> {user?.username}</p>
                    <p className="text-white mb-2"><strong>Email:</strong> {user?.email}</p>
                    <p className="text-white mb-2"><strong>Bio:</strong> {user?.bio}</p>
                    <p className="text-white mb-2"><strong>Region:</strong> {user?.region}</p>
                    <p className="text-white mb-2"><strong>Language:</strong> {user?.language}</p>
                    <button
                        onClick={handleEdit}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileContent;
