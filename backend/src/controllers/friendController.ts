import { Request, Response } from "express";

import { FriendDocument, Friend } from "../models/friendModel";
import { UserDocument, User } from "../models/userModel";

export const getFriends = async (req: Request, res: Response) => {
	const user = req.user!;
  
	const friendProfiles = await Promise.all(
		(
			await Friend.find({
				$or: [{ fromUserId: user.userId }, { toUserId: user.userId }],
				status: "accepted",
			})
		)
			.map(async (friend: FriendDocument) => {
				const friendUser =
					friend.fromUserId._id.toString() === user.userId
						? friend.toUserId
						: friend.fromUserId;

				const friendUserDocument: UserDocument | null = await User.findById(
					friendUser
				);

				if (!friendUserDocument) {
					return null;
				}

				return {
					id: friendUserDocument._id,
					username: friendUserDocument.username,
					email: friendUserDocument.email,
				};
			})
			.filter(Boolean)
	);

	res.status(200).json(friendProfiles);
};

export const getFriendRequests = async (req: Request, res: Response) => {
	const user = req.user!;

	const friendProfiles = await Promise.all(
		(
			await Friend.find({
				$or: [{ fromUserId: user.userId }, { toUserId: user.userId }],
				status: "pending",
			})
		)
			.map(async (friend: FriendDocument) => {
				const friendUser =
					friend.fromUserId._id.toString() === user.userId
						? friend.toUserId
						: friend.fromUserId;

				const friendUserDocument: UserDocument | null = await User.findById(
					friendUser
				);

				if (!friendUserDocument) {
					return null;
				}

				return {
					id: friendUserDocument._id,
					username: friendUserDocument.username,
					email: friendUserDocument.email,
				};
			})
			.filter(Boolean)
	);

	res.status(200).json(friendProfiles);
};

export const sendRequest = async (req: Request, res: Response) => {
	const user = req.user!;
	const otherUserId = req.params.otherUserId;

	const existingRequest = await Friend.findOne({
		$or: [
			{ fromUserId: user.userId, toUserId: otherUserId },
			{ fromUserId: otherUserId, toUserId: user.userId },
		],
	});

	if (existingRequest) {
		if (existingRequest.fromUserId.toString() === otherUserId) {
			existingRequest.status = "accepted";
			await existingRequest.save();
			res.json({ message: "Friend request accepted" });
		} else {
			res.status(400).json({ message: "Friend request already sent" });
		}
	} else {
		const newRequest = new Friend({
			fromUserId: user.userId,
			toUserId: otherUserId,
			status: "pending",
		});
		await newRequest.save();
		res.json({ message: "Friend request sent" });
	}
};

export const acceptRequest = async (req: Request, res: Response) => {
	const user = req.user!;
	const otherUserId = req.params.otherUserId;

	const friendRequest = await Friend.findOne({
		fromUserId: otherUserId,
		toUserId: user.userId,
		status: "pending",
	});

	if (friendRequest) {
		friendRequest.status = "accepted";
		await friendRequest.save();
		res.json({ message: "Friend request accepted" });
	} else {
		res
			.status(400)
			.json({ message: "No pending friend request from this user" });
	}
};

export const declineRequest = async (req: Request, res: Response) => {
	const user = req.user!;
	const otherUserId = req.params.otherUserId;

	const result = await Friend.deleteOne({
		fromUserId: otherUserId,
		toUserId: user.userId,
		status: "pending",
	});

	if (result.deletedCount > 0) {
		res.json({ message: "Friend request declined" });
	} else {
		res
			.status(400)
			.json({ message: "No pending friend request from this user" });
	}
};

export default {
	getFriends,
	getFriendRequests,
	sendRequest,
	acceptRequest,
	declineRequest,
};
