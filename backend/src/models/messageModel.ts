import mongoose, { Document } from "mongoose";
import { MessageData } from "@common/message";

const Schema = mongoose.Schema;

export interface MessageDocument
	extends Omit<MessageData, "_id" | "senderId" | "receiverId">,
		Document {
	_id: mongoose.Types.ObjectId;
	senderId: mongoose.Types.ObjectId;
	receiverId: mongoose.Types.ObjectId;
}

const messageSchema = new Schema<MessageDocument>(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		read: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

// create a model with the Schema
export const Message = mongoose.model<MessageDocument>(
	"Message",
	messageSchema
);

export default Message;
