import mongoose, { Document } from "mongoose";
import { PostData, CommentData } from "@common/post";

const Schema = mongoose.Schema;

export interface PostDocument extends Omit<PostData, '_id'>, Document {
  _id: mongoose.Types.ObjectId;
  comments: CommentData[];
}

export const CommentSchema = new Schema<CommentData>({
  userId: mongoose.Types.ObjectId,
  username: String,
  profilePicture: String,
  body: String,
}, { timestamps: true });

const PostSchema = new Schema<PostDocument>({
  userId: mongoose.Types.ObjectId,
  username: String,
  profilePicture: String,
  title: String,
  body: String,
  likes: [mongoose.Types.ObjectId],
  comments: [CommentSchema],
}, { timestamps: true });

export const Post = mongoose.model<PostDocument>("Post", PostSchema);

export default Post;