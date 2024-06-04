
export interface UserData {
    _id: string;
    username: string;
    email: string;
    password: string;
    likedProfiles: string; // Used to store the user's preferred user ID
    bio?: string;
    region?: string;
    language?: string;
    stars?: number;
};
