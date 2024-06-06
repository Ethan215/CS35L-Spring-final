import React, { useEffect, useState } from "react";
import { ProfileData } from "@common/profile";
import { MessageData } from "@common/message";
import defaultProfileIcon from "../assets/icons/defaultProfileIcon.jpg";
import { useNavigate } from "react-router-dom";

interface Action {
	name: string;
	perform: () => void;
}

interface Message {
	id: number;
	senderId: string;
	profilePic: string;
	title: string;
	body: string;
	actions: Action[];
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
					src={message.profilePic || defaultProfileIcon}
					alt="Sender Profile Picture"
					onError={(e) => {
						(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
						(e.target as HTMLImageElement).src = defaultProfileIcon;
					}}
					className="w-14 h-14 rounded-full mb-4 bg-gray-500"
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
	const [messages, setMessages] = useState<MessageData[]>([]);

	const navigate = useNavigate();

	const fetchFriendRequests = async () => {
		const response = await fetch("/api/friends/requests");
		// get array of profiles from response
		const data: ProfileData[] = await response.json();

		setFriendRequests(data);
	};

	const fetchMessages = async () => {
		const response = await fetch("/api/messages");
		const data: MessageData[] = await response.json();

		setMessages(data);
	};

	// get profiles of incoming Friend Requests and incoming Messages
	useEffect(() => {
		fetchFriendRequests();
		fetchMessages();
	}, []);

	const handleAcceptRequest = async (userId: string) => {
		const response = await fetch(`/api/friends/accept/${userId}`, {
			method: "PATCH",
		});
		const data = await response.json();
		fetchFriendRequests();
	};

	const handleDeclineRequest = async (userId: string) => {
		const response = await fetch(`/api/friends/decline/${userId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		fetchFriendRequests();
	};

	const handleReply = (senderId: string) => {
		navigate(`/send-message/${senderId}`);
	};

	const handleDeleteMsg = async (messageId: string) => {
		const response = await fetch(`/api/messages/${messageId}`, {
			method: "DELETE",
		});
		const data = await response.json();
		fetchMessages();
		console.log(data);
	};

	let unusedMessageIdx = 0;

	return (
		<div className="flex bg-gray-900 text-white min-h-screen">
			<div className="w-3/12 border-r border-gray-700">
				{friendRequests.length === 0 && messages.length == 0 && (
					<div className="pt-10">
						<h1 className="text-3xl font-bold text-center">No New Messages</h1>
					</div>
				)}
				{friendRequests.map((friendRequest) => {
					const message: Message = {
						id: unusedMessageIdx,
						senderId: friendRequest.userId,
						profilePic: friendRequest.profilePicture,
						title: `Friend Request from ${friendRequest.username}`,
						body: `${friendRequest.username} wants to be your friend!`,
						actions: [
							{
								name: "Accept",
								perform: () => handleAcceptRequest(friendRequest.userId),
							},
							{
								name: "Decline",
								perform: () => handleDeclineRequest(friendRequest.userId),
							},
						],
					};

					unusedMessageIdx++;

					return (
						<MessageBox
							key={message.id}
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

				{messages.map((messageData) => {
					const message: Message = {
						id: unusedMessageIdx,
						senderId: messageData.senderId,
						profilePic: defaultProfileIcon,
						title: messageData.title,
						body: messageData.body,
						actions: [
							{
								name: "Reply",
								perform: () => handleReply(messageData.senderId),
							},
							{
								name: "Delete",
								perform: () => handleDeleteMsg(messageData._id!),
							},
						],
					};

					unusedMessageIdx++;

					return (
						<MessageBox
							key={message.id}
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
						src={selectedMessage.profilePic || defaultProfileIcon}
						alt="Sender Profile Picture"
						onError={(e) => {
							(e.target as HTMLImageElement).onerror = null; // Prevents infinite looping in case default image also fails to load
							(e.target as HTMLImageElement).src = defaultProfileIcon;
						}}
						className="w-24 h-24 rounded-full mb-5 mt-5, bg-gray-100"
					/>
					<p>{selectedMessage.body}</p>
					<div className="flex flex-row space-x-4 mt-5">
						{selectedMessage.actions.map((action) => (
							<button
								key={action.name}
								onClick={() => {
									action.perform;
									setSelectedMessage(null);
								}}
								className="font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 text-white hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-slate-900 focus:ring-opacity-50"
							>
								{action.name}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Inbox;
