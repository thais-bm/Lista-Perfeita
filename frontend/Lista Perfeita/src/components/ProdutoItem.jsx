import { React, useState } from 'react';
import { Stack, Typography, Box, Paper, Button, Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmAdd from './ConfirmAdd';

const ProdutoItem = ({id, nome, descricao, preco, imagem, links, status: initialStatus }) => {
    const [status, setStatus] = useState(initialStatus);
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Paper
        elevation={3}
        sx={{
            borderRadius: 2,
            p: 2,
            width: '100%',
            display: 'flex',
            gap: 2,
            backgroundColor: '#fff7ffff',
            alignItems: 'center',
        }}
        >
        {/* Imagem */}
        <Box sx={{ width: 150, height: 150, flexShrink: 0, borderRadius: 1, overflow: 'hidden', backgroundColor: '#fff' }}>
            <img src={imagem} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        {/* Detalhes do produto */}
        <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">{nome}</Typography>
            <Stack direction="row" spacing={1} mt={0.5}>
            </Stack>
            <Typography variant="body2" color="text.secondary" mt={1}>{descricao}</Typography>
        </Box>

        {/* Preço e ações */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1, minWidth: 150 }}>
            <Typography variant="h6" fontWeight="bold" color="#066e30ff">{`${preco}`}</Typography>
            <Stack spacing={1} >
                <Button
                width={400}
                onClick={() => setOpenDialog(true)}
                sx={{
                    background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 'bold',
                }}
                startIcon={<SellOutlinedIcon />}
                >
                Adicionar Produto
                </Button>
            </Stack>

        </Box>

        {/* Dialog */}
        <ConfirmAdd
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            onConfirm={() => {
            console.log("Produto confirmado:", nome);
            setOpenDialog(false); 
        }}

        />
        </Paper>
    );
};

export default ProdutoItem;
