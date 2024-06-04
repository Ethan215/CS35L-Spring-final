import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileData } from "@common/profile";
import Loading from "./Loading";

import { gameIconDictionary } from "../assets/gameIconDictionary";

const EditProfile: React.FC = () => {
	const navigate = useNavigate();

	const fetchedProfile = useRef<ProfileData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProfile = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/api/profiles/me");
				if (response.ok) {
					const data = await response.json();
					console.log("Profile data:", data);
					fetchedProfile.current = data.profile;
				} else {
					console.error("Failed to fetch profile data");
					navigate("/");
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
			}

			setIsLoading(false);
		};
		fetchProfile();
	}, []);

	const handleSave = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const updatedProfile: Partial<ProfileData> = {
            region: formData.get('region') as string,
            language: formData.get('language') as string,
            bio: formData.get('bio') as string,
        };

		try {
			console.log("Updating profile with data:", updatedProfile);
			const response = await fetch("/api/profiles", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProfile),
			});

			if (response.ok) {
				console.log("Profile updated successfully");
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

	// Initialize games state
	// const [games, setGames] = useState(fetchedProfile.current?.games || []);

	// function handleAddGame() {
	// 	// Create a new game with default values
	// 	const newGame = {
	// 		_id: "",
	// 		title: "",
	// 		rank: "",
	// 		tags: [],
	// 	};

	// 	// Add the new game to the games array
	// 	setGames((prevGames) => [...prevGames, newGame]);
	// }

    // function handleRemoveGame(gameIndex : number) {
    //     // Remove the game at the specified index from the games array
    //     setGames(prevGames => prevGames.filter((_, index) => index !== gameIndex));
    // }

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
						<input
							type="text"
							name="region"
							defaultValue={fetchedProfile.current?.region || ""}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
						/>
					</div>
					<div className="flex flex-col flex-grow space-y-2">
						<label className="block text-gray-300">Language</label>
						<input
							type="text"
							name="language"
							defaultValue={fetchedProfile.current?.language || ""}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600"
						/>
					</div>
					<div className="flex-none h-96 pb-10">
						<label className="block text-gray-300">Bio</label>
						<textarea
							name="bio"
							defaultValue={fetchedProfile.current?.bio || ""}
							className="flex-none h-full w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white focus:bg-gray-600 overflow-auto resize-none"
						/>
					</div>
					{fetchedProfile.current?.games.map((game, gameIndex) => (
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
													<input
														type="text"
														name={`game-${gameIndex}-title`}
														defaultValue={game.title || ""}
														className="text-xl font-bold text-white w-full bg-slate-700"
													/>
												</div>  
												<img
													src={gameIconDictionary[game.title]}
													alt={`${game.title} icon`}
													className="w-8 h-8"
												/>
											</div>
											<div className="text-sm">
												<span className="font-bold">Rank:</span>
												<input
													type="text"
													name={`game-${gameIndex}-rank`}
													defaultValue={game.rank || ""}
													className="w-full bg-slate-700 text-white"
												/>
											</div>
										</div>
										<div className="flex flex-wrap justify-end items-end mt-2 flex-1">
											{game.tags.map((tag, tagIndex) => (
												<div
													key={tagIndex}
													className="inline-block bg-gradient-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-400 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2"
												>
													<input
														type="text"
														name={`game-${gameIndex}-tag-${tagIndex}`}
														defaultValue={tag || ""}
														className="w-full bg-slate-700 text-white"
													/>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
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
