import { Request, Response } from "express";
import { UserDocument, User } from "../models/userModel";

import { sign } from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcrypt";

config();

const secretKey : string = process.env.SECRET_KEY!;

export const register = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

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
		const token = sign({ userId: user._id, username: user.username, email: user.email }, secretKey, {
			expiresIn: "1h",
		});

		res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ userId: user._id, username: user.username, token: token });
	} catch (error) {
		res.status(500).json({ error: "Authentication failed try Again" });
	}
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out" });
}

export default { register, loginUser, logoutUser };