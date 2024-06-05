import { UserData } from "@common/user";
import { createContext, useState } from "react";
import { UserContextType } from "src/types/user";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<Partial<UserData> | null>(null);

	// Fetch the user's information when they log in and update the user state

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
