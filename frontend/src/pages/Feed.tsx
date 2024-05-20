import React, { useState } from 'react';

const dummyData = [
  {
    id: 1,
    profilePicture: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4aaf881bb90b509f/5db05fde6e8b0c6d038c5cae/RiotX_ChampionList_leblanc.jpg?quality=90&width=250",
    name: "John Doe",
    bio: "Passionate gamer looking for friendly casual and competitive gamers, enjoy movies idk etc",
    region: "North America",
    language: "English",
    stars: 25,
    gifUrl: "https://media.tenor.com/0l_1tb59nYcAAAAj/ashe-league-of-legends.gif",
    games: [
      {
        title: "Overwatch",
        rank: "Diamond",
        tags: ["Support", "Tank", "Competitive"]
      },
      {
        title: "Minecraft",
        rank: null,
        tags: ["Building", "Bed Wars"]
      },
      {
        title: "League of Legends",
        rank: "Gold III",
        tags: ["Casual", "Jungle"]
      }
    ]
  },
  {
    id: 2,
    profilePicture: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt943aae038e2dee98/5db05fa8e9effa6ba5295f91/RiotX_ChampionList_ashe.jpg?quality=90&width=250",
    name: "Jane Smith",
    bio: "Gamer and movie enthusiast. Love to play RPG games and watch action movies.",
    region: "Europe",
    language: "English",
    stars: 30,
    gifUrl: "https://media.tenor.com/HpHR3-XT6soAAAAj/rai-mei-octopath.gif",
    games: [
      {
        title: "World of Warcraft",
        rank: "Platinum",
        tags: ["MMORPG", "Raids", "PvP"]
      },
      {
        title: "The Witcher 3",
        rank: null,
        tags: ["RPG", "Story-rich"]
      },
      {
        title: "Fortnite",
        rank: "Gold II",
        tags: ["Battle Royale", "Building"]
      }
    ]
  },

  {
    id: 3,
    profilePicture: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt943aae038e2dee98/5db05fa8e9effa6ba5295f91/RiotX_ChampionList_ashe.jpg?quality=90&width=250",
    name: "Jane Smith",
    bio: "Gamer and movie enthusiast. Love to play RPG games and watch action movies.",
    region: "Europe",
    language: "English",
    stars: 30,
    games: [
      {
        title: "World of Warcraft",
        rank: "Platinum",
        tags: ["MMORPG", "Raids", "PvP"]
      },
      {
        title: "The Witcher 3",
        rank: null,
        tags: ["RPG", "Story-rich"]
      },
      {
        title: "Fortnite",
        rank: "Gold II",
        tags: ["Battle Royale", "Building"]
      }
    ]
  }
];

//Main component
const Feed: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameClick = (gameTitle: string) => {
    setSelectedGame(selectedGame === gameTitle ? null : gameTitle);
  };

  const handleContactClick = (id: number) => {
    // Implement contact logic here
    console.log(`Contacting user with ID ${id}`);
  };

  return (
    <div className="flex">

      <div className="w-1/4" style={{ width: '60vw', height: '50h', padding: '10px' }}>
        {dummyData.reduce((games, user) => {
          user.games.forEach((game) => {
            if (!games.includes(game.title)) {
              games.push(game.title);
            }
          });
          return games;
        }, [] as string[]).map((gameTitle, index) => (
          <div
            key={index}
            onClick={() => handleGameClick(gameTitle)}
            className={`p-10 border-b cursor-pointer ${selectedGame === gameTitle ? 'bg-black-200' : 'bg-gray-800'}`}
          >
            <h4 className="font-bold">{gameTitle}</h4>
          </div>
        ))}
      </div>

      <div className="w-2/3 p-10" style={{ backgroundImage: `url(https://displays.riotgames.com/static/content-original-championillustrations-group-slashes-9828cf13cecf88fb9f21ee17afa6874e.jpg)`, color: '#fff', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
        {selectedGame !== null && (
          <div>
            <h2 className="font-bold text-3xl">Players for {selectedGame}</h2>
            {dummyData
              .filter(user => user.games.some(game => game.title === selectedGame))
              .map((user, index) => (
                <div key={index} className="rounded-lg bg-gray-800 bg-opacity-75 p-2 m-6">
                  <div className="flex justify-center items-center mb-4">
                    <img src={user.profilePicture} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h1 className="text-l font-bold">{user.name}</h1>
                      <p className="text-white">{user.bio}</p>
                      <p className="text-white">Region: {user.region}</p>
                      <p className="text-white">Language: {user.language}</p>
                      <p className="text-white">Stars: {user.stars}</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <img src={user.gifUrl} alt={`GIF for ${user.name}`} />
                    <div className="w-1/2">
                      {user.games.filter(game => game.title === selectedGame).map((game, index) => (
                        <div key={index} className="bg-gray-800 p-0.1 m-3 border border-gray-200 rounded">
                          <h2 className="text-xl font-bold">{game.title}</h2>
                          {game.rank && <p className="text-white-700">Rank: {game.rank}</p>}
                          <p className="text-white-700">Tags: {game.tags.join(", ")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button onClick={() => handleContactClick(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Contact Me
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Feed;
