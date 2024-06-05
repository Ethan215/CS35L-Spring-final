import mongoose from "mongoose";
import { FriendData } from "@common/friend";
import { Document } from "mongoose";

const Schema = mongoose.Schema;

export interface FriendDocument extends Omit<FriendData, "_id" | "fromUserId" | "toUserId">, Document {
	_id: mongoose.Types.ObjectId;
	fromUserId: mongoose.Types.ObjectId;
	toUserId: mongoose.Types.ObjectId;
}

const friendSchema = new Schema<FriendDocument>(
	{
		fromUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		toUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		status: { type: String, enum: ["pending", "accepted"], default: "pending" },
	},
	{ timestamps: true }
);

export const Friend = mongoose.model<FriendDocument>(
	"Friend",
	friendSchema
);

export default Friend;
