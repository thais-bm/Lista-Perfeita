import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress, DialogContentText } from '@mui/material'

const DialogBox = ({ open, onClose, onConfirm, loading }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Excluir lista</DialogTitle>

            <DialogContent>
                <DialogContentText color="grey" variant="body2">
                    Tem certeza que deseja apagar esta lista? Esta ação não pode ser desfeita.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>

                <Button
                    color="error"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} /> : "Excluir"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogBox;
