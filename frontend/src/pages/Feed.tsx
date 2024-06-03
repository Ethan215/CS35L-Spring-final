import React, { useState, useEffect } from "react";
import { ProfileData, GameData } from "@common/profile";

const Feed: React.FC = () => {
	const [selectedGame, setSelectedGame] = useState<string | null>(null);
	const [userData, setUserData] = useState<ProfileData[]>([]);

	const handleGameClick = (gameTitle: string) => {
		setSelectedGame(gameTitle);
	};

	const handleContactClick = (userId: string) => {
		console.log(`Contacting user with ID ${userId}`);
		// TODO Implement contact logic here
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/profiles");

				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const data = await response.json();
				setUserData(data.profiles); // Setting only the profiles array to userData state
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
		//set the default game to the first in the list
		setSelectedGame(userData[0]?.games[0]?.title);
	}, []);

	// Extracting unique game titles
	const uniqueGameTitles = Array.from(
		new Set(
			userData.flatMap((user: ProfileData) =>
				user.games.map((game: GameData) => game.title)
			)
		)
	);
	if (uniqueGameTitles.length !== 0 && (selectedGame === null || selectedGame === undefined)) {
		setSelectedGame(uniqueGameTitles[0]);
	}

	return (
		<div className="flex flex-col min-h-screen w-full bg-gray-900">
			<div className="p-4">
				<div className="flex flex-row p-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-auto">
					{uniqueGameTitles.map((gameTitle, index) => (
						<div
							key={index}
							onClick={() => handleGameClick(gameTitle)}
							className={`relative p-10 first-line:marker:cursor-pointer bg-gray-800 ${
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
							<div className="relative">
								<h4 className="font-bold">{gameTitle}</h4>
							</div>
						</div>
					))}
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
						{userData.map((user: ProfileData) =>
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
														src={user.profilePicture}
														alt="Profile"
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
															<span className="font-bold">Language:</span>{" "}
															{user.language}
														</p>
														<p className="text-sm">
															<span className="font-bold">Stars:</span>{" "}
															{user.stars}
														</p>
														<div className="mt-4">
															<button
																onClick={() => handleContactClick(user._id)}
																className="font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 text-white hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-slate-900 focus:ring-opacity-50"
															>
																Contact Me
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
