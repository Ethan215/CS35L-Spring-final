import { UserData } from '@common/user'

export type UserContextType = {
    user: Partial<UserData> | null;
    setUser: (user: Partial<UserData> | null) => void;
};
