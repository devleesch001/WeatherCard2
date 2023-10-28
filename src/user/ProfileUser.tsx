import React, { useContext } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { UserContext } from '../provider/UserProvider.tsx';
import { t } from 'i18next';

const ProfileUser: React.FC = () => {
    // get user from provider
    const userProvider = useContext(UserContext);

    return (
        <Paper elevation={3}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h3">User Profile</Typography>
                <Typography>
                    {t('app.auth.username')} : {userProvider?.user?.username}
                </Typography>
                <Typography>
                    {' '}
                    {t('app.auth.email')} : {userProvider?.user?.email}
                </Typography>
            </Box>
        </Paper>
    );
};

export default ProfileUser;
