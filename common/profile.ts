import { Document } from 'mongoose';

export interface ProfileData {
	profilePicture: string;
	name: string;
	bio: string;
	region: string;
	language: string;
	stars: number;
	games: [{ 
		title: string; 
		rank: string; 
		tags: string[]; 
	}];
};

export interface ProfileDocument extends ProfileData, Document {}