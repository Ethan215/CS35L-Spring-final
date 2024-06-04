import React, { useEffect, useState, useContext } from 'react';
import { ProfileData } from '@common/profile';
import UserContext from '../contexts/UserContext';
import ProfileContent from './ProfileContent';
import Sidebar from './sidebar';

const Profile: React.FC = () => {
    const { user, getLikedProfiles } = useContext(UserContext)!;
    const [likedProfiles, setLikedProfiles] = useState<ProfileData[]>([]);
    const [activeTab, setActiveTab] = useState<string>('profile');

    useEffect(() => {
        const fetchLikedProfiles = async () => {
            try {
                await getLikedProfiles();
                if (user && user.likedProfiles) {
                    setLikedProfiles(user.likedProfiles);
                }
            } catch (error) {
                console.error('Error fetching liked profiles:', error);
            }
        };

        fetchLikedProfiles();
    }, [user, getLikedProfiles]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex min-h-screen w-full bg-gray-900">
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <div className="flex-1 p-4">
                {activeTab === 'profile' && <ProfileContent />}
                {activeTab === 'likelist' && (
                    <div>
                        <h1 className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
                            My Liked Profiles
                        </h1>
                        {likedProfiles.length === 0 ? (
                            <p className="text-gray-400">You haven't liked any profiles yet.</p>
                        ) : (
                            likedProfiles.map(profile => (
                                <div key={profile._id} className="relative flex flex-col text-gray-300 mb-4">
                                    <div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600">
                                        <div className="flex flex-row">
                                            <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-4 bg-gray-300 flex-none" />
                                            <div className="flex-3">
                                                <h1 className="text-xl font-bold text-white">{profile.username}</h1>
                                                <p className="text-sm mb-1">{profile.bio}</p>
                                                <p className="text-sm"><span className="font-bold">Region:</span> {profile.region}</p>
                                                <p className="text-sm"><span className="font-bold">Language:</span> {profile.language}</p>
                                                <p className="text-sm"><span className="font-bold">Stars:</span> {profile.stars}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                {activeTab === 'gamelist' && (
                    <div>
                        <h1 className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
                            My Games List
                        </h1>
                        {/* Game list content to be added by other team members */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
