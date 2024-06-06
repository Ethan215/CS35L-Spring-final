import { Request, Response } from "express";
import { PostDocument, Post } from "../models/postModel";
import { ProfileDocument, Profile } from "../models/profileModel";
import { CommentData } from "@common/post";


export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts: PostDocument[] | null = await Post.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({ message: (err as Error).message });
	}
};

export const getPost = async (req: Request, res: Response) => {
	try {
		const post: PostDocument | null = await Post.findById(req.params.id);
		if (post == null) {
			return res.status(404).json({ message: "Cannot find post" });
		}
		res.json(post);
	} catch (err) {
		res.status(500).json({ message: (err as Error).message });
	}
};

export const createPost = async (req: Request, res: Response) => {
	const post = new Post({
		title: req.body.title,
		body: req.body.body,
		userId: req.user!.userId,
        username: req.user!.username,
	});

	try {
		const newPost = await post.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(400).json({ message: (err as Error).message });
	}
};

export const deletePost = async (req: Request, res: Response) => {
	try {
		const post = await Post.deleteOne({ _id: req.params.id });

		res.json({ message: "Deleted post" });
	} catch (err) {
		res.status(500).json({ message: (err as Error).message });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	try {
		const post: PostDocument | null = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Cannot find post" });
		}

		if (req.body.title != null) {
			post.title = req.body.title as string;
		}

		if (req.body.body != null) {
			post.body = req.body.body as string;
		}

		const updatedPost = await post.save();
		res.json(updatedPost);
	} catch (err) {
		res.status(500).json({ message: (err as Error).message });
	}
};

export const addComment = async (req: Request, res: Response) => {
	try {
		const post: PostDocument | null = await Post.findById(req.params.id);
		if (post == null) {
			return res.status(404).json({ message: "Cannot find post" });
		}

		const userProfile: ProfileDocument | null = await Profile.findOne({
			userId: req.user?.userId,
		});

		if (!userProfile) {
			return res.status(404).json({ message: "Cannot find user profile" });
		}

		const commentData: CommentData = {
			body: req.body.body,
			userId: req.user!.userId,
			username: req.user!.username,
			profilePicture: userProfile.profilePicture,
		};

		post.comments.push(commentData);

		const updatedPost = await post.save();
		res.json(updatedPost);
	} catch (err) {
		res.status(500).json({ message: (err as Error).message });
	}
};

export default 
{
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    addComment,
}