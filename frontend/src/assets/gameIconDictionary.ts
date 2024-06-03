import MinecraftIcon from "./icons/Minecraft.png";
import LeagueIcon from "./icons/League of Legends.png";
import OverwatchIcon from "./icons/Overwatch.png"

interface GameIconDictionary {
	[key: string]: string;
}

export const gameIconDictionary: GameIconDictionary = {
	Minecraft: MinecraftIcon,
	"League of Legends": LeagueIcon,
	Overwatch: OverwatchIcon
};
