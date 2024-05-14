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
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg',
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
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg',
    title: 'Friend Request from Bob',
    body: 'Hi, I would like to add you as a friend.',
    fullBody: 'Hi, I would like to add you as a friend on this platform so we can continue playing in the future.'
  },
  {
    id: 4,
    senderPic: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg',
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
        style={{
          padding: '10px',
          borderBottom: '1px solid #eee',
          cursor: 'pointer',
          backgroundColor: isSelected ? '#f0f0f0' : '#fff'
        }}
      >
        <img src={message.senderPic} alt="Sender Profile Picture" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <h4>{message.title}</h4>
        <p>{message.body}</p>
      </div>
    );
  };
  
  // main component that manages state of the selected message
  // displays full pfp, full message, message subject (game invite, friend request, etc)
  const Inbox: React.FC = () => {
    const [selectedMessage, setSelectedMessage] = useState<Message>(messages[0]);
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              onClick={() => setSelectedMessage(message)}
              isSelected={selectedMessage.id === message.id}
            />
          ))}
        </div>
        <div style={{ width: '70%', padding: '20px' }}>
          <h2>{selectedMessage.title}</h2>
          <img src={selectedMessage.senderPic} alt="Sender Profile Picture" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p>{selectedMessage.fullBody}</p>
        </div>
      </div>
    );
  };
  
  export default Inbox;
