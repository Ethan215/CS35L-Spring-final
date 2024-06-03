import mongoose from "mongoose";

export interface UserData {
    username: string;
    email: string;
    password: string;
    likedProfiles: mongoose.Types.ObjectId[]; // 用于存储用户喜欢的用户ID
};
