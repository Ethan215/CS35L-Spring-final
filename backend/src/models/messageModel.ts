import mongoose, { Document, Schema } from 'mongoose';

interface IInbox extends Document {
  sender: string;
  receiver: string;
  subject: string;
  message: string;
  read: boolean;
  sentDate: Date;
}

const InboxSchema: Schema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  sentDate: { type: Date, default: Date.now },
});

export default mongoose.model<IInbox>('Inbox', InboxSchema);