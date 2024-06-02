import { Request, Response } from 'express';
import Invite from '../models/inviteModel';
import crypto from 'crypto';

export const createInvite = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiration

    const invite = new Invite({ email, token, expiresAt });
    await invite.save();

    // Send invite email with token (email sending logic goes here)

    res.status(201).json({ message: 'Invite created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const invite = await Invite.findOne({ token, expiresAt: { $gt: new Date() }, isAccepted: false });

    if (!invite) {
      return res.status(400).json({ message: 'Invalid or expired invite token' });
    }

    invite.isAccepted = true;
    await invite.save();

    // Create user account logic goes here

    res.status(200).json({ message: 'Invite accepted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
