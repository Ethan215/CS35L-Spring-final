import { Request, Response } from "express";
import { UserDocument, User } from "../models/userModel";
import { Profile } from "../models/profileModel"; 
import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

config();

const secretKey: string = process.env.SECRET_KEY!;

export const signup = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, email, password } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);

		const user: UserDocument = new User({
			username,
			email,
			password: hashedPassword,
		});

		await user.save();

		res.status(201).json({ message: "User created" });
	} catch (error: any) {
		if (error instanceof mongoose.Error.ValidationError) {
			const messages = Object.values(error.errors).map((e: any) => e.message);
			res.status(400).json({ errors: messages });
		} else if (error.code === 11000) {
			res.status(400).json({ error: "Username or email already exists" });
		} else {
			res.status(500).json({ error: "Server error" });
		}
	}
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, email, password } = req.body;

		let user = await User.findOne({ email });
		if (!user) {
			user = await User.findOne({ username });
		}

		if (!user) {
			res.status(401).json({ error: "Authentication failed try Again" });
			return;
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			res.status(401).json({ error: "Authentication failed try Again" });
			return;
		}

		// Create a JWT token
		const token = sign(
			{ userId: user._id, username: user.username, email: user.email },
			secretKey,
			{
				expiresIn: "1h",
			}
		);

		res.cookie("token", token, { httpOnly: true, secure: true });
		res
			.status(200)
			.json({ userId: user._id, username: user.username, token: token });
	} catch (error) {
		res.status(500).json({ error: "Authentication failed try Again" });
	}
};

export const checkLogin = async (req: Request, res: Response): Promise<void> => {
	try {
		// if somehow user is null then return 401 status code, this shouldn't happen
		if (!(req.user)) {
			res.status(401).json({ error: "Authentication failed try Again" });
			return;
		}

		// return decoded user information from the authenticateUser middleware
		res.status(200).json(req.user);
	}
	catch (error) {
		res.status(500).json({ error: "Authentication failed try Again" });
	}
}

export const logoutUser = async (
	req: Request,
	res: Response
): Promise<void> => {
	res.clearCookie("token");
	res.status(200).json({ message: "Logged out" });
};



export const likeProfile = async (req: Request, res: Response): Promise<void> => {
	if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return; 
    }
    try {
        const userId = req.user.userId;
        const { profileId } = req.params;

        const user = await User.findById(userId);
        const profile = await Profile.findById(profileId);

        if (!user || !profile) {
            res.status(404).json({ error: "User or profile not found" });
            return;
        }

        if (user.likedProfiles.includes(profileId as unknown as mongoose.Types.ObjectId)) {
            res.status(400).json({ error: "Profile already liked" });
            return;
        }

        user.likedProfiles.push(profileId as unknown as mongoose.Types.ObjectId);
        profile.stars += 1;

        await user.save();
        await profile.save();

        res.status(200).json({ message: "Profile liked", user }); // Returns the latest user data
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const unlikeProfile = async (req: Request, res: Response): Promise<void> => {
	if (!req.user) {
		res.status(401).json({ message: 'Unauthorized' });
		return; 
	}
    try {
        const userId = req.user.userId;
        const { profileId } = req.params;

        const user = await User.findById(userId);
        const profile = await Profile.findById(profileId);

        if (!user || !profile) {
            res.status(404).json({ error: "User or profile not found" });
            return;
        }

        if (!user.likedProfiles.includes(profileId as unknown as mongoose.Types.ObjectId)) {
            res.status(400).json({ error: "Profile not liked yet" });
            return;
        }

        user.likedProfiles = user.likedProfiles.filter(id => id.toString() !== profileId);
        profile.stars -= 1;

        await user.save();
        await profile.save();

        res.status(200).json({ message: "Profile unliked" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get liked profiles
export const getLikedProfiles = async (req: Request, res: Response): Promise<void> => {
	if (!req.user) {
		res.status(401).json({ message: 'Unauthorized' });
		return; 
	}
    try {
        const userId = req.user.userId;

        const user = await User.findById(userId).populate('likedProfiles');

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.status(200).json({ likedProfiles: user.likedProfiles });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export default { signup, loginUser, logoutUser, likeProfile, unlikeProfile, getLikedProfiles };
