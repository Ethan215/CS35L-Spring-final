import React, { useState, useEffect, useContext } from "react";
import { ProfileData, GameData } from "@common/profile";
import UserContext from "../contexts/UserContext";

const Feed: React.FC = () => {
  const { user, likeProfile, unlikeProfile } = useContext(UserContext)!;
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [userData, setUserData] = useState<ProfileData[]>([]);
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

  const handleGameClick = (gameTitle: string) => {
    setSelectedGame(gameTitle);
  };

  const handleContactClick = (userId: string) => {
    console.log(`Contacting user with ID ${userId}`);
  };

  const handleLikeClick = async (userId: string) => {
    if (likedProfiles.includes(userId)) {
      await unlikeProfile(userId);
      setLikedProfiles(likedProfiles.filter((id) => id !== userId));
    } else {
      await likeProfile(userId);
      setLikedProfiles([...likedProfiles, userId]);
    }
	console.log("Updated liked profiles:", likedProfiles); // 添加日志输出
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/profiles");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUserData(data.profiles);
		const likedResponse = await fetch("/api/user/liked-profiles");
        const likedData = await likedResponse.json();
        setLikedProfiles(likedData.likedProfiles.map((profile: ProfileData) => profile._id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const uniqueGameTitles = Array.from(
    new Set(
      userData.flatMap((user: ProfileData) =>
        user.games.map((game: GameData) => game.title)
      )
    )
  );

  useEffect(() => {
    if (uniqueGameTitles.length > 0 && !selectedGame) {
      setSelectedGame(uniqueGameTitles[0]);
    }
  }, [uniqueGameTitles]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-900">
      <div className="p-4">
        <div className="flex flex-row p-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-auto">
          {uniqueGameTitles.map((gameTitle, index) => (
            <div
              key={index}
              onClick={() => handleGameClick(gameTitle)}
              className={`relative p-10 cursor-pointer bg-gray-800 ${
                selectedGame === gameTitle ? "text-white" : "text-gray-100"
              }`}
            >
              <div
                className={`absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-b from-slate-500 to-slate-800 ${
                  selectedGame === gameTitle ? "opacity-30" : "opacity-0"
                }`}
              ></div>
              <div className="relative">
                <h4 className="font-bold">{gameTitle}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        {selectedGame && (
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white pb-6">
              Duos for{" "}
              <span className="relative inline-block pb-1.5">
                {selectedGame}
                <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></span>
              </span>
            </h2>
            {userData.map((user: ProfileData) =>
              user.games
                .filter((game: GameData) => game.title === selectedGame)
                .map((game: GameData) => (
                  <div key={game._id} className="relative flex flex-col text-gray-300">
                    <div className="relative group p-5 m-1 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-slate-300">
                      <div className="absolute inset-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-slate-900 via-fuchsia-900 to-cyan-500 opacity-0 group-hover:opacity-40"></div>
                      <div className="relative">
                        <div className="flex flex-row">
                          <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="w-24 h-24 rounded-full mr-4 bg-gray-300 flex-none"
                          />
                          <div className="flex-3">
                            <h1 className="text-xl font-bold text-white">{user.username}</h1>
                            <p className="text-sm mb-1">{user.bio}</p>
                            <p className="text-sm"><span className="font-bold">Region:</span> {user.region}</p>
                            <p className="text-sm"><span className="font-bold">Language:</span> {user.language}</p>
                            <p className="text-sm"><span className="font-bold">Stars:</span> {user.stars}</p>
                            <div className="mt-4">
                              <button
                                onClick={() => handleContactClick(user._id)}
                                className="font-bold py-2 px-4 rounded bg-gradient-to-r from-slate-700 via-gray-700 to-slate-700 text-white hover:from-pink-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 focus:ring-offset-slate-900 focus:ring-opacity-50"
                              >
                                Contact Me
                              </button>
                              <button onClick={() => handleLikeClick(user._id)} className="ml-2">
                                <svg
                                  className={`
                                    w-6 h-6 transition-colors duration-200 ${
                                      likedProfiles.includes(user._id) ? "text-yellow-400" : "text-gray-400"
                                    } hover:text-yellow-500`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M12 .587l3.668 7.431L23 9.584l-5.668 5.533L18.9 23 12 19.412 5.1 23l1.568-7.883L1 9.584l7.332-1.566L12 .587z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-end items-end mt-2 flex-1">
                            {game.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block bg-gradient-r from-slate-900 via-slate-700 to-slate-900 border-2 border-slate-400 rounded-full px-3 py-1 text-xs font-semibold text-slate-300 mr-2"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
