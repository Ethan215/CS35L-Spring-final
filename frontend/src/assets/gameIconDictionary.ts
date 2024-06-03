import MinecraftIcon from "./icons/Minecraft.png";
import LeagueIcon from "./icons/League of Legends.png";

interface GameIconDictionary {
	[key: string]: string;
}

export const gameIconDictionary: GameIconDictionary = {
	Minecraft: MinecraftIcon,
    "League of Legends": LeagueIcon,
};
