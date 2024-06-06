import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostData } from "@common/post";

export const PostFeed: React.FC = () => {
	const [posts, setPosts] = useState<PostData[]>([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/posts");
			const posts = await response.json();
			setPosts(posts);
		};

		fetchPosts();
	}, []);

	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white pt-10">
			<h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
				Posts
			</h1>
			<div className="flex flex-col w-2/3">
				<Link
					to="/posts/make"
					className="inline-block mb-4 px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
				>
					Make a Post
				</Link>
				{[...posts].reverse().map((post) => (
					<Link to={`/posts/id/${post._id}`} key={post._id}>
						<div className="w-full relative group p-5 m-1 rounded-lg overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-2 border-slate-600 hover:border-slate-300">
							<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
							<div className="relative">
								<h2 className="font-bold text-3xl text-white pb-6">
									{post.title}
								</h2>
								<p className="text-gray-300">Posted by {post.username}</p>
								{post.createdAt && (
									<p className="text-gray-300 text-sm">
										Posted at {new Date(post.createdAt).toLocaleString()}
									</p>
								)}
								<textarea
									className="min-h-[10vh] w-full text-gray-300 overflow-hidden resize-none bg-transparent"
									readOnly
								>
									{post.body}
								</textarea>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default PostFeed;
