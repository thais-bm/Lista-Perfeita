import { Button, Box, Typography, Paper } from '@mui/material'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const navigateMinhaLista = () => {
    navigate("/minhaLista");
  };

  const navigateHome = () => {
    navigate('/');
  }

  const navigateCreateList = () => {
    navigate("/createList")
  }

  const navigateSugestion = () => {
    navigate('/sugestion')
  }

  const navigateSignIn = () => {
    navigate('/signin');
  }

  const navigateLogin = () => {
    navigate('/login');
  }

  return (
    <Paper elevation={3}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 2000,
          margin: '0 auto',
          color: 'black',
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between', // separa esquerda e direita
          alignItems: 'center',            // alinha verticalmente
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          p: 2, // padding geral
        }}
      >
        {/* Lado esquerdo */}
        <Box sx={{ display: "flex", gap: 3, marginLeft: 2 }}>
          <Button
            startIcon={<CardGiftcardIcon />}
            onClick={navigateHome}
            sx={{ textTransform: "none", color: 'black' }}
          >
            Lista Perfeita
          </Button>

          <Box sx={{
            display: "flex",
            gap: 2,
            "& .MuiButton-root": {
              color: "grey",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#c60094ff",
              },
            },
          }}>
            <Button onClick={navigateHome}>Início</Button>
            <Button onClick={navigateMinhaLista}>Minha Lista</Button>
            <Button onClick={navigateSugestion}>Sugestões</Button>
          </Box>
        </Box>

        {/* Lado direito */}
        <Box sx={{ display: "flex", gap: 2, marginRight: 5 }}>
          <Button
            variant="outlined"
            sx={{
              background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)",
              color: 'white',
              textTransform: "none",
              borderRadius: 3,
            }}
            startIcon={<FavoriteBorderOutlinedIcon />}
            onClick={navigateSignIn}
          >
            Criar Lista
          </Button>

          <Button
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: 3 }}
            startIcon={<PersonIcon />}
            onClick={navigateLogin}
          >
            Entrar
          </Button>
        </Box>
      </Box>

    </Paper>



  )
}

export default Header;