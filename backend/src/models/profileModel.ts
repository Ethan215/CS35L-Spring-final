import mongoose from "mongoose";
import { ProfileData } from "@common/profile";
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface ProfileDocument extends Omit<ProfileData, '_id'>, mongoose.Document {
	_id: mongoose.Types.ObjectId;
}

const profileSchema = new Schema<ProfileDocument>(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		profilePicture: {
			type: String,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		bio: {
			type: String,
		},
		region: {
			type: String,
		},
		language: {
			type: String,
		},
		stars: {
			type: Number,
			default: 0,
		},
		games: [
			{
				title: {
					type: String,
					required: true,
				},
				rank: {
					type: String,
				},
				tags: {
					type: [String],
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

// create a model with the Schema
export const Profile = mongoose.model<ProfileDocument>(
	"Profile",
	profileSchema
);

export default Profile;
