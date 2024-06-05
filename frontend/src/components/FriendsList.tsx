import React from 'react';
import { Friend } from '../../../common/friend';

const friends: Friend[] = [
  {
    name: 'John',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    bio: 'DM me if you want to game!'
  },
  {
    name: 'Jane',
    avatar: 'https://i.pinimg.com/originals/b5/91/2c/b5912c28fd86525fa96d03bb78e020af.jpg',
    bio: 'LF duo in league, gold or above'
  },
  {
    name: 'Bob',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    bio: 'LF 1 more, valorant 5 stack.'
  },
  {
    name: 'Joe',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/025/337/669/small_2x/default-male-avatar-profile-icon-social-media-chatting-online-user-free-vector.jpg',
    bio: 'anyone want to play?'
  },
  {
    name: 'Ava',
    avatar: 'https://i.pinimg.com/originals/b5/91/2c/b5912c28fd86525fa96d03bb78e020af.jpg',
    bio: 'chilling'
  },
];

interface FriendBoxProps {
  friend: Friend;
}

const FriendBox: React.FC<FriendBoxProps> = ({ friend }) => {
  return (
    <div className="p-4 border-b cursor-pointer flex items-center">
      <img
        src={friend.avatar}
        alt={`${friend.name} Profile Picture`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h4 className="font-bold">{friend.name}</h4>
        <p>{friend.bio}</p>
      </div>
    </div>
  );
};

const FriendsList: React.FC = () => {
  return (
    <div className="w-full border-r border-gray-300">
      {friends.map((friend) => (
        <FriendBox friend={friend} />
      ))}
    </div>
  );
};

export default FriendsList;
