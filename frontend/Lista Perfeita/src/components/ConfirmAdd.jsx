import { Button, DialogContent, TextField, Typography, Dialog, Stack } from "@mui/material";
import { useState } from "react";

const ConfirmAdd = ({ open, onClose, onConfirm}) => {

    return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
        PaperProps={{
            sx: {
            borderRadius: 4,
            overflowX: 'hidden',
            },
        }}
    >
        <DialogContent sx={{borderRadius: 4 }}>
            <Typography fontWeight="bold" mb={1}>
                Confirmar produto a lista
            </Typography>

            <Stack direction="row" spacing={3} justifyContent="center">
            <Button variant="outlined" color= 'grey' onClick={onClose} sx={{ 
                textTransform: 'none',
                width: 300,
                color: 'black'
                }}>
                Cancelar
            </Button>

            <Button
                onClick={onConfirm}
                variant="contained"
                sx={{
                textTransform: 'none',
                width: 300, 
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
                }}
            >
                Confirmar
            </Button>
            </Stack>
        </DialogContent>
    </Dialog>
    );
};

export default ConfirmAdd;
