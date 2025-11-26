import { React, useState } from 'react';
import { Stack, Typography, Box, Paper, Button, Chip } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBought from './CheckBought';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const BoxPresente = ({ id, nome, descricao, preco, imagem, links, status: initialStatus, organizador, comprado_por, listaId, onMark, onUnmark, onRemove }) => {
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

    const handleRemoveItem = () => {
        if (onRemove) {
            onRemove(id);
        }
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

            <Stack spacing={2} mt={3} direction="row" flexWrap="wrap">
                {links && links.length > 0 ? (
                    links.map((link, index) => (
                        <Button
                            key={index}
                            variant="contained" // Botão preenchido para destaque
                            color="success"     // Cor verde (padrão de compra)
                            startIcon={<ShoppingCartIcon />}
                            component="a"
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                textTransform: 'none',
                                borderRadius: 2,
                                fontWeight: 'bold',
                                backgroundColor: '#2e7d32', // Verde personalizado se quiser
                                '&:hover': { backgroundColor: '#1b5e20' },
                                mb: 1 // Margem inferior caso quebre linha
                            }}>

                            {/* Se tiver apenas 1 link, mostra só "Comprar", senão "Comprar 1", "Comprar 2" */}
                            {links.length === 1 ? "Comprar" : `Comprar na loja ${index + 1}`}
                        </Button>
                    ))
                ) : (
                    // Caso não tenha links cadastrados
                    <Typography variant="caption" color="grey.500">
                        Link indisponível
                    </Typography>
                )}
            </Stack>
            {onRemove && (
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleRemoveItem}
                    startIcon={<DeleteOutlineIcon />}
                    sx={{ textTransform: 'none', padding: 0, height: 25, backgroundColor: "#cc3030ff" }}
                >
                    Remover
                </Button>
            )}

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