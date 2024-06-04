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
		const profile: ProfileDocument | null = await Profile.findById(
			req.params.id
		);
		if (!profile) {
			res.status(404).json({ error: "Profile not found" });
			return;
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
			stars: req.body.stars,
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
		console.log("Received update profile request with body:", req.body);
        const { username, bio, region, language } = req.body;

        const updatedProfile: ProfileDocument | null =
            await Profile.findOneAndUpdate(
                { userId: req.user!.userId },
                {
                    username: username,
                    bio: bio,
                    region: region,
                    language: language,
                },
                { new: true }
            );

        if (!updatedProfile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
		console.log("Successfully updated profile:", updatedProfile);
        res.status(201).json({ profile: updatedProfile });
    } catch (error) {
		console.error("Error updating profile:", error);
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
