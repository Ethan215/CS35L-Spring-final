import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CommentData, PostData } from "@common/post";

export const ViewPost: React.FC = () => {
	const [post, setPost] = useState<PostData | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/posts/id/${id}`);
			const post = await response.json();
			setPost(post);
		};

		fetchPost();
	}, [id]);

	if (!post) {
		return <div>Loading...</div>;
	}
	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white pt-10">
			<div className="flex flex-col items-center w-1/2">
				<div className="w-full relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
					<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
					<div className="relative">
						<h2 className="font-bold text-3xl text-white pb-6">{post.title}</h2>
						<p className="text-gray-300 text-md">Posted by {post.username}</p>
						{post.createdAt && (
							<p className="text-gray-300 text-sm">
								Posted at {new Date(post.createdAt).toLocaleString()}
							</p>
						)}
					</div>
				</div>
				<div className="w-full min-h-[25vh] relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
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
				{post.comments.map((comment: CommentData, index: number) => (
					<div
						key={index}
						className="w-full relative group p-4 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300"
					>
						<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
						<div className="relative">
							<p className="text-gray-300">{comment.body}</p>
							<p className="text-gray-300">Commented by {comment.username}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ViewPost;
