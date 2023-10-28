import type { IUser } from '../provider/UserProvider.tsx';
import axios from 'axios';

interface ILoginResponse {
    token: string;
}

const login = async (email: string, password: string) => {
    return await axios.post<ILoginResponse>('/auth/login', { email, password });
};

const register = async (email: string, username: string, password: string) => {
    return await axios.post<IUser>('/auth/register', { email, username, password });
};

export default { login, register };
