import { Request, Response } from 'express';
import Rating from '../models/ratingModel';

export const addRating = async (req: Request, res: Response) => {
  try {
    const { userId, rating, comment } = req.body;
    const raterId = req.user.id; // Assuming you have a user authentication middleware

    const newRating = new Rating({ userId, raterId, rating, comment });
    await newRating.save();

    res.status(201).json({ message: 'Rating added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserRatings = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ userId }).populate('raterId', 'username');

    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserAverageRating = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const ratings = await Rating.find({ userId });

    if (ratings.length === 0) {
      return res.status(200).json({ averageRating: 0 });
    }

    const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

    res.status(200).json({ averageRating });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
