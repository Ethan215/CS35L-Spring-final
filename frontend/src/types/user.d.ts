import { UserData } from "@common/user";

export interface UserContextType {
    user: UserData | null;
    setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
    likeProfile: (profileId: string) => Promise<void>;
    unlikeProfile: (profileId: string) => Promise<void>;
    getLikedProfiles: () => Promise<void>;
}
