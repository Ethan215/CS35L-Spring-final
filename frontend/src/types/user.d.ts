import { UserData } from '@common/user'

export type UserContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
};
