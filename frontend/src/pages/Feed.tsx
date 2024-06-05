import React, { useState, useEffect } from "react";
import { ProfileData, GameData } from "@common/profile";
import { gameIconDictionary } from "../assets/gameIconDictionary";
import { useNavigate } from "react-router-dom";

import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

const Feed: React.FC = () => {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const [userData, setUserData] = useState<ProfileData[]>([]);
	const [searchUser, setSearchUser] = useState<string>("");
	const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
	const [selectedRank, setSelectedRank] = useState<string | null>(null);
	const [regions, setRegions] = useState<string[]>([]);
	const [ranks, setRanks] = useState<string[]>([]);
	const [likedProfiles, setLikedProfiles] = useState<string[]>([]);
	const navigate = useNavigate();


	// Add the handleLikeClick method
	const handleLikeClick = async (userId: string) => {
		if (likedProfiles.includes(userId)) {
			await unlikeProfile(userId);
			setLikedProfiles(likedProfiles.filter((id) => id !== userId));
		} else {
			await likeProfile(userId);
			const newLikedProfiles = [...likedProfiles, userId];
			setLikedProfiles(newLikedProfiles);
			console.log("Updated liked profiles:", newLikedProfiles);
		}
	};
	  // Add the likeProfile method
	const likeProfile = async (otherUserId: string): Promise<void> => {
		try {
			const response = await fetch(`/api/user/like/${otherUserId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				console.log("Profile liked successfully");
			} else {
				console.error("Failed to like profile");
			}
		} catch (error) {
			console.error("Error liking profile:", error);
		}
	};
	  
	  // Add the unlikeProfile method
	const unlikeProfile = async (otherUserId: string): Promise<void> => {
		try {
			const response = await fetch(`/api/user/unlike/${otherUserId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				console.log("Profile unliked successfully");
			} else {
				console.error("Failed to unlike profile");
			}
		} catch (error) {
			console.error("Error unliking profile:", error);
		}
	};
	
	const handleGameClick = (gameTitle: string) => {
		setSelectedGame(gameTitle);
		setSelectedRank(null);
	};

	const handleVisitProfileClick = (userId: string) => {
		navigate(`/profile/${userId}`); // Redirect to the profile page of the selected user
	};

	const handleSendMsgClick = (userId: string) => {
		navigate(`/inbox/send-message/${userId}`); // Redirect to the send message page with the selected user
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchUser(e.target.value);
	};

	const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRegion(e.target.value);
	};

	const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRank(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/profiles");

				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const data: { profiles: ProfileData[] } = await response.json();
				setUserData(data.profiles); // Setting only the profiles array to userData state

				if (data.profiles.length > 0) {
					// Extract unique game titles and set the first one as selected by default
					const uniqueTitles = Array.from(
						new Set(
							data.profiles.flatMap((user: ProfileData) =>
								user.games.map((game: GameData) => game.title)
							)
						)
					);

					if (uniqueTitles.length !== 0) {
						setSelectedGame(uniqueTitles[0]);
					}
				}

				// Get profiles that users have liked
				const likedResponse = await fetch("/api/user/liked-profiles");
				const likedData = await likedResponse.json();
				setLikedProfiles(
					likedData.likedProfiles.map((profile: ProfileData) => profile.userId)
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (selectedGame) {
			const gameSpecificProfiles = userData.filter((user) =>
				user.games.some((game) => game.title === selectedGame)
			);

			// Extract unique regions for the selected game
			const uniqueRegions = Array.from(
				new Set(gameSpecificProfiles.map((user: ProfileData) => user.region))
			);
			setRegions(uniqueRegions);

			// Extract unique ranks for the selected game
			const uniqueRanks = Array.from(
				new Set(
					gameSpecificProfiles.flatMap((user: ProfileData) =>
						user.games
							.filter((game) => game.title === selectedGame && game.rank)
							.map((game: GameData) => game.rank)
					)
				)
			);
			setRanks(uniqueRanks);
		}
	}, [selectedGame, userData]);

	// Filter user data based on search query, selected region, and selected rank
	const filteredUserData = userData.filter((user) => {
		const matchesSearch = user.username
			.toLowerCase()
			.includes(searchUser.toLowerCase());
		const matchesRegion = selectedRegion
			? user.region === selectedRegion
			: true;
		const matchesRank = selectedRank
			? user.games.some(
					(game: GameData) =>
						game.rank === selectedRank && game.title === selectedGame
			  )
			: true;
		return matchesSearch && matchesRegion && matchesRank;
	});

	// Extract unique game titles directly from userData
	const uniqueGameTitles = Array.from(
		new Set(
			userData.flatMap((user: ProfileData) =>
				user.games.map((game: GameData) => game.title)
			)
		)
	);

	return (
		<div className="flex flex-col min-h-screen w-full bg-gray-900">
			<div className="p-4">
				<div className="flex flex-row p-1 text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-auto">
					{uniqueGameTitles.map((gameTitle: string, index: number) => (
						<div
							key={index}
							onClick={() => handleGameClick(gameTitle)}
							className={`flex flex-col items-center justify-center relative p-10 cursor-pointer bg-gray-800 ${
								selectedGame === gameTitle
									? "overflow-hidden text-white"
									: " text-gray-100"
							}`}
						>
							<div
								className={`absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-b from-slate-500 to-slate-800 ${
									selectedGame === gameTitle ? "opacity-30" : "opacity-0"
								}`}
							></div>
							<div className="relative flex items-center space-x-2">
								<img
									src={gameIconDictionary[gameTitle]}
									alt={gameTitle}
									className="w-8 h-8 justify-center items-center"
								/>
								<h4 className="font-bold whitespace-nowrap">{gameTitle}</h4>
							</div>
						</div>
					))}
				</div>
				<div className="mt-4">
					<input
						type="text"
						placeholder="Search by username"
						value={searchUser}
						onChange={handleSearchChange}
						className="w-full p-2 rounded bg-gray-800 text-white"
					/>
					<select
						value={selectedRegion || ""}
						onChange={handleRegionChange}
						className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
					>
						<option value="">All Regions</option>
						{regions.map((region, index) => (
							<option key={index} value={region}>
								{region}
							</option>
						))}
					</select>
					<select
						value={selectedRank || ""}
						onChange={handleRankChange}
						className="w-full p-2 mt-2 rounded bg-gray-800 text-white"
					>
						<option value="">All Ranks</option>
						{ranks.map((rank, index) => (
							<option key={index} value={rank}>
								{rank}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
				{selectedGame !== null && (
					<div className="flex flex-col">
						<h2 className="font-bold text-3xl text-white pb-6">
							Duos for{" "}
							<span className="relative inline-block pb-1.5">
								{selectedGame}
								<span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></span>
							</span>
						</h2>
						{filteredUserData.map((user: ProfileData) =>
							user.games
								.filter((game: GameData) => game.title === selectedGame)
								.map((game: GameData) => (
									<div
										key={game._id}
										className="relative flex flex-col text-gray-300"
									>
										<div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
											<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
											<div className="relative">
												<div className="flex flex-row">
													<img
														src={user.profilePicture || defaultProfileIcon}
														alt="Profile"
														onError={(e) => {
															(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
															(e.target as HTMLImageElement).src =
																defaultProfileIcon;
														}}
														className="w-24 h-24 rounded-full mr-4 bg-gray-300 flex-none"
													/>
													<div className="flex-grow">
														<h1 className="text-xl font-bold text-white">
															{user.username}
														</h1>
														<p className="text-sm mb-1">{user.bio}</p>
														<p className="text-sm">
															<span className="font-bold">Region:</span>{" "}
															{user.region}
														</p>
														<p className="text-sm">
															<span className="font-bold">Rank:</span>{" "}
															{game.rank || "N/A"}
														</p>
														<p className="text-sm">
															<span className="font-bold">Language:</span>{" "}
															{user.language}
														</p>
														<p className="text-sm">
															<span className="font-bold">Stars:</span>{" "}
															{user.stars}
														</p>
														<div className="flex flex-row space-x-4 mt-4">
															<button
																onClick={() => handleVisitProfileClick(user.userId)}
																className="font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 text-white hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-slate-900 focus:ring-opacity-50"
															>
																Visit Profile
															</button>
															<button
																onClick={() => handleSendMsgClick(user.userId)}
																className="font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 text-white hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-slate-900 focus:ring-opacity-50"
															>
																Message
															</button>
															<button
																onClick={() => handleLikeClick(user.userId)}
																className="ml-2"
															>
																<svg
																	className={`
																		w-10 h-10 transition-colors duration-200 ${
																			likedProfiles.includes(user.userId)
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
													<div className="flex flex-wrap flex-none justify-end items-end mt-2">
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
								))
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Feed;
