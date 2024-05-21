export interface ProfileData {
	userId: string;
	profilePicture: string;
	username: string;
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
