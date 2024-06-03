import mongoose from "mongoose";

export interface UserData {
    username: string;
    email: string;
    password: string;
    likedProfiles: mongoose.Types.ObjectId[]; // Used to store the user's preferred user ID
};
