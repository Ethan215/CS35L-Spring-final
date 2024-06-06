import MinecraftIcon from "./icons/Minecraft.png";
import LeagueIcon from "./icons/League of Legends.png";
import OverwatchIcon from "./icons/Overwatch.png";
import AboutIcon from "./icons/playing.jpeg";
import ValorantIcon from "./icons/valorant.png";
import RainbowSixIcon from "./icons/Rainbow Six.png";
import CounterStrikeIcon from "./icons/Counter Strike.png";
import ApexIcon from "./icons/Apex Legends.png";

interface GameIconDictionary {
	[key: string]: string;
}

export const gameIconDictionary: GameIconDictionary = {
	Minecraft: MinecraftIcon,
	"League of Legends": LeagueIcon,
	Overwatch: OverwatchIcon,
	About: AboutIcon,
	Valorant: ValorantIcon,
	"Rainbow Six": RainbowSixIcon,
	"Counter Strike": CounterStrikeIcon,
	"Apex Legends": ApexIcon
};
