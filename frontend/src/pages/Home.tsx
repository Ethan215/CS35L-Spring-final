import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
	return (
		<div>
			<h1>This is the homepage</h1>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link to="/profile" className="text-blue-500 underline">Go to profile</Link>
		</div>
	);
};

export default Home;
