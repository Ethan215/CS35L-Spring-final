import { Request, Response } from "express";
import { ProfileDocument, Profile } from "../models/profileModel";

const getProfiles = async (req: Request, res: Response): Promise<void> => {
	try {
		const profiles: ProfileDocument[] | null = await Profile.find();
		if (!profiles) {
			res.status(404).json({ error: "Profiles not found" });
			return;
		}

		res.status(200).json({ profiles });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const id = req.params.id;
		const username = req.params.username;
		let profile : ProfileDocument | null = null;
		if(id) {
			profile = await Profile.findOne({
				userId: id,
			});
			if (!profile) {
				res.status(404).json({ error: `Profile with id ${id} not found` });
				return;
			}
		}
		else if(username) {
			profile = await Profile.findOne({
				username: username,
			});
			if (!profile) {
				res.status(404).json({ error: `Profile with username ${username} not found` });
				return;
			}
		}
		else {
			profile = await Profile.findOne({
				userId: req.user!.userId,
			});
			if (!profile) {
				res.status(404).json({ error: "Profile not found" });
				return;
			}
		}		

		res.status(200).json({ profile });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const createProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const profile: ProfileDocument = new Profile({
			userId: req.user!.userId,
			profilePicture: req.body.profilePicture,
			username: req.user!.username,
			bio: req.body.bio,
			region: req.body.region,
			language: req.body.language,
			stars: 0,
			games: req.body.games,
		});

		await profile.save();

		res.status(200).json({ profile });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const deleteProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		//check if exists
		const profile: ProfileDocument | null = await Profile.findOneAndDelete({
			userId: req.user!.userId,
		});

		if (!profile) {
			res.status(404).json({ error: "Profile not found" });
			return;
		}

		res.status(200).json({ message: "Profile deleted" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const updateProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, userId, ...otherFields } = req.body;
		const originalProfile: ProfileDocument | null = await Profile.findOne({
			userId: req.user!.userId,
		});
		

		if (!originalProfile) {
			res.status(404).json({ error: "Profile not found" });
			return;
		}
		
		const updatedProfile: ProfileDocument | null =
			await Profile.findOneAndUpdate(
				{ userId: req.user!.userId },
				{
					username: req.user!.username,
					userId: req.user!.userId,
					stars: originalProfile.stars,
					...otherFields,
				},
				{ new: true }
			);

		res.status(201).json({ profile: updatedProfile });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export default {
	getProfiles,
	getProfile,
	createProfile,
	deleteProfile,
	updateProfile,
};
