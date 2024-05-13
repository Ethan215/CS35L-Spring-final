import React from 'react';

const Feed = () => {
  // Sample dummy data for multiple users
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
    // Add more users here as needed
  ];

  // Function to handle clicking the "Contact Me" button
  const handleContactClick = (userId) => {
    // Logic to handle adding the user as a friend
    console.log(`Add friend logic for user with ID ${userId} goes here...`);
  };

  return (
    <div className="relative" style={{ backgroundImage: `url(https://displays.riotgames.com/static/content-original-championillustrations-group-slashes-9828cf13cecf88fb9f21ee17afa6874e.jpg)`, color: '#fff', height: '1000vh', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
      
      <div className="container mx-auto px-4">
        {dummyData.map((user) => (
          <div key={user.id} className="rounded-lg bg-gray-800 bg-opacity-75 p-2 m-6">
            
            {/* Adjusted position for the embedded content */}
            
              
            {/* User Information */}
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

            {/* Central Column for Media Feed and GIF*/}

            <div className="flex justify-between">
              {/* <div className="mt-20 ">
                  <iframe src="https://giphy.com/embed/ixlcvb71eZYyBmWCNy" width="300" height="120" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                  <p><a href="https://giphy.com/gifs/leagueoflegends-ixlcvb71eZYyBmWCNy"></a></p>
              </div>

              <div className="mt-20 ">
                <img src="https://media.tenor.com/0l_1tb59nYcAAAAj/ashe-league-of-legends.gif" alt="Your GIF" />
              </div> */}

              


              
              <img src={user.gifUrl} alt={`GIF for ${user.name}`} />
              <div className="w-1/2">
             
                {user.games.map((game, index) => (
                  <div key={index} className="bg-gray-800 p-0.1 m-3 border border-gray-200 rounded">
                    <h2 className="text-xl font-bold">{game.title}</h2>
                    {game.rank && <p className="text-white-700">Rank: {game.rank}</p>}
                    <p className="text-white-700">Tags: {game.tags.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Me Button */}
            <div className="flex justify-center mt-4">
              <button onClick={() => handleContactClick(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Contact Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
