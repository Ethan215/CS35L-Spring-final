import mongoose, { Schema, Document } from 'mongoose';

interface IInvite extends Document {
  email: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  isAccepted: boolean;
}

const inviteSchema: Schema = new Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  isAccepted: { type: Boolean, default: false }
});

const Invite = mongoose.model<IInvite>('Invite', inviteSchema);

export default Invite;
