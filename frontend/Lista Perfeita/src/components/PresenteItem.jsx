import { React, useState } from 'react';
import { Stack, Typography, Box, Paper, Button, Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBought from './CheckBought';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BoxPresente = ({ id, nome, descricao, preco, imagem, links, status: initialStatus, organizador, comprado_por, listaId, onMark, onUnmark }) => {
    const [status, setStatus] = useState(initialStatus);
    const [bought, setBought] = useState(comprado_por || ""); 
    const [openDialog, setOpenDialog] = useState(false);
    
    const handleConfirmBuy = (compradorNome) => {
        if (onMark) {
            onMark(id, compradorNome); 
        }
        setOpenDialog(false);
    };
    
    const handleUnmarkItem = () => {
        if (onUnmark) {
            onUnmark(id);
        }
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <Paper elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            width: 320,
            backgroundColor: '#fff',
            boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
          }}
        >

            <Box sx={{
                width: '100%',
                height: 240,
                backgroundColor: '#f8f8f8',
                borderRadius: 3,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
            }}>
                <img src={imagem} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'contain', }} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                    {nome}
                </Typography>
                <Typography variant="subtitle1" color="green" fontWeight="bold">
                    {preco}
                </Typography>
            </Stack>


            <Typography mt={2} variant="body2" color="grey.600">
                {descricao}
            </Typography>

            <Stack spacing={2} mt={3} direction="row">
                {links && links.map((link, index) => (
                    <Button
                        key={index}
                        variant="text"
                        color="rosa.dark"
                        startIcon={<LaunchIcon color="rosa.dark" />}
                        component="a"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            '&:hover .MuiSvgIcon-root': { color: 'rosa.dark', },
                        }}>

                        <Typography variant="body2" color="black">
                            Link {index + 1}
                        </Typography>
                    </Button>
                ))}
            </Stack>

            {initialStatus === "comprado" && (
                <Box
                    sx={{
                        mt: 2,
                        backgroundColor: '#f2fff5',
                        border: '1px solid #b3e6bf',
                        borderRadius: 2,
                        p: 1.5,
                    }}
                >
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography variant="body2" color="green" fontWeight="bold">
                            Presente comprado
                        </Typography>
                    </Stack>
                    <Typography variant="caption" color="grey.600" ml={3}>
                        Por: {comprado_por || "Desconhecido"}
                    </Typography>
                </Box>
            )}

            <Box mt={3}>
                {initialStatus === "disponivel" ? (
                    <Button
                        fullWidth
                        sx={{
                            background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                            color: 'white',
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 'bold',
                        }}
                        startIcon={<SellOutlinedIcon />}
                        onClick={handleOpenDialog} 
                    >
                        Marcar como comprado
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            color: '#585858',
                            textTransform: 'none',
                            borderRadius: 2,
                            fontWeight: 'bold',
                            borderColor: '#e0e0e0',
                            backgroundColor: '#fff',
                            '&:hover': { borderColor: '#cfcfcf', backgroundColor: '#fafafa' },
                        }}
                        onClick={handleUnmarkItem}
                    >
                        Desmarcar como comprado
                    </Button>
                )}

            </Box>

            <CheckBought
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirmBuy} 
                organizer={organizador}
            />

        </Paper>
    );
};

export default BoxPresente;