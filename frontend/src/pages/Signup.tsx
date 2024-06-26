import { useRef, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileData } from "@common/profile";

import React from "react";

export const Signup: React.FC = () => {
	// Declare the email, password, and password confirm input elements using the useRef hook
	const emailRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmRef = useRef<HTMLInputElement>(null);
	// Declare the error and loading state using the useState hook
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	// Function to handle form submission
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// If the passwords do not match, set the error state and return
		if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
			setError("Passwords do not match");
			return;
		}

		// check strength of password
		const password = passwordRef.current?.value;
		if (password && password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}
		if (password && !/\d/.test(password)) {
			setError("Password must contain a number");
			return;
		}
		if (password && !/[a-z]/.test(password)) {
			setError("Password must contain a lowercase letter");
			return;
		}
		if (password && !/[A-Z]/.test(password)) {
			setError("Password must contain an uppercase letter");
			return;
		}

		// send a signup request to the backend /api/user/signup
		const response = await fetch("/api/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: usernameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			}),
		});

		// If the response is not successful, set the error message and return
		if (!response.ok) {
			const data = await response.json();
			setError(data.error);
			setLoading(false);
			return;
		}

		// Log the user in
		const loginResponse = await fetch("/api/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: usernameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
			}),
		});
		if (!loginResponse.ok) {
			setError("Failed to login");
			setLoading(false);
			return;
		}

		const starterProfile: Partial<ProfileData> = {
			username: usernameRef.current!.value,
			profilePicture: "default_profile_icon.jpg",
			bio: "This user has not yet created a bio",
			region: "US-W",
			language: "English",
		};
		//post a empty profile page to the backend /api/profiles
		const profileResponse = await fetch("/api/profiles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(starterProfile),
		});
		if (!profileResponse.ok) {
			setError("Failed to create profile");
			setLoading(false);
			return;
		}

		setLoading(false);
		navigate("/edit-profile");
	}

	// Return the signup form
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
			<h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
				FINDUO
			</h1>
			<div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
					Sign Up
				</h2>
				{error && (
					<div className="mb-4 text-sm text-red-500 text-center">{error}</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="username"
							className="text-sm font-semibold text-gray-300"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							ref={usernameRef}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="text-sm font-semibold text-gray-300"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							ref={emailRef}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
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
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
						/>
					</div>
					<div>
						<label
							htmlFor="password-confirm"
							className="text-sm font-semibold text-gray-300"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="password-confirm"
							ref={passwordConfirmRef}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold rounded-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
					>
						Sign Up
					</button>
				</form>
				<div className="mt-6 text-sm text-center">
					<Link
						to="/login"
						className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
					>
						Already have an account? Log In
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
