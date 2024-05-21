import { Request, Response } from "express";
import { MessageDocument } from "@common/message";
import Message from "../models/messageModel";

const getMessages = async (req: Request, res: Response): Promise<void> => {
	try {
		const messages: MessageDocument[] | null = await Message.find();
		if (!messages) res.status(404).json({ error: "Messages not found" });

		res.status(200).json({ messages });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const getMessage = async (req: Request, res: Response) => {
	try {
		const message: MessageDocument | null = await Message.findById(
			req.params.id
		);
		if (!message) res.status(404).json({ error: "Message not found" });

		res.status(200).json({ message });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const createMessage = async (req: Request, res: Response) => {
	try {
		const message: MessageDocument = new Message(req.body);

		await message.save();

		res.status(200).json({ message });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const deleteMessage = async (req: Request, res: Response) => {
	try {
		const message: MessageDocument | null = await Message.findById(
			req.params.id
		);
		if (!message) res.status(404).json({ error: "Message not found" });

		await Message.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Message deleted" });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

const updateMessage = async (req: Request, res: Response) => {
	try {
		const newMessage : MessageDocument = req.body;
		const updatedMessage: MessageDocument | null =
			await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedMessage) res.status(404).json({ error: "Message not found" });

		res.status(201).json({ message: updatedMessage });
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};

export default {
	getMessages,
	getMessage,
	createMessage,
	deleteMessage,
	updateMessage,
};