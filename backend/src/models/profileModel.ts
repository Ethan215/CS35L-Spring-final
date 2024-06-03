import { ProfileData } from "@common/profile";
import mongoose, { Document, ObjectId } from 'mongoose';

const Schema = mongoose.Schema;

export interface ProfileDocument extends Omit<ProfileData, '_id'>, Document {}


const profileSchema = new Schema<ProfileDocument>(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
		},
		profilePicture: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		bio: {
			type: String,
			required: true,
		},
		region: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
		stars: {
			type: Number,
			required: true,
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
