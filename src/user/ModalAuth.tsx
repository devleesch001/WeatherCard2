import React from 'react';
import { Box, Modal, Paper, Tab, Tabs } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { t } from 'i18next';
import SignInIconIcon from '@mui/icons-material/ExitToApp';
import LoginForm from './LoginForm.tsx';
import RegisterForm from './RegisterForm.tsx';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface LoginModalProps {
    open: boolean;
    onClose?(event: object, reason: 'backdropClick' | 'escapeKeyDown'): void;
}
const ModalAuth: React.FC<LoginModalProps> = (props) => {
    const { open, onClose } = props;

    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    <Paper elevation={3} square>
                        <Tabs
                            variant="fullWidth"
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            centered
                        >
                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<LoginIcon />}
                                label={t('app.auth.login.action')}
                                {...a11yProps(0)}
                            />
                            <Tab
                                sx={{ textTransform: 'none' }}
                                icon={<SignInIconIcon />}
                                label={t('app.auth.register.action')}
                                {...a11yProps(1)}
                            />
                        </Tabs>
                    </Paper>
                    <Box padding={'40px'}>{value == 0 ? <LoginForm /> : <RegisterForm />}</Box>
                </Paper>
            </Box>
        </Modal>
    );
};

export default ModalAuth;
