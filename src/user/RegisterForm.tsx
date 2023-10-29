import { FC, useContext, useState } from 'react';
import { UserContext } from '../provider/UserProvider.tsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import validator from '../utils/validator.ts';

const validUsername = (username: string) => {
    if (username.length < 3) {
        return t('app.auth.errors.username.toShort');
    } else if (username.length > 64) {
        return t('app.auth.errors.username.toLong');
    }

    return '';
};

const validPassword = (password: string) => {
    if (password.length < 6) {
        return t('app.auth.errors.password.toShort');
    } else if (password.length > 64) {
        return t('app.auth.errors.password.toLong');
    }
    return '';
};

const validConfirmPassword = (password: string, confirmPassword: string) => {
    return password == confirmPassword ? '' : t('app.auth.errors.confirmPassword.inEqual');
};

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const { onSuccess } = props;

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const userContext = useContext(UserContext);

    const [isValidate, setIsValidate] = useState<boolean>(false);

    const submitForm = () => {
        setIsValidate(true);
        userContext
            ?.login(username, password)
            .then(() => {
                onSuccess && onSuccess();
                console.log('todo display to user register is ok');
            })
            .catch(() => {
                // todo display error
                console.log('todo display error on submit form');
            });
    };
    const handleChange = () => {
        setIsValidate(false);
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'column',
                }}
                autoComplete="off"
            >
                <Typography variant="h5" component="h1">
                    {t('app.auth.register.action')}
                </Typography>
                <TextField
                    type="email"
                    label={t('app.auth.email')}
                    required
                    helperText={isValidate && !validator.validEmail(email) && t('app.auth.errors.email')}
                    error={isValidate && !validator.validEmail(email)}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        handleChange();
                    }}
                />
                <TextField
                    type="text"
                    label={t('app.auth.username')}
                    required
                    helperText={isValidate && !validUsername(username) && t('app.auth.errors.email')}
                    error={isValidate && !validUsername(email)}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        handleChange();
                    }}
                />
                <TextField
                    type="password"
                    label={t('app.auth.password')}
                    required
                    error={isValidate && validPassword(password).length > 0}
                    helperText={isValidate && validPassword(password)}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleChange();
                    }}
                />
                <TextField
                    type="password"
                    required
                    label={t('app.auth.confirmPassword')}
                    error={isValidate && validConfirmPassword(password, confirmPassword).length > 0}
                    helperText={isValidate && validConfirmPassword(password, confirmPassword)}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        handleChange();
                    }}
                />
                <Button variant="contained" onClick={submitForm}>
                    {t('app.auth.register.action')}
                </Button>
            </Box>
        </>
    );
};

export default LoginForm;
