import { FC, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../provider/UserProvider.tsx';

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const userContext = useContext(UserContext);

    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userContext
            ?.login(username, password)
            .then(() => {
                console.log('ok');
            })
            .catch(() => {
                console.log('error');
            });
    };
    // const handleChange = () => {};

    return (
        <div>
            {userContext?.user && <p>{userContext.user.name}</p>}
            {userContext?.error && <p>{userContext.error}</p>}
            <form onSubmit={submitForm}>
                <label>
                    username
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    password
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button>Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;
