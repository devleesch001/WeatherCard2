import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { alpha, AppBar, Box, Button, IconButton, InputBase, styled, Toolbar, Typography } from '@mui/material';

import SunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AccountIcon from '@mui/icons-material/AccountCircle';

import ModalAuth from '../user/ModalAuth.tsx';
import { UserContext } from '../provider/UserProvider.tsx';
import ModalComponent from './ModalComponent.tsx';
import ProfileUser from '../user/ProfileUser.tsx';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 4,
    marginLeft: 4,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function MainAppBar() {
    const { t } = useTranslation();

    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

    // get user from user provider
    const userContext = useContext(UserContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <SunnyIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}>
                        {t('app.title')}
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        {userContext?.user ? (
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                arial-label="Profil"
                                color="inherit"
                                onClick={() => setIsProfileModalOpen(true)}
                            >
                                <AccountIcon />
                            </IconButton>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={() => setIsLoginModalOpen(true)}
                                    sx={{ display: { xs: 'none', sm: 'block' } }}
                                >
                                    <Typography noWrap>{t('app.auth.login.action')}</Typography>
                                </Button>
                                <IconButton
                                    aria-label="login"
                                    color="inherit"
                                    sx={{ display: { sm: 'none' } }}
                                    onClick={() => setIsLoginModalOpen(true)}
                                >
                                    <LoginIcon />
                                </IconButton>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <ModalAuth open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <ModalComponent open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
                <ProfileUser />
            </ModalComponent>
        </Box>
    );
}
