
import mongoose from "mongoose";
export interface UserData {
    _id: string;
    username: string;
    email: string;
    password: string;
    likedProfiles: mongoose.Types.ObjectId[];  // Used to store the user's preferred user ID
    bio?: string;
    region?: string;
    language?: string;
    stars?: number;
};
