// common/utils.ts

import crypto from 'crypto';

// Generate a random token
export const generateToken = (length: number = 20): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Calculate average rating
export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return sum / ratings.length;
};
