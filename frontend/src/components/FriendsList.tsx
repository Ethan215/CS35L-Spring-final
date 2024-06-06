import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileIcon from '../assets/icons/defaultProfileIcon.jpg';
import { ProfileData } from '@common/profile';

interface FriendBoxProps {
    friend: ProfileData;
}

const FriendBox: React.FC<FriendBoxProps> = ({ friend }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/profile/${friend.userId}`);
    };

    return (
        <div
            className="p-4 border-b border-gray-600 cursor-pointer flex items-center"
            onClick={handleClick}
        >
            <img
                src={defaultProfileIcon}
                alt={`${friend.username} Profile Picture`}
                className="w-12 h-12 rounded-full mr-4"
            />
            <div>
                <h4 className="text-white font-bold">{friend.username}</h4>
            </div>
        </div>
    );
};

interface FriendsListProps {
    refreshFriends: boolean;
    setRefreshFriends: (value: boolean) => void;
}

const FriendsList: React.FC<FriendsListProps> = ({ refreshFriends, setRefreshFriends }) => {
    const [friends, setFriends] = useState<ProfileData[]>([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch('/api/friends', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const friendProfiles = await response.json();
                console.log('Friends data:', friendProfiles); // Debugging line
                setFriends(friendProfiles);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [refreshFriends]);

    return (
        <div className="w-full border-l border-gray-600 bg-gray-800 p-4 rounded-lg text-white">
            <h2 className="text-xl font-bold mb-4">Friends List</h2>
            {friends.length > 0 ? (
                friends.map((friend) => <FriendBox key={friend._id} friend={friend} />)
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendsList;
