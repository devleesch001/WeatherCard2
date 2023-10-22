import { createContext, FC, ReactNode, useState } from 'react';
import auth from '../api/auth.ts';

export const UserContext = createContext<IUserProvider | null>(null);

export interface IUser {
    name: string;
    email: string;
}

interface IUserProvider {
    user: IUser | null;
    error: string | null;
    login(login: string, password: string): Promise<void>;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserProvider['user']>(null);
    const [error, setError] = useState<IUserProvider['error']>(null);

    const login = async (login: string, password: string) => {
        const { status, data } = await auth.login(login, password);

        if (status == 200) {
            setUser(data);
        } else {
            setError('auth.login.error');
        }
    };

    return <UserContext.Provider value={{ user, error, login }}>{children}</UserContext.Provider>;
};

export default UserProvider;
