import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CommentData, PostData } from "@common/post";
import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

import Loading from "./Loading";

export const ViewPost: React.FC = () => {
	const [post, setPost] = useState<PostData | null>(null);
	const { id } = useParams();

	// Add this state variable at the start of your component
	const [comment, setComment] = useState("");

	// Add this function to handle form submissions
	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch(`/api/posts/id/${id}/comment`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				body: comment,
			}),
		});

		if (response.ok) {
			fetchPost();
		} else {
			console.error("Failed to submit comment");
		}
	};

	const fetchPost = async () => {
		const response = await fetch(`/api/posts/id/${id}`);
		const post = await response.json();
		setPost(post);
	};

	useEffect(() => {
		fetchPost();
	}, [id]);

	if (!post) {
		return <Loading></Loading>;
	}
	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white pt-10">
			<div className="flex flex-col items-center w-1/2">
				<div className="w-full relative group p-5 m-1 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-slate-600 hover:border-slate-300">
					<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
					<div className="relative">
						<h2 className="text-2xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">{post.title}</h2>
					</div>
				</div>
				<div className="w-full relative group p-5 m-1 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-slate-600 hover:border-slate-300">
					<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
					<div className="relative">
						<p className="text-gray-300 text-md">Posted by {post.username}</p>
						{post.createdAt && (
							<p className="text-gray-300 text-sm">
								Posted at {new Date(post.createdAt).toLocaleString()}
							</p>
						)}
					</div>
				</div>
				<div className="w-full min-h-[25vh] relative group p-5 m-1 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-slate-600 hover:border-slate-300">
					<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
					<div className="relative">
						<textarea
							className="min-h-[10vh] w-full text-gray-300 overflow-hidden resize-none bg-transparent"
							readOnly
						>
							{post.body}
						</textarea>
					</div>
				</div>
				<form
					onSubmit={handleCommentSubmit}
					className="w-full flex flex-col items-center"
				>
					<label className="w-full">
						<h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mt-10">
							Comments
						</h1>
						<h1 className="text-md font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mt-10">
							Leave a comment below!
						</h1>
					</label>
					<textarea
						className="w-full p-2 mb-4 text-gray-300 bg-transparent border border-gray-600 rounded"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<button
						type="submit"
						className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
					>
						Submit Comment
					</button>
				</form>
				{post.comments.map((comment: CommentData, index: number) => (
					<div
						key={index}
						className="w-full relative group p-4 m-1 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-slate-600 hover:border-slate-300"
					>
						<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
						<div className="relative">
							<p className="text-gray-300 mb-10">{comment.body}</p>
							<div className="flex items-center">
								<img
									src={comment.profilePicture || defaultProfileIcon}
									alt={comment.username}
									className="w-5 h-5 object-cover rounded-full mr-4"
									onError={(e) => {
										(e.target as HTMLImageElement).onerror = null;
										(e.target as HTMLImageElement).src = defaultProfileIcon;
									}}
								/>
								<p className="text-gray-300 text-xs">
									Commented by {comment.username}
								</p>
							</div>
							{comment.createdAt && (
								<p className="text-gray-300 text-xs">
									Commented at {new Date(comment.createdAt).toLocaleString()}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ViewPost;
