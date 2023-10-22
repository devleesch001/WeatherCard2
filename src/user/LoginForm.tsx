import { FC, useContext, useState } from 'react';
import { UserContext } from '../provider/UserProvider.tsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import validator from '../utils/validator.ts';

const LoginForm: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const userContext = useContext(UserContext);

    const [isValidate, setIsValidate] = useState<boolean>(false);

    const validPassword = (password: string) => {
        if (password.length < 6) {
            return t('app.auth.errors.password.toShort');
        } else if (password.length > 64) {
            return t('app.auth.errors.password.toLong');
        }
        return '';
    };

    const submitForm = () => {
        setIsValidate(true);
        userContext
            ?.login(username, password)
            .then(() => {
                // todo display to user is ok
                console.log('ok');
            })
            .catch(() => {
                // todo display error
                console.log('error');
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
                    {t('app.auth.login.action')}
                </Typography>
                <TextField
                    error={isValidate && !validator.validEmail(username)}
                    label={t('app.auth.email')}
                    type="email"
                    helperText={isValidate && !validator.validEmail(username) && t('app.auth.errors.email')}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        handleChange();
                    }}
                />
                <TextField
                    error={isValidate && validPassword(password).length > 0}
                    helperText={isValidate && validPassword(password)}
                    label={t('app.auth.password')}
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                        handleChange();
                    }}
                />
                <Button variant="contained" onClick={submitForm}>
                    {t('app.auth.login.action')}
                </Button>
            </Box>
        </>
    );
};

export default LoginForm;
