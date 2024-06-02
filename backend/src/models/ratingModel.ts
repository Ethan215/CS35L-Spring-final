import mongoose, { Schema, Document } from 'mongoose';

interface IRating extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  raterId: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ratingSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  raterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Rating = mongoose.model<IRating>('Rating', ratingSchema);

export default Rating;
