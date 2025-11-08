import {Button, Box, Typography} from '@mui/material'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

import { useNavigate } from 'react-router-dom';

const Header = () =>{
  const navigate = useNavigate();
      
  const navigateMinhaLista = () => {
    navigate("/minhaLista"); 
  };

  const navigateHome = () =>{
    navigate('/');
  }

  const navigateCreateList = () =>{
    navigate("/createList")
  }

  const navigateSugestion = () =>{
    navigate('/sugestion')
  }

  const navigateSignIn = () =>{
    navigate('/signin');
  }

  const navigateLogin = () =>{
    navigate('/login');
  }

  return(
    <Box sx={{
        width: '100%', 
        color: 'black',
        justifyContent: 'space-between',
        position: 'absolute',
        display:'flex',
        top: 0,
        left: 0, 
        right: 0,
        overflowX: "hidden",
        boxShadow: "0px 4px 6px rgba(135, 135, 135, 0.2)"
      }}
      backgroundColor= 'white'>
  
        <Box
          sx={{
            display: "flex",
            gap: 3,
            marginLeft: 4,
            marginTop: 2,
            marginBottom: 1
          }}
        >
          <Button startIcon={<CardGiftcardIcon 
            sx={{
              color:'white',
              background: "linear-gradient(90deg, #fb68d6ff 40%, #ce77f6ff 55%, #9906e2ff 100%)",
              backgroundSize: '500% 500%',   
              backgroundPosition: 'center',
              borderRadius: '5px',         
              padding: '8px',                
            }}
          />} 
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
          
          <Box sx={{"& .MuiButton-root": {          
              color: "grey",
              marginTop: '8px',
              textTransform: "none",
              "&:hover": {
              backgroundColor: "transparent", 
              color: "#c60094ff",
              "&:focus": {
              outline: "none", 
              boxShadow: "none", 
            },},"&:active": {
              outline: "none",
              boxShadow: "none",
            },
            },}}>

            <Button onClick={navigateHome}>
              Início
            </Button>

            <Button onClick={navigateMinhaLista}>
              Minha Lista
            </Button>

            <Button onClick={navigateSugestion}>
              Sugestões
            </Button>
          </Box>
        </Box>
        

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

          <Button variant='outlined' color='black'
            sx={{background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white'}}
            startIcon={<FavoriteBorderOutlinedIcon />}
            onClick={navigateSignIn}
          >
            Criar Lista
          </Button>

          <Button variant='outlined' color='black'
            startIcon={<PersonIcon/>}
            onClick={navigateLogin}
          >
            Entrar
          </Button>
        </Box>
        
    </Box>
  )
}

export default Header;