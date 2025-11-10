import { Button, DialogContent, TextField, Typography, Dialog, Stack } from "@mui/material";
import { useState } from "react";

const CheckBought = ({ open, onClose, onConfirm, organizer }) => {
    const [nome, setNome] = useState("");

    const handleConfirm = () => {
    if (nome.trim()) {
        onConfirm(nome);
        }
    };

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
                Marcar presente como Comprado
            </Typography>

            <Typography sx={{ color: 'grey.700', mb: 2 }}>
            Informe seu nome para que {organizer} saiba quem comprou este presente.
            </Typography>

            <TextField
            label="Seu nome"
            variant="outlined"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sx={{ mb: 3, width: 540,
                '& .MuiOutlinedInput-root': {
                borderRadius: 2, 
            },}}
            
            />

            <Stack direction="row" spacing={3} justifyContent="center">
            <Button variant="outlined" color= 'grey' onClick={onClose} sx={{ 
                textTransform: 'none',
                width: 300,
                color: 'black'
                }}>
                Cancelar
            </Button>

            <Button
                onClick={handleConfirm}
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

export default CheckBought;
