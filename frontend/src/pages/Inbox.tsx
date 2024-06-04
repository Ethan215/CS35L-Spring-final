import React, { useEffect, useState } from "react";
import { ProfileData } from "@common/profile";
import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";

// use interface for type safety
interface Message {
	id: string;
	profilePic: string;
	title: string;
	body: string;
}

interface MessageBox {
	message: Message;
	onClick: () => void;
	isSelected: boolean;
}

// dummy messages

// left panel contains a list of messageBox components
// displays pfp, message subject, brief message
// when a messageBox component is clicked, onClick set to true and updates the selected message in Inbox component
const MessageBox: React.FC<MessageBox> = ({ message, onClick, isSelected }) => {
	return (
		<div
			onClick={onClick}
			className={`relative p-8 border-b-2 cursor-pointer text-white bg-slate-900 ${
				isSelected ? "border-slate-500" : "border-transparent"
			}`}
		>
			<div
				className={`absolute inset-0 bg-gradient-to-b from-slate-900 via-pink-500 to-blue-500 transition-opacity duration-1000 ease-out ${
					isSelected ? "opacity-20" : "opacity-0"
				}`}
			></div>
			<div className="relative">
				<img
					src={message.profilePic}
					alt="Sender Profile Picture"
					className="w-14 h-14 rounded-full mb-4 bg-gray-500"
					onError={(e) => {
						(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
						(e.target as HTMLImageElement).src = defaultProfileIcon;
					}}
				/>
				<h4 className="font-bold">{message.title}</h4>
				<p className="text-sm line-clamp-2 overflow-hidden">{message.body}</p>
			</div>
		</div>
	);
};

const Inbox: React.FC = () => {
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

	const [friendRequests, setFriendRequests] = useState<ProfileData[]>([]);

	// get profiles of incoming Friend Requests
	useEffect(() => {
		const fetchFriendRequests = async () => {
			const response = await fetch("/api/friends/requests");
			// get array of profiles from response
			const data: ProfileData[] = await response.json();

			setFriendRequests(data);
		};

		fetchFriendRequests();
	}, []);

	return (
		<div className="flex bg-gray-900 text-white min-h-screen">
			<div className="w-3/12 border-r border-gray-700">
				{friendRequests.length === 0 && (
					<div className="pt-10">
						<h1 className="text-3xl font-bold text-center">No New Messages</h1>
					</div>
				)}
				{friendRequests.map((friendRequest) => {
					const message: Message = {
						id: friendRequest.userId,
						profilePic: friendRequest.profilePicture,
						title: `Friend Request from ${friendRequest.username}`,
						body: `${friendRequest.username} wants to be your friend!`,
					};

					return (
						<MessageBox
							key={friendRequest.username}
							message={message}
							onClick={() => setSelectedMessage(message)}
							isSelected={
								selectedMessage !== null &&
								selectedMessage !== undefined &&
								selectedMessage!.id === message.id
							}
						/>
					);
				})}
			</div>

			{selectedMessage && (
				<div className="w-2/3 p-5">
					<h2 className="font-bold text-3xl">{selectedMessage.title}</h2>
					<img
						src={selectedMessage.profilePic}
						alt="Sender Profile Picture"
						className="w-24 h-24 rounded-full mb-5 mt-5, bg-gray-100"
						onError={(e) => {
							(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
							(e.target as HTMLImageElement).src = defaultProfileIcon;
						}}
					/>
					<p>{selectedMessage.body}</p>
				</div>
			)}
		</div>
	);
};

export default Inbox;
