import React, { useRef, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// Define the LoginProps type
interface LoginProps {
	setUserLoggedIn: (loggedIn: boolean) => void;
}

// Define the Login component and pass in the LoginProps type.
const Login: React.FC<LoginProps> = ({ setUserLoggedIn }) => {
	// Use useRef to get a reference to the email and password input boxes.
	const usernameOrEmailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	//useState to set the initial values of error and loading.
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate(); // useNavigate hooks to get navigation functions

	const { setUser } = useContext(UserContext)!;

	//  Define the handleSubmit function, which is used to handle form submissions.
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault(); // Block the default submit behavior of the form

		// Get the values of the email and password fields
		const usernameOrEmail = usernameOrEmailRef.current?.value;
		const password = passwordRef.current?.value;

		// Determine if email and password are empty
		if (!usernameOrEmail || !password) {
			setError("Please fill in all fields");
			return;
		}

		// Set loading to true to simulate login logic.
		setLoading(true);
        
        // post a login request to backend /api/user/login
        
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: usernameOrEmail, email: usernameOrEmail, password }),
        });

        // If the response is not successful, set the error message and return
        if (!response.ok) {
            setLoading(false);
            setError("Failed to login");
        }
        else {
            setLoading(false);
            // update the login status and jump to the home page.
			
			const response = await fetch("/api/user/login");
			if (response.ok) {
				setUserLoggedIn(true);
				const data = await response.json();
				setUser({"_id": data.userId, "username": data.username, "email" : "", "password": "" });
            	setUserLoggedIn(true);
			}			
        }
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
        FINDUO
      </h1>
			<div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center text-transparent bg-clip-text from-purple-400 via-pink-500 to-red-500  mb-6">
					Login
				</h2>
				{error && (
					<div className="mb-4 text-sm text-red-500 text-center">{error}</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="text"
							className="text-sm font-semibold text-gray-300"
						>
							Username / Email
						</label>
						<input
							type="usernameOrEmail"
							id="usernameOrEmail"
							ref={usernameOrEmailRef}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring from-purple-400 via-pink-500 to-red-500 focus:border-transparent bg-gray-700 text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="text-sm font-semibold text-gray-300"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							ref={passwordRef}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring from-purple-400 via-pink-500 to-red-500  focus:border-transparent bg-gray-700 text-white"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  font-semibold rounded-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring focus:ring-offset-2"
					>
						Log In
					</button>
				</form>
				<div className="mt-6 text-sm text-center">
					<Link
						to="/forgot-password"
						className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  hover:from-pink-600 hover:to-blue-600"
					>
						Forgot Password?
					</Link>
					<br />
					<Link
						to="/signup"
						className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500  hover:from-pink-600 hover:to-blue-600"
					>
						Need an account? Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
