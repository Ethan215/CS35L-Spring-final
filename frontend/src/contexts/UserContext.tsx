import { UserData } from "@common/user";
import { createContext, useState, useEffect } from "react";
import { UserContextType } from "src/types/user";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/user/login');
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const likeProfile = async (profileId: string): Promise<void> => {
        try {
            const response = await fetch(`/api/user/like/${profileId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
            } else {
                console.error('Failed to like profile');
            }
        } catch (error) {
            console.error('Error liking profile:', error);
        }
    };

    const unlikeProfile = async (profileId: string): Promise<void> => {
        try {
            const response = await fetch(`/api/user/unlike/${profileId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
            } else {
                console.error('Failed to unlike profile');
            }
        } catch (error) {
            console.error('Error unliking profile:', error);
        }
    };

    const getLikedProfiles = async () => {
        try {
            const response = await fetch('/api/user/liked-profiles');
            if (response.ok) {
                const data = await response.json();
                setUser(prevUser => {
                    if (prevUser) {
                        return {
                            ...prevUser,
                            likedProfiles: data.likedProfiles
                        };
                    }
                    return prevUser; // Handle the case where prevUser may be null.
                });
            } else {
                console.error('Failed to fetch liked profiles');
            }
        } catch (error) {
            console.error('Error fetching liked profiles:', error);
        }
    };

    const updateProfile = async (profileData: Partial<UserData>): Promise<void> => {
        try {
            const response = await fetch('/api/profiles', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, likeProfile, unlikeProfile, getLikedProfiles, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
