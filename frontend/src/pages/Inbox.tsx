import React, {useState} from 'react';

// use interface for type safety
interface Message {
    id: number;
    senderPic: string;
    title: string;
    body: string;
    fullBody: string;
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
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    title: 'Friend Request from John',
    body: 'Hi, I would like to add you as a friend.',
    fullBody: 'Hi, I would like to add you as a friend on this platform so we can continue playing in the future.'
  },
  {
    id: 2,
    senderPic: 'https://i.pinimg.com/originals/b5/91/2c/b5912c28fd86525fa96d03bb78e020af.jpg',
    title: 'Game Invite from Jane',
    body: 'Join my game party!',
    fullBody: 'Join my party. We are going to grind ranked on Leauge of Legends!'
  },
  {
    id: 3,
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    title: 'Friend Request from Bob',
    body: 'Hi, I would like to add you as a friend.',
    fullBody: 'Hi, I would like to add you as a friend on this platform so we can continue playing in the future.'
  },
  {
    id: 4,
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    title: 'Friend Request from Joe',
    body: 'Hi, I would like to add you as a friend.',
    fullBody: 'Hi, I would like to add you as a friend on this platform so we can continue playing in the future.'
  },
  {
    id: 5,
    senderPic: 'https://i.pinimg.com/originals/b5/91/2c/b5912c28fd86525fa96d03bb78e020af.jpg',
    title: 'Friend Request from Ava',
    body: 'Hi, I would like to add you as a friend.',
    fullBody: 'Hi, I would like to add you as a friend on this platform so we can continue playing in the future.'
  },
];

// left panel contains a list of messageBox components
// displays pfp, message subject, brief message
// when a messageBox component is clicked, onClick set to true and updates the selected message in Inbox component
const MessageBox: React.FC<MessageBox> = ({ message, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-8 border-b cursor-pointer ${isSelected ? 'bg-gray-200' : 'bg-white'}`}>
      <img
        src={message.senderPic}
        alt="Sender Profile Picture"
        className="w-14 h-14 rounded-full mb-4"
      />
      <h4 className="font-bold">{message.title}</h4>
      <p>{message.body}</p>
    </div>
  );
};
  
  // main component that manages state of the selected message
  // displays full pfp, full message, message subject (game invite, friend request, etc)
  const Inbox: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState<Message>(messages[0]);
    return (
      <div className="flex">
        <div className="w-3/12 border-r border-gray-300">
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              onClick={() => setSelectedMessage(message)}
              isSelected={selectedMessage.id === message.id}
            />
          ))}
        </div>
        <div className="w-2/3 p-5">
          <h2 className="font-bold text-3xl">{selectedMessage.title}</h2>
          <img src={selectedMessage.senderPic} alt="Sender Profile Picture" className="w-24 h-24 rounded-full mb-5 mt-5" />
          <p>{selectedMessage.fullBody}</p>
        </div>
      </div>
    );
  };
  
  export default Inbox;
