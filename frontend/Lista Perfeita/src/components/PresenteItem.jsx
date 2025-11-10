import { React, useState } from 'react';
import {Stack, Typography, Box, Paper, Button, Chip} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBought from './CheckBought';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const BoxPresente = ({ id, nome, descricao, preco, imagem, links, status: initialStatus }) => {
  const [status, setStatus] = useState(initialStatus);
  const [bought, setBought] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleChecked = () => {
    setStatus(prev => (prev === "disponível" ? "comprado" : "disponível"));
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
      }}
      >
        <img src={imagem} alt={nome} style={{ width: '100%', height: '100%', objectFit: 'contain',}}/>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight="bold">
          {nome}
        </Typography>
        <Typography variant="subtitle1" color="green" fontWeight="bold">
          R$ {preco}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} mt={1}>
        <Chip label="Tecnologia" size="small" />
        <Chip label="alta" size="small" color="error" />
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
              startIcon={<LaunchIcon color="rosa.dark"/>}
              component="a"              // transforma o botão em <a>
              href={link}                // destino do link
              target="_blank"            // abre em nova aba
              rel="noopener noreferrer"  // segurança
              sx={{
                '&:hover .MuiSvgIcon-root': { color: 'rosa.dark', },
              }}>

              <Typography variant="body2" color="black">
                Link {index + 1}
              </Typography>
            </Button>
          ))}
        </Stack>

      {status === "comprado" && (
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
            Por: {bought || "Desconhecido"}
          </Typography>
        </Box>
      )}

      <Box mt={3}>
        {status === "disponível" ? (
          <Button
            fullWidth
            onClick={() => setOpenDialog(true)} 
            sx={{
              background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
              color: 'white',
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 'bold',
            }}
            startIcon={<SellOutlinedIcon />}
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
            onClick={handleChecked}
          >
            Desmarcar como comprado
          </Button>
        )}

      </Box>

      <CheckBought
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={(nameBought) => {
          setStatus("comprado");
          setOpenDialog(false);
          setBought(nameBought);
        }}
        organizer="Maria"
      />

    </Paper>
  );
};

export default BoxPresente;
