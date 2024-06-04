import React, { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProfileData } from "@common/profile";
import UserContext from "../contexts/UserContext";
import Loading from "./Loading";

import { gameIconDictionary } from "../assets/gameIconDictionary";

const Profile: React.FC = () => {
	const { id } = useParams();

	const navigate = useNavigate(); // useNavigate hooks to get navigation functions

	const { user } = useContext(UserContext)!;

	const displayCurrentUser : boolean = id === user?._id || !id;

	console.log(user);

	// if id is provided, fetch that profile, otherwise get the current user's profile by requesting the id from the UserContext
	const [profile, setProfile] = useState<ProfileData | null>(null);

	useEffect(() => {
		//check if both id and user are null, if so, navigate to home page
		if (!id && !user) {
			navigate("/");
		}

		const fetchProfile = async () => {
			const response = await fetch(`/api/profiles/${displayCurrentUser ?  user!._id : id}`);
			const data = await response.json();
			setProfile(data.profile);
		};

		fetchProfile();
	}, [id]);

	if (!profile) {
		return <Loading />;
	}

	const handleAddFriend = async (otherUserId: string) => {
		const response = await fetch(`/api/friends/send/${otherUserId}`, {
			method: "POST"
		});
		const data = await response.json();
		console.log(data);
	}

	return (
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white">
			<div className="flex flex-col w-1/2 mt-10">
				<div className="h-1/3 flex flex-row items-center p-5 header-gradient-border relative overflow-hidden">
					<img
						src={profile.profilePicture}
						alt={profile.username}
						className="flex-none w-36 h-36 object-cover rounded-full mr-5 bg-slate-100 z-10"
					/>
					<div className="z-10 flex-grow">
						<div className="flex flex-row items-center">
							<div className="flex-grow">
								<h1 className="text-4xl mb-2">{profile.username}</h1>
								<p className="text-md">Region: {profile.region}</p>
								<p className="text-md">Language: {profile.language}</p>
								<p className="text-md pb-5">Stars: {profile.stars}</p>
							</div>
							<div className="flex-none flex justify-end pr-20">
								<button className="mt-4 py-2 px-4 rounded bg-slate-700 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500"
									onClick={(displayCurrentUser) ? () => navigate("/edit-profile") : () => {handleAddFriend(profile.userId)}}
								>
									{(displayCurrentUser) ? "Edit Profile" : "Add Friend"}
								</button>
							</div>
						</div>
						<p className="text-sm mr-20">{profile.bio}</p>
					</div>
				</div>
				<div className="flex flex-col p-5 align-center">
					{profile.games.map((game) => (
						<div
							key={game._id}
							className="relative flex flex-col text-gray-300"
						>
							<div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
								<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
								<div className="relative">
									<div className="flex flex-row">
										<div className="flex-3">
											<div className="flex justify-between items-center pb-20">
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
		</div>
	);
};

export default Profile;
