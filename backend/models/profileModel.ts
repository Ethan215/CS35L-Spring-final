import mongoose from 'mongoose';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

/*

Sample JSON profile for the schema below:
{
  "profilePicture": "https://example.com/profile.jpg",
  "name": "John Doe",
  "bio": "Passionate gamer looking for friendly casual and competitive gamers, enjoy movies idk etc",
  "region": "North America",
  "language": "English",
  "stars": 25,
  "games": [
    {
      "title": "Overwatch",
      "rank": "Diamond",
      "tags": [“Support”, “Tank”, "Competitive"]
    },
    {
      "title": "Minecraft",
      "rank": null,
      "tags": ["Building", "Bed Wars"]
    },
    {
      "title": "League of Legends",
      "rank": "Gold III",
      "tags": ["Casual", "Jungle"]
    }
  ]
}

*/

export interface IProfile {
	profilePicture: string;
	name: string;
	bio: string;
	region: string;
	language: string;
	stars: number;
	games: [
		{
			title: string;
			rank: string;
			tags: [string];
		},
	];
};

export interface IProfileDocument extends IProfile, Document {}

const profileSchema = new Schema<IProfileDocument>({
	profilePicture: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
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
}, { timestamps: true });

// create a model with the Schema
export const Profile = mongoose.model<IProfileDocument>('Profile', profileSchema);

export default Profile;