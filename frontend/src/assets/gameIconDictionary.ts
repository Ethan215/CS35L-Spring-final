import MinecraftIcon from "../../public/assets/icons/Minecraft.png";
import LeagueIcon from "../../public/assets/icons/League of Legends.png";

interface GameIconDictionary {
	[key: string]: string;
}

export const gameIconDictionary: GameIconDictionary = {
	Minecraft: MinecraftIcon,
    "League of Legends": LeagueIcon,
};
