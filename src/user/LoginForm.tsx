import { FC, useContext, useState } from 'react';
import { UserContext } from '../provider/UserProvider.tsx';
import { Box, Button, TextField, Typography } from '@mui/material';
import { t } from 'i18next';
import validator from '../utils/validator.ts';

interface LoginFormProps {
    onSuccess?: () => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const { onSuccess } = props;

    const [email, setEmail] = useState<string>('');
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
            ?.login(email, password)
            .then(() => {
                // todo display to user is ok
                console.log('todo display to user is ok');
                onSuccess && onSuccess();
            })
            .catch(() => {
                // todo display error
                console.log('display error on submit form');
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
                    error={isValidate && !validator.validEmail(email)}
                    label={t('app.auth.email')}
                    type="email"
                    required
                    helperText={isValidate && !validator.validEmail(email) && t('app.auth.errors.email')}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        handleChange();
                    }}
                />
                <TextField
                    error={isValidate && validPassword(password).length > 0}
                    helperText={isValidate && validPassword(password)}
                    label={t('app.auth.password')}
                    type="password"
                    required
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
