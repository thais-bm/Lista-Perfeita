import { Button, Box, Paper } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigateMinhaLista = () => navigate("/minhaLista");
  const navigateHome = () => navigate('/');
  const navigateCreateList = () => navigate("/createList");
  const navigateSugestion = () => navigate('/sugestion');
  const navigateSignIn = () => navigate('/signin');
  const navigateLogin = () => navigate('/login');

  const token = localStorage.getItem("token");

  return (
    <Paper elevation={3} sx={{
      width: '100%',
      color: 'black',
      justifyContent: 'space-between',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      overflowX: "hidden",
      boxShadow: "0px 4px 6px rgba(135, 135, 135, 0.2)"
    }}
      backgroundColor='white'>

      {/* Logo */}
      <Box sx={{ display: "flex", gap: 3, marginLeft: 14, marginTop: 1, marginBottom: 1 }}>
        <Button
          startIcon={<CardGiftcardIcon sx={{
            color: 'white',
            background: "linear-gradient(90deg, #fb68d6ff 40%, #ce77f6ff 55%, #9906e2ff 100%)",
            borderRadius: '5px',
            padding: '8px',
          }} />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: '20px',
            background: "linear-gradient(90deg, #f019bbff 0%, #8008b7ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          disabled
        >
          Lista Perfeita
        </Button>
      </Box>

      {/* Menu central */}
      <Box  
      sx={{ 
        display: "flex", 
        gap: 5, 
        justifyContent: "center", 
        alignItems: "center", 
        flexGrow: 1 
      }}>
        <Button
          onClick={navigateHome}
          sx={{
            fontWeight: 550,
            textTransform: "none",
            color: isActive('/') ? '#b8018aff' : 'black',
            '&:hover': { backgroundColor: 'transparent', color: '#c60094' },
          }}
        >
          Início
        </Button>

        <Button
          onClick={navigateMinhaLista}
          sx={{
            fontWeight: 550,
            textTransform: "none",
            color: isActive('/minhaLista') ? '#b8018aff' : 'black',
            '&:hover': { backgroundColor: 'transparent', color: '#c60094' },
          }}
        >
          Minha Lista
        </Button>

        <Button
          onClick={navigateSugestion}
          sx={{
            fontWeight: 550,
            textTransform: "none",
            color: isActive('/sugestion') ? '#b8018aff' : 'black',
            '&:hover': { backgroundColor: 'transparent', color: '#c60094' },
          }}
        >
          Sugestões
        </Button>
      </Box>

      {/* Botões da direita */}
      <Box sx={{
        display: "flex",
        gap: 3,
        marginRight: 8,
        "& .MuiButton-root": {
          textTransform: "none",
          borderRadius: 3,
          marginTop: 2,
          marginBottom: 1
        },
      }}>
        {/* Só mostra se NÃO tiver token */}
        {!token && (
          <>
            <Button
              variant='outlined'
              color='black'
              sx={{ background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white' }}
              startIcon={<FavoriteBorderOutlinedIcon />}
              onClick={navigateSignIn}
            >
              Criar Lista
            </Button>

            <Button
              variant='outlined'
              color='black'
              startIcon={<PersonIcon />}
              onClick={navigateLogin}
            >
              Entrar
            </Button>
          </>
        )}

        {/* Se tiver token, mostra botão de logout */}
        {token && (
          <Button
            variant='outlined'
            color='black'
            startIcon={<PersonIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Paper>
  )
}

export default Header;