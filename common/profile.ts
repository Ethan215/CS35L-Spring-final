import { Document } from 'mongoose';

export interface IProfile {
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

export interface IProfileDocument extends IProfile, Document {}