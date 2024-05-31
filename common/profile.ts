export interface ProfileData {
	_id: string;
	userId: string;
	profilePicture: string;
	username: string;
	bio: string;
	region: string;
	language: string;
	stars: number;
	games: GameData[];
};

export interface GameData {
	_id: string;
	title: string;
	rank: string;
	tags: string[];
};