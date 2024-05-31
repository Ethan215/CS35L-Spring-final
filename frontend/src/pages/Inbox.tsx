import React, { useState } from "react";

// use interface for type safety
interface Message {
	id: number;
	senderPic: string;
	title: string;
	body: string;
}

interface MessageBox {
	message: Message;
	onClick: () => void;
	isSelected: boolean;
}

// dummy messages
const messages = [
  {
    id: 1,
    senderPic: "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg",
    title: "Friend Request from John",
    body: "Hi, I would like to add you as a friend on this platform so we can continue playing in the future. Blah blah really long message here",
  },
  {
    id: 2,
    senderPic: "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg",
    title: "Game Invitation from Jane",
    body: "Hey, I'm inviting you to join our game tonight at 8pm. Hope to see you there!",
  },
  {
    id: 3,
    senderPic: "https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg",
    title: "New Message from Bob",
    body: "Hello, I saw your profile and I think we have similar interests in games. Would you like to team up for the next tournament?",
  },
  
];

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
					src={message.senderPic}
					alt="Sender Profile Picture"
					className="w-14 h-14 rounded-full mb-4"
				/>
				<h4 className="font-bold">{message.title}</h4>
				<p className="text-sm line-clamp-2 overflow-hidden">{message.body}</p>
			</div>
		</div>
	);
};

const Inbox: React.FC = () => {
	const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

	return (
		<div className="flex bg-gray-900 text-white min-h-screen">
			<div className="w-3/12 border-r border-gray-700">
				{messages.map((message) => (
					<MessageBox
						key={message.id}
						message={message}
						onClick={() => setSelectedMessage(message)}
						isSelected={(selectedMessage !== null && selectedMessage !== undefined) && selectedMessage!.id === message.id}
					/>
				))}
			</div>
      
			{selectedMessage && <div className="w-2/3 p-5">
				<h2 className="font-bold text-3xl">{selectedMessage.title}</h2>
				<img
					src={selectedMessage.senderPic}
					alt="Sender Profile Picture"
					className="w-24 h-24 rounded-full mb-5 mt-5"
				/>
				<p>{selectedMessage.body}</p>
			</div>}
		</div>
	);
};

export default Inbox;
