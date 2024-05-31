import React, { useState, useEffect } from 'react';
import { ProfileData, GameData } from '@common/profile';

const Feed: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [userData, setUserData] = useState<ProfileData[]>([]); 

  const handleGameClick = (gameTitle: string) => {
    setSelectedGame(selectedGame === gameTitle ? null : gameTitle);
  };

  const handleContactClick = (userId: string) => {
    console.log(`Contacting user with ID ${userId}`);
    // Implement contact logic here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profiles');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUserData(data.profiles); // Setting only the profiles array to userData state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Extracting unique game titles
  const uniqueGameTitles = Array.from(
    new Set(userData.flatMap((user: ProfileData) => user.games.map((game: GameData) => game.title)))
  );

  return (
    <div className="flex">
      <div className="w-1/4" style={{ width: '60vw', height: '50vh', padding: '10px' }}>
        {uniqueGameTitles.map((gameTitle, index) => (
          <div
            key={index}
            onClick={() => handleGameClick(gameTitle)}
            className={`p-10 border-b cursor-pointer ${selectedGame === gameTitle ? 'bg-black-200' : 'bg-gray-600'}`}
          >
            <h4 className="font-bold">{gameTitle}</h4>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-10" style={{ backgroundImage: `url(https://displays.riotgames.com/static/content-original-championillustrations-group-slashes-9828cf13cecf88fb9f21ee17afa6874e.jpg)`, color: '#fff', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
        {selectedGame !== null && (
          <div>
            <h2 className="font-bold text-3xl">Players for {selectedGame}</h2>
            {userData.map((user: ProfileData) => (
              user.games.filter((game: GameData) => game.title === selectedGame).map((game: GameData) => (
                <div key={game._id} className="rounded-lg bg-gray-800 bg-opacity-75 p-2 m-6">
                  <div className="flex justify-center items-center mb-4">
                    <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h1 className="text-l font-bold">{user.username}</h1>
                      <p className="text-white">{user.bio}</p>
                      <p className="text-white">Region: {user.region}</p>
                      <p className="text-white">Language: {user.language}</p>
                      <p className="text-white">Stars: {user.stars}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <img src={user.region} alt={`GIF for ${user.username}`} />
                    <div className="w-1/2">
                      <div className="bg-gray-800 p-0.1 m-3 border border-gray-200 rounded">
                        <h2 className="text-xl font-bold">{game.title}</h2>
                        {game.rank && <p className="text-white-700">Rank: {game.rank}</p>}
                        <p className="text-white-700">Tags: {game.tags.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={() => handleContactClick(user._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Contact Me
                    </button>
                  </div>
                </div>
              ))
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
