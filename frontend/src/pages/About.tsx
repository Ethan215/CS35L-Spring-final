import React, { useState, useEffect } from "react";
import { ProfileData, GameData } from "@common/profile";
import { gameIconDictionary } from "../assets/gameIconDictionary";
import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

const About: React.FC = () => {

	const [userData, setUserData] = useState<ProfileData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/profiles");

				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}

				const data: { profiles: ProfileData[] } = await response.json();
				setUserData(data.profiles); // Setting only the profiles array to userData state

			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		//background color
		<div className="flex flex-col min-h-screen bg-gray-900 text-white py-10 px-5">
			<div className="grow flex flex-nowrap items-center gap-5 justify-center py-12 flex-row">
			<div className="h-full p-6 text-center basis-1 grow">
					<img
						className="about-image h-auto max-w-full rounded-2xl"
						src={gameIconDictionary["About"]}
						alt="Friends playing video games together."
					/>
			</div>
			<div className="h-full basis-1 grow">
					<h1 className="font-bold text-3xl text-white pb-6">
							<span className="relative inline-block pb-1.5">
								About
								<span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></span>
							</span>
					</h1>
					<p className="max-w-xl text-lg">
						Welcome to Finduo, an online tool created with the purpose of helping the gaming community connect with each other based off of shared interests and goals.
						Find a new friend from across the world, or from a few cities over for when you're dedicated to hopping on the same server. Our goal is to streamline the
						process of finding friends to play your favorite games with. Through Finduo, building lasting connections with other like-minded gamers has never been easier.
						Hone your gameplay skills with your ideal partner by using our advanced search filters, reach out to a potential new friend by sending a party code through
						our messaging system, and don't forget to check your own inbox for invitations waiting on a response!
					</p>
			</div>
			</div>
			
			<div className="button-contaier relative">
				<button className="start-button absolute">Find players</button>
			</div>
			<div className="flex-grow max-h-[50vh] flex overflow-x-hidden">
				<div className="flex animate-marquee">
				{userData.map((user: ProfileData, index) => (
					<div key={index} className="min-w-[25vw] relative group p-5 m-2 rounded-xl overflow-hidden border-2 border-slate-600 hover:border-slate-300">
						<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-slate-600 opacity-80 group-hover:opacity-40"></div>
							<div className="w-max overflow-x-visible">
								<div className="flex flex-row">
									<img
										src={user.profilePicture || defaultProfileIcon}
										alt="Profile picture"
										onError={(e) => {
											(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
											(e.target as HTMLImageElement).src = defaultProfileIcon;
										}}
										className="w-24 h-24 rounded-full mr-4 bg-gray-300 basis-0"
									/>
								<div>
									<h1 className="text-xl font-bold text-white">
									{user.username}
									</h1>
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
								</div>
							</div>
						</div>
					</div>))}
				</div>
				<div className="flex animate-marquee2 whitespace-nowrap">
				{userData.map((user: ProfileData, index) => (
					<div key={index+userData.length} className="min-w-[25vw] relative group p-5 m-2 rounded-xl overflow-hidden border-2 border-slate-600 hover:border-slate-300">
						<div className="absolute inset-0 transition-opacity duration-300 ease-out bg-slate-600 opacity-80 group-hover:opacity-40"></div>
							<div className="w-max overflow-x-visible">
								<div className="flex flex-row">
									<img
										src={user.profilePicture || defaultProfileIcon}
										alt="Profile picture"
										onError={(e) => {
											(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
											(e.target as HTMLImageElement).src = defaultProfileIcon;
										}}
										className="w-24 h-24 rounded-full mr-4 bg-gray-300 basis-0"
									/>
								<div>
									<h1 className="text-xl font-bold text-white">
									{user.username}
									</h1>
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
								</div>
							</div>
						</div>
					</div>))}
				</div>
			</div>
		</div>
	);
};


export default About;
