import { Request, Response } from "express";

import { FriendDocument, Friend } from "../models/friendModel";
import { UserDocument, User } from "../models/userModel";
import { Profile, ProfileDocument } from "../models/profileModel";

export const getFriends = async (
	req: Request,
	res: Response
): Promise<void> => {
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

				const friendProfileDocument: ProfileDocument | null = await Profile.findOne({
					userId: friendUser,
				});

				if (!friendProfileDocument) {
					return null;
				}

				return friendProfileDocument; // return the entire profile document
			})
			.filter(Boolean)
	);

	res.status(200).json(friendProfiles);
};

export const getFriendRequests = async (
	req: Request,
	res: Response
): Promise<void> => {
	const user = req.user!;

	const friendProfiles = await Promise.all(
		(
			await Friend.find({
				toUserId: user.userId,
				status: "pending",
			})
		)
			.map(async (friend: FriendDocument) => {
				const friendUser =
					friend.fromUserId._id.toString() === user.userId
						? friend.toUserId
						: friend.fromUserId;

				const friendProfileDocument: ProfileDocument | null = await Profile.findOne({
					userId: friendUser,
				});

				if (!friendProfileDocument) {
					return null;
				}

				return friendProfileDocument; // return the entire profile document
			})
			.filter(Boolean)
	);

	res.status(200).json(friendProfiles);
};

export const getFriendStatus = async (
	req: Request,
	res: Response
): Promise<void> => {
	const user = req.user!;
	const otherUserId = req.params.otherUserId;

	const friend = await Friend.findOne({
		$or: [
			{ fromUserId: user.userId, toUserId: otherUserId },
			{ fromUserId: otherUserId, toUserId: user.userId },
		],
	});

	console.log(friend);

	if (friend) {
		console.log(friend.status);
		if(friend.status === "accepted") {
			res.status(200).json({ status: "accepted" });
		}
		else {
			res.status(200).json({ status: (friend.fromUserId.toString() === user.userId ? "sent" : "pending") });
		}
	} else {
		res.status(200).json({ status: "not sent" });
	}
}

export const sendRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
	const user = req.user!;
	const otherUserId = req.params.otherUserId;

	const existingRequest = await Friend.findOne({
		$or: [
			{ fromUserId: user.userId, toUserId: otherUserId },
			{ fromUserId: otherUserId, toUserId: user.userId },
		],
	});

	console.log(existingRequest);

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
		res.status(201).json({ message: "Friend request sent" });
	}
};

export const acceptRequest = async (
	req: Request,
	res: Response
): Promise<void> => {
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

export const removeFriend = async (
    req: Request,
    res: Response
): Promise<void> => {
    const user = req.user!;
    const otherUserId = req.params.otherUserId;

    const result = await Friend.deleteOne({
		$or: [
			{ fromUserId: otherUserId, toUserId: user.userId },
			{ fromUserId: user.userId, toUserId: otherUserId }
		],
		status: { $in: ["pending", "accepted"] },
	});
    if (result.deletedCount > 0) {
        res.json({ message: "Friend request declined" });
    } else {
        res
            .status(400)
            .json({ message: "No pending or accepted friend request from this user" });
    }
};

export default {
	getFriends,
	getFriendRequests,
	getFriendStatus,
	sendRequest,
	acceptRequest,
	removeFriend,
};
