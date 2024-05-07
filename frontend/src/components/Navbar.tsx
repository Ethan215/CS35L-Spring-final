import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<header>
			<nav className="bg-gray-800 p-4">
				<div className="flex justify-between items-center">
					<div className="text-white">
						<Link
							to="/"
							className="text-2xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-blue-500"
						>
							FINDUO
						</Link>
					</div>
					<div className="flex space-x-4">
						<Link to="/" className="text-white hover:text-gray-400">
							Home
						</Link>
						<Link to="/profile" className="text-white hover:text-gray-400">
							Profile
						</Link>
						<Link to="/feed" className="text-white hover:text-gray-400">
							Feed
						</Link>
						<Link to="/inbox" className="text-white hover:text-gray-400">
							Inbox
						</Link>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
