import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileData } from "@common/profile";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";
import FriendsList from "../components/FriendsList";

import { gameIconDictionary } from "../assets/gameIconDictionary";

import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

const Profile: React.FC = () => {
	const { id } = useParams();

	const navigate = useNavigate(); // useNavigate hooks to get navigation functions

	const { user } = useContext(UserContext)!;

	const displayCurrentUser: boolean = id === user?._id || !id;

	// if id is provided, fetch that profile, otherwise get the current user's profile by requesting the id from the UserContext
	const [profile, setProfile] = useState<ProfileData | null>(null);

	const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

	let [friendStatus, setFriendStatus] = useState<string>("not sent");

	const handleLikeClick = async (userId: string) => {
		if (likedProfiles.includes(userId)) {
			await fetch(`/api/user/unlike/${userId}`, { method: "DELETE" });
			fetchLikedProfiles();
		} else {
			await fetch(`/api/user/like/${userId}`, { method: "POST" });
			fetchLikedProfiles();
		}
	};

	const fetchFriendStatus = async () => {
		const response = await fetch(`/api/friends/status/${id}`);
		if (response.ok) {
			const data = await response.json();
			setFriendStatus(data.status);
		}
	};

	const fetchProfile = async () => {
		const profileEndpoint = !id ? "/api/profiles/me" : `/api/profiles/id/${id}`;
		const response = await fetch(profileEndpoint);

		if (!response.ok) {
			if (!id) {
				console.log(
					"Profile potentially uncreated, redirecting to edit profile"
				);
				navigate("/edit-profile");
			}
			else {
				navigate("/");
			}
		}

		const data = await response.json();
		setProfile(data.profile);
	};

	const fetchLikedProfiles = async () => {
		const likedResponse = await fetch("/api/user/liked-profiles");
		const likedData = await likedResponse.json();
		setLikedProfiles(
			likedData.likedProfiles.map((profile: ProfileData) => profile.userId)
		);
	};

	useEffect(() => {
		//check if both id and user are null, if so, navigate to home page
		if (!id && !user) {
			navigate("/");
		}
		fetchProfile();

		if (!displayCurrentUser) {
			fetchFriendStatus();
			fetchLikedProfiles();
		}
	}, [id]);

	useEffect(() => {
		//check if both id and user are null, if so, navigate to home page
		if (!id && !user) {
			navigate("/");
		}
		fetchProfile();
	}, [likedProfiles]);

	if (!profile) {
		return <Loading />;
	}

	const handleAddFriend = async (otherUserId: string) => {
		const response = await fetch(`/api/friends/send/${otherUserId}`, {
			method: "POST",
		});
		const data = await response.json();
		fetchFriendStatus();
		console.log(data);
	};

	const handleDeclineFriend = async (otherUserId: string) => {
		const response = await fetch(`/api/friends/decline/${otherUserId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		fetchFriendStatus();
		console.log(data);
	};

	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white">
			<div className="flex flex-row w-3/4 mt-10">
				<div className="flex flex-col w-2/3">
					<div className="flex flex-row items-center bg-gray-800 rounded-lg p-5 mb-5">
						<div className="relative">
							<img
								src={profile.profilePicture || defaultProfileIcon}
								alt={profile.username}
								className="w-36 h-36 object-cover rounded-full mr-4"
								onError={(e) => {
									(e.target as HTMLImageElement).onerror = null;
									(e.target as HTMLImageElement).src = defaultProfileIcon;
								}}
							/>
						</div>
						<div className="flex-grow">
							<div className="text-left">
								<h1 className="text-4xl mb-2">{profile.username}</h1>
								<p className="text-md">Region: {profile.region}</p>
								<p className="text-md">Language: {profile.language}</p>
								<p className="text-md">Stars: {profile.stars}</p>
								<p className="text-sm mt-4">{profile.bio}</p>
							</div>
						</div>
						<div className="flex-none flex flex-col items-end">
							{displayCurrentUser ? (
								<button
									className="flex-grow mt-4 py-2 px-4 rounded bg-slate-700 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
									onClick={() => {
										if (displayCurrentUser) {
											navigate("/edit-profile");
										} else {
											navigate(`/send-message/${profile.username}`); // Navigate to SendMessage page
										}
									}}
								>
									Edit Profile
								</button>
							) : (
								<>
									<button
											className={`flex-grow mt-4 py-2 px-4 rounded text-white ${
												!(
													friendStatus !== "not sent" &&
													friendStatus !== "pending"
												)
													? "bg-slate-700 hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
													: "bg-gradient-to-r from-pink-500 to-blue-500"
											}`}
											onClick={() => handleAddFriend(profile.userId)}
											disabled={
												friendStatus !== "not sent" &&
												friendStatus !== "pending"
											}
										>
											{
												{
													"not sent": "Add Friend",
													pending: "Accept Friend Request",
													sent: "Request Sent",
													accepted: "Friends",
												}[friendStatus]
											}
										</button>
										{(friendStatus === "accepted" ||
											friendStatus === "pending") && (
											<button
												className="flex-grow mt-4 py-2 px-4 rounded bg-red-500 text-white hover:bg-red-700"
												onClick={() => handleDeclineFriend(profile.userId)}
											>
												{friendStatus === "accepted"
													? "Remove Friend"
													: "Decline Request"}
											</button>
										)}
									</>
								)}
							{!displayCurrentUser && (
								<button
									className="mt-4 py-2 px-4 rounded bg-slate-700 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
									onClick={() => navigate(`/send-message/${profile.username}`)}
								>
									Send Message
								</button>
							)}
						</div>
					</div>
					<div className="flex flex-col bg-gray-800 rounded-lg p-5">
						{profile.games.map((game) => (
							<div
								key={game._id}
								className="relative flex flex-col text-gray-300 mb-4"
							>
							<div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
								<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
								<div className="relative">
									<div className="flex flex-row">
										<div className="flex-3">
											<div className="flex justify-between items-center pb-2">
												<div className="relative inline-block pb-1">
													<h1 className="text-xl font-bold text-white">
														{game.title}
													</h1>
													<span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></span>
												</div>
												<img
													src={gameIconDictionary[game.title]}
													alt={`${game.title} icon`}
													className="w-8 h-8"
												/>
											</div>
											<p className="text-sm">
												<span className="font-bold">Rank:</span> {game.rank}
											</p>
										</div>
										<div className="flex flex-wrap justify-end items-end mt-2 flex-1">
											{game.tags.map((tag, index) => (
												<span
													key={index}
													className="inline-block bg-gradient-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-400 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
					</div>
				</div>
				<div className="flex w-1/3 ml-5">
					<FriendsList />
				</div>
			</div>
		</div>
	);
};

export default Profile;
