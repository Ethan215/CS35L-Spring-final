import React from "react";
import { gameIconDictionary } from "../assets/gameIconDictionary";

const About: React.FC = () => {

	return (
		//background color
		<div className="flex flex-col items-center min-h-screen w-full bg-gray-900 text-white">
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
					<p className="max-w-xl text-lg">Welcome to Finduo, an online tool created with the purpose of helping the gaming community connect with each other based off of shared interests and goals.
						Find a new friend from across the world, or from a few cities over for when you're dedicated to hopping on the same server. Our goal is to streamline the
						process of finding friends to play your favorite games with. Through Finduo, building lasting connections with other like-minded gamers has never been easier.
						Hone your gameplay skills with your ideal partner by using our advanced search filters, reach out to a potential new friend by sending a party code through
						our messaging system, and don't forget to check your own inbox for invitations waiting on a response!
					</p>
			</div>
			</div>
		</div>
	);
};


export default About;
