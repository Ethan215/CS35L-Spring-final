import React from "react";
import { Link } from "react-router-dom";

type HomeComponentProps = {
	userLoggedIn: boolean;
};

const Home: React.FC<HomeComponentProps> = ({ userLoggedIn }) => {
	interface FeatureData {
		title: string;
		description: string;
	}

	const features: FeatureData[] = [
		{
			title: "Discover Unique Profiles",
			description:
				"Explore detailed user profiles to find the perfect gaming partner. View interests, roles, rank, and more to ensure the best match.",
		},
		{
			title: "Send Game Invites",
			description:
				"Easily send game invites to potential partners directly through the app. Start playing your favorite games with new friends in just a few clicks.",
		},
		{
			title: "Add Gaming Friends",
			description:
				"Expand your gaming network by adding friends. Keep track of your favorite players and quickly team up for future games.",
		},
		{
			title: "Advanced Search Filters",
			description:
				"Utilize advanced search filters to find gamers who match your play style, preferred games, and skill level. Get matched with the right players every time.",
		},
		{
			title: "Customizable Profiles",
			description:
				"Personalize your profile with avatars, game stats, and bio information. Stand out to potential partners and showcase your gaming prowess.",
		},
	];

	return (
		<div className="flex flex-col min-h-screen bg-gray-900 text-white py-10 px-5">
			<div className="h-1/3 text-center flex-none">
				<h1 className="text-5xl font-bold mb-10">
					Welcome to{" "}
					<span className="font-bold text-gradient bg-gradient-to-r from-pink-500 to-blue-500">
						FINDUO
					</span>
				</h1>
			</div>
			<div className="flex-grow max-h-[50vh] flex overflow-x-hidden">
				<div className="flex animate-marquee">
					{features.map((feature, index) => (
						<div
							key={index}
							className="max-h-[50vh] min-w-[25vw] relative group bg-gray-800 p-x-40 p-20 m-5 rounded-lg shadow-lg overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-10 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
							<h2 className="text-2xl font-bold mb-4 z-10">{feature.title}</h2>
							<p className="text-sm z-10">{feature.description}</p>
						</div>
					))}
					{features.map((feature, index) => (
						<div
							key={index}
							className="max-h-[50vh] min-w-[25vw]  relative group bg-gray-800 p-x-40 p-20 m-5 rounded-lg shadow-lg overflow-hidden"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-10 group-hover:opacity-50 transition-opacity duration-500 ease-in-out"></div>
							<h2 className="text-2xl font-bold mb-4 z-10">{feature.title}</h2>
							<p className="text-sm z-10">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
			<div className="text-center mt-10">
				<Link
					to={userLoggedIn ? "/feed" : "/login"}
					className="text-lg bg-gradient-to-r from-pink-500 to-blue-500 px-5 py-2 rounded-lg hover:from-pink-600 hover:to-blue-600"
				>
					Get Started
				</Link>
			</div>
		</div>
	);
};

export default Home;
