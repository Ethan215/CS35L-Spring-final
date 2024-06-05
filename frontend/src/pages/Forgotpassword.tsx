import React, { useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
	// Create a ref to store the email input element
	const emailRef = useRef<HTMLInputElement>(null);
	// Create a state variable to store any error message
	const [error, setError] = useState<string>("");
	// Create a state variable to store whether or not the form is loading
	const [loading, setLoading] = useState<boolean>(false);

	// Function to handle form submission
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(false);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 mb-10">
        FINDUO
      </h1>
			<div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
					Forgot Password
				</h2>
				{error && (
					<div className="mb-4 text-sm text-red-500 text-center">{error}</div>
				)}
				<form onSubmit={handleSubmit} className="space-y-6">
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
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-semibold rounded-md hover:from-purple-500 hover:via-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
					>
						Reset Password
					</button>
				</form>
				<div className="mt-6 text-sm text-center">
					<Link
						to="/login"
						className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
					>
						Back to Log In
					</Link>
				</div>
			</div>
		</div>
	);
}
