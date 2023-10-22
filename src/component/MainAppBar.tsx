import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    alpha,
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Modal,
    Paper,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';

import SunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';

import LoginForm from '../user/LoginForm.tsx';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: 0,
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
                    <Box>
                        <Button
                            color="inherit"
                            onClick={() => setIsLoginModalOpen(true)}
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            {t('app.auth.login.action')}
                        </Button>
                        <IconButton
                            aria-label="login"
                            color="inherit"
                            sx={{ display: { sm: 'none' } }}
                            onClick={() => setIsLoginModalOpen(true)}
                        >
                            <LoginIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <LoginModal open={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </Box>
    );
}

interface LoginModalProps {
    open: boolean;
    onClose?(event: object, reason: 'backdropClick' | 'escapeKeyDown'): void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
    const { open, onClose } = props;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            sm: '450px',
            xs: '100%',
        },
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Paper>
                    <Box padding={'40px'}>
                        <LoginForm />
                    </Box>
                </Paper>
            </Box>
        </Modal>
    );
};
