import React from 'react';
import { Box, Modal } from '@mui/material';

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

interface ModalProps {
    open: boolean;
    onClose?(event: object, reason: 'backdropClick' | 'escapeKeyDown'): void;
    children: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = (props) => {
    const { open, onClose, children } = props;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{children}</Box>
        </Modal>
    );
};

export default ModalComponent;
