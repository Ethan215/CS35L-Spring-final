import React from "react";
import { Link } from "react-router-dom";

// Define the type of props received by the Navbar component.
interface NavbarProps {
	// handleLogout is a function type with no arguments and no return value.
	handleLogout: () => void;
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({ handleLogout }) => {
	return (
		<header className="sticky top-0 w-full z-50">
			<nav className="relative bg-gray-800 p-4 after:border-gradient">
				<div className="flex justify-between items-center">
					<div className="text-white">
						<Link
							to="/"
							className="text-2xl font-bold text-gradient bg-gradient-to-r from-pink-500 to-blue-500"
						>
							FINDUO
						</Link>
					</div>
					<div className="flex space-x-5">
						<Link to="/about" className="text-white hover:text-gray-400">
							About
						</Link>
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
						<button
							onClick={handleLogout}
							className="text-white hover:text-gray-400"
						>
							Logout
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
