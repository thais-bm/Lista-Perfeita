import React, { useState, useContext } from 'react';
import { Stack, Typography, Box, Paper, Button, Chip } from '@mui/material';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ConfirmAdd from './ConfirmAdd';
import { AddProductContext } from '../contexts/AddProductContext';

const ProdutoItem = ({ nome, descricao, preco, imagem, status: initialStatus, links }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [status, setStatus] = useState(initialStatus); 

    const { listaId, onAdd } = useContext(AddProductContext);

    const handleConfirm = () => {
        console.log(`Adicionando produto à lista com ID: ${listaId}`); 
        onAdd({
            nome,
            descricao,
            preco,
            imagem,
            links
        });
        setStatus('adicionado'); 
        setOpenDialog(false);
    };

    const isAdded = status === 'adicionado';

    return (
        <Paper
            elevation={isAdded ? 6 : 3}
            sx={{
                borderRadius: 3, 
                p: 2,
                width: '100%',
                display: 'flex',
                gap: 3, //
                backgroundColor: isAdded ? '#e8f5e9' : '#fff', 
                alignItems: 'center',
                transition: 'box-shadow 0.3s, background-color 0.3s',
            }}
        >
            {/* Imagem com Borda e Box Sombra */}
            <Box 
                sx={{ 
                    width: 120, 
                    height: 120, 
                    flexShrink: 0, 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    border: '2px solid #b93ed1ff', 
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
                    backgroundColor: '#fff' 
                }}
            >
                <img src={imagem} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#333' }}>{nome}</Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5} 
                    sx={{ 
                        display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical', 
                        WebkitLineClamp: 2 
                    }}
                >
                    {descricao}
                </Typography>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-end', 
                gap: 1, 
                minWidth: 160 
            }}>
                <Typography variant="h5" fontWeight="bold" color="#066e30ff">{`${preco}`}</Typography>
                
                {isAdded ? (
                    <Chip
                        icon={<CheckCircleIcon />}
                        label="Adicionado!"
                        color="success"
                        variant="filled"
                        sx={{ fontWeight: 'bold', height: 40, fontSize: '1rem' }}
                    />
                ) : (
                   
                    <Button

                        onClick={() => setOpenDialog(true)}
                        sx={{
                            background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            height: 50, 
                            fontWeight: 20,
                            borderRadius: 2, 
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)', 
                            '&:hover': {
                                opacity: 0.9,
                                boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                        startIcon={<SellOutlinedIcon fontSize='20'/>}
                    >
                        Adicionar Produto
                    </Button>
                )}
            </Box>

            <ConfirmAdd
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirm}
            />
        </Paper>
    );
};

export default ProdutoItem;