import type { IUser } from '../provider/UserProvider.tsx';
import axios from 'axios';

const login = async (user: string, password: string) => {
    return await axios.post<IUser>('/login', { user, password });
};

export default { login };
