import { createContext, FC, ReactNode, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import auth from '../api/auth.ts';

export const UserContext = createContext<IUserProvider | null>(null);

export interface IUser {
    username: string;
    email: string;
}

interface IUserProvider {
    user: IUser | null;
    error: string | null;
    login(login: string, password: string): Promise<void>;
    register(email: string, username: string, password: string): Promise<void>;
    logout(): void;
    loadLocalStorage(): void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserProvider['user']>(null);
    const [error, setError] = useState<IUserProvider['error']>(null);

    const loadLocalStorage = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode<IUser & JwtPayload>(token);

            // if decoded.exp is less than Date.now() / 1000 then token is expired
            if (decoded.exp && decoded.exp < Date.now() / 1000) {
                localStorage.removeItem('token');
                return;
            }

            setUser(decoded);
        }
    };

    const login = async (email: string, password: string) => {
        const { status, data } = await auth.login(email, password);

        if (status == 200) {
            localStorage.setItem('token', data.token);
            setUser(jwtDecode<IUser>(data.token));
        } else {
            setError('auth.login.error');
        }
    };

    const register = async (email: string, username: string, password: string) => {
        const { status, data } = await auth.register(email, username, password);

        if (status == 200) {
            setUser(data);
        } else {
            setError('auth.login.error');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, error, login, register, logout, loadLocalStorage }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
