import React, {
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { GameData, ProfileData } from "@common/profile";
import Loading from "./Loading";

import { gameIconDictionary } from "../assets/gameIconDictionary";
import UserContext from "../contexts/UserContext";

const EditProfile: React.FC = () => {
	const navigate = useNavigate();

	const { user } = useContext(UserContext)!;

	const fetchedProfile = useRef<ProfileData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Initialize games state
	const [games, setGames] = useState<GameData[]>(
		fetchedProfile.current?.games || []
	);

	const profileFoundRef = useRef<boolean>(false);

	const gameOptions = [
		"Minecraft",
		"Overwatch",
		"Rainbow Six",
		"League of Legends",
		"VALORANT",
		"Counter Strike",
		"Apex Legends",
	];

	const regions = [
		"US-W", // US-West
		"US-C", // US-Central
		"US-E", // US-East
		"EU", // Europe
		"SEA", // Southeast Asia
		"ME", // Middle East
		"IN", // India
		"OCE", // Oceania
		"AF", // Africa
		"LAT", // Latin America (South America)
		"KR", // Korea
		"CN", // China
		"JP", // Japan
		"RU", // Russia
	];

	useEffect(() => {
		const fetchProfile = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/api/profiles/me");
				if (response.ok) {
					const data = await response.json();
					console.log("Profile data:", data);
					fetchedProfile.current = data.profile;
					profileFoundRef.current = true;
				} else {
					console.error(
						"Failed to fetch profile data, loading starter profile"
					);
					const starterProfile: Partial<ProfileData> = {
						username: user!.username,
						profilePicture: "default_profile_icon.jpg",
						bio: "This user has not yet created a bio",
						region: "US-W",
						language: "English",
						stars: 0,
					};
					fetchedProfile.current = starterProfile as ProfileData;
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}
			setIsLoading(false);
			setGames(fetchedProfile.current?.games || []);
		};
		fetchProfile();
	}, []);

	const handleSave = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const updatedProfile: Partial<ProfileData> = {
			userId: user!._id,
			username: user!.username,
			region: formData.get("region") as string,
			language: formData.get("language") as string,
			bio: formData.get("bio") as string,
			games: games,
		};

		try {
			console.log("Updating profile with data:", updatedProfile);
			const response = await fetch("/api/profiles", {
				method: profileFoundRef.current ? "PATCH" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProfile),
			});

			if (response.ok) {
				console.log("Profile updated successfully");
				navigate("/profile");
			} else {
				console.error("Failed to update profile");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	function handleAddGame() {
		// Create a new game with default values
		const newGame: Partial<GameData> = {
			title: "",
			rank: "",
			tags: [],
		};

		// Add the new game to the games array
		setGames((prevGames) => [...prevGames, newGame as GameData]);
	}

	function handleRemoveGame(gameIndex: number) {
		// Remove the game at the specified index from the games array
		setGames((prevGames) =>
			prevGames.filter((_, index) => index !== gameIndex)
		);
	}

	return (
		<div className="flex flex-col items-center min-h-screen w-screen bg-gray-900 text-white">
			<div className="flex flex-col w-1/2 mt-10 items-center p-5 header-gradient-border relative overflow-hidden">
				<h1 className="text-4xl font-semibold text-gray-300">Edit Profile</h1>
				<h2 className="text-2xl font-semibold text-gray-300">
					{fetchedProfile.current?.username}
				</h2>
				<form onSubmit={handleSave} className="flex flex-col space-y-6 w-full">
					<div className="flex flex-col flex-grow w-full space-y-2">
						<label className="block text-gray-300">Region</label>
						<select
							name="region"
							defaultValue={fetchedProfile.current?.region || "US-West"}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
						>
							{regions.map((region) => (
								<option key={region} value={region}>
									{region}
								</option>
							))}
						</select>
					</div>
					<div className="flex flex-col flex-grow space-y-2">
						<label className="block text-gray-300">Language</label>
						<input
							type="text"
							name="language"
							defaultValue={fetchedProfile.current?.language || ""}
							required={true}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
						/>
					</div>
					<div className="flex-none h-96 pb-10">
						<label className="block text-gray-300">Bio</label>
						<textarea
							name="bio"
							defaultValue={fetchedProfile.current?.bio || ""}
							required={true}
							className="flex-none h-full w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600 overflow-auto resize-none"
						/>
					</div>
					{games.map((game, gameIndex) => (
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
												<img
													src={game.title ? gameIconDictionary[game.title] : ""}
													alt={`${game.title} icon`}
													className={`w-8 h-8 mr-5 ${!game.title && "hidden"}`}
													onError={(e) => {
														const imageElement = e.target as HTMLImageElement;
														imageElement.src = "";
														imageElement.onerror = null;
													}}
												/>
												<div className="relative inline-block pb-1 mr-5">
													<select
														name={`game-${gameIndex}-title`}
														value={game.title || ""}
														required={true}
														className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
														onChange={(e) => {
															const newGames = [...games];
															newGames[gameIndex].title = e.target.value;
															setGames(newGames);
														}}
													>
														<option value="">Select a game</option>
														{gameOptions.map((option) => (
															<option key={option} value={option}>
																{option}
															</option>
														))}
													</select>
												</div>
												<div>
													<button
														type="button"
														onClick={() => handleRemoveGame(gameIndex)}
														className="px-2 py-1 w-10 h-10 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600"
													>
														X
													</button>
												</div>
											</div>
											<div className="text-sm">
												<span className="font-bold">Rank:</span>
												<input
													type="text"
													name={`game-${gameIndex}-rank`}
													defaultValue={game.rank || ""}
													className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
													onChange={(e) => {
														const newGames = [...games];
														newGames[gameIndex].rank = e.target.value;
														setGames(newGames);
													}}
												/>
											</div>
										</div>
										<div className="flex flex-col flex-1">
											<div className="flex flex-wrap justify-end items-end mt-2 flex-1">
												{game.tags.map((tag, tagIndex) => (
													<div
														key={tagIndex}
														className="inline-flex items-center bg-gradient-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-400 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2"
													>
														<input
															type="text"
															name={`game-${gameIndex}-tag-${tagIndex}`}
															defaultValue={tag || ""}
															className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
															required={true}
															onChange={(e) => {
																const newGames = [...games];
																newGames[gameIndex].tags[tagIndex] =
																	e.target.value;
																setGames(newGames);
															}}
														/>
														<button
															type="button"
															onClick={() => {
																const newGames = [...games];
																newGames[gameIndex].tags = newGames[
																	gameIndex
																].tags.filter((_, index) => index !== tagIndex);
																setGames(newGames);
															}}
															className="ml-2 text-white hover:text-gray-100 w-7 h-5 rounded-full flex items-center justify-center bg-red-500"
														>
															X
														</button>
													</div>
												))}
												<button
													type="button"
													onClick={() => {
														const newGames = [...games];
														newGames[gameIndex].tags.push("");
														setGames(newGames);
													}}
													className="inline-flex items-center bg-gradient-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-400 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2 hover:bg-white"
												>
													Add Tag
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddGame}
						className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
					>
						Add Game
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProfile;
