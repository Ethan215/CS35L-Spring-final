import mongoose, { Document, Schema } from 'mongoose';
import { MessageData } from '../../common/message';

export interface MessageDocument extends Omit<MessageData, '_id'>, Document {}

const messageSchema: Schema = new Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model<MessageDocument>('Message', messageSchema);

export default Message;
