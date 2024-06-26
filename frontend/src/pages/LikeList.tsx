// src/pages/LikeList.tsx
import React, { useState, useEffect } from "react";
import { ProfileData } from "@common/profile";

import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

const LikeList: React.FC = () => {
	const [likedProfiles, setLikedProfiles] = useState<ProfileData[]>([]);
	const [likedProfileIds, setLikedProfileIds] = useState<string[]>([]);

	const handleLikeClick = async (userId: string) => {
		if (likedProfileIds.includes(userId)) {
			await fetch(`/api/user/unlike/${userId}`, { method: "DELETE" });
			fetchLikedProfiles();
		} else {
			await fetch(`/api/user/like/${userId}`, { method: "POST" });
			fetchLikedProfiles();
		}
	};

	const fetchLikedProfiles = async () => {
		try {
			const response = await fetch("/api/user/liked-profiles");
			const data = await response.json();
			setLikedProfiles(data.likedProfiles);
			setLikedProfileIds(
				(data.likedProfiles as ProfileData[]).map((profile) => profile.userId)
			);
		} catch (error) {
			console.error("Error fetching liked profiles:", error);
		}
	};

	useEffect(() => {
		fetchLikedProfiles();
	}, []);

	return (
		<div className="flex flex-col min-h-screen w-full bg-gray-900">
			<div className="p-4">
				<h1 className="text-4xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
					My Liked Profiles
				</h1>
				{likedProfiles.length === 0 ? (
					<p className="text-gray-400">You haven't liked any profiles yet.</p>
				) : (
					likedProfiles.map((profile) => (
						<div
							key={profile._id}
							className="relative flex flex-col text-gray-300 mb-4"
						>
							<div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600">
								<div className="flex flex-row">
									<img
										src={profile.profilePicture || defaultProfileIcon}
										onError={(e) => {
											(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
											(e.target as HTMLImageElement).src = defaultProfileIcon;
										}}
										alt="Profile"
										className="w-24 h-24 rounded-full mr-4 bg-gray-300 flex-none"
									/>
									<div className="flex-3">
										<h1 className="text-xl font-bold text-white">
											{profile.username}
										</h1>
										<p className="text-sm mb-1">{profile.bio}</p>
										<p className="text-sm">
											<span className="font-bold">Region:</span>{" "}
											{profile.region}
										</p>
										<p className="text-sm">
											<span className="font-bold">Language:</span>{" "}
											{profile.language}
										</p>
										<p className="text-sm">
											<span className="font-bold">Stars:</span> {profile.stars}
										</p>
										<div className="mt-4">
											<button
												onClick={() => handleLikeClick(profile.userId)}
											>
												<svg
													className={`
																		w-6 h-6 transition-colors duration-200 ${
																			likedProfileIds.includes(profile.userId)
																				? "text-yellow-400"
																				: "text-gray-400"
																		} hover:text-yellow-500`}
													fill="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path d="M12 .587l3.668 7.431L23 9.584l-5.668 5.533L18.9 23 12 19.412 5.1 23l1.568-7.883L1 9.584l7.332-1.566L12 .587z" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default LikeList;
