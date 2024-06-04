import React from 'react';

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-64 bg-gray-800 text-gray-200 min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold">Menu</h2>
                <ul>
                    <li>
                        <button 
                            className={`w-full text-left py-2 px-4 ${activeTab === 'profile' ? 'bg-gray-700' : ''}`} 
                            onClick={() => onTabChange('profile')}
                        >
                            My Profile
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left py-2 px-4 ${activeTab === 'likelist' ? 'bg-gray-700' : ''}`} 
                            onClick={() => onTabChange('likelist')}
                        >
                            Liked Profiles
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left py-2 px-4 ${activeTab === 'gamelist' ? 'bg-gray-700' : ''}`} 
                            onClick={() => onTabChange('gamelist')}
                        >
                            Games List
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
