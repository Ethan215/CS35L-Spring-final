import mongoose from "mongoose";
import { UserData } from "@common/user";
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface UserDocument extends Omit<UserData, '_id' | 'likedProfiles'>, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  likedProfiles: mongoose.Types.ObjectId[];
}
  
  const userSchema = new Schema<UserDocument>(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Recieved invalid email address"],
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

// create a model with the Schema
export const User = mongoose.model<UserDocument>(
    "User",
    userSchema
);

export default User;