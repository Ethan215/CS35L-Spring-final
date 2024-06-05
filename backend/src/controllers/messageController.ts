import { Request, Response } from 'express';
import Message from '../models/messageDocument';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, title, body } = req.body;
    const senderId = req.user.id;

    const message = new Message({ senderId, receiverId, title, body, read: false });
    await message.save();

    res.status(201).json({ message: 'Message sent successfully', message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const messages = await Message.find({ receiverId: userId }).populate('senderId', 'username');

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findByIdAndDelete(messageId);

    if (!message) {
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
    const message = await Message.findByIdAndUpdate(messageId, { read: true }, { new: true });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({ message: 'Message marked as read', message });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
