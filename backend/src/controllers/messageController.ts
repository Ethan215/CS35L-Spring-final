import { Request, Response } from 'express';
import { Message } from '../models/messageModel';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, title, body } = req.body;
    const senderId = req.user!.userId;

    const messageDocument = new Message({ senderId, receiverId, title, body, read: false });
    await messageDocument.save();

    res.status(201).json({ message: 'Message sent successfully', messageDocument });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const messages = await Message.find({ receiverId: userId }).populate('senderId', 'username');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const messageDocument = await Message.findByIdAndDelete(messageId);

    if (!messageDocument) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const messageDocument = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });

    if (!messageDocument) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read', messageDocument });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
