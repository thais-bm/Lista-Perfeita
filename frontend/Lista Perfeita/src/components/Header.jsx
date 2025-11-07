import {Button, Box, Typography} from '@mui/material'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import { useNavigate } from 'react-router-dom';


const Header = () =>{
  const navigate = useNavigate();
      
  const navigateMinhaLista = () => {
    navigate("/MinhaLista"); 
  };

  const navigateHome = () =>{
    navigate('/');
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
        maxWidth: 2000,
        margin: '0 auto',
        color: 'black',
        justifyContent: 'space-between',
        position: 'fixed',
        display:'flex',
        top: 0,
        left: 0, 
        right: 0
      }}
      backgroundColor= 'white'>
  
        <Box
          sx={{
            display: "flex",
            gap: 3,
            p: 2,
            marginLeft: 4,
          }}
        >
          <Button color="black" startIcon={<FilterVintageIcon/>} sx={{textTransform: "none"}}> Lista Perfeita </Button>
          
          <Box sx={{"& .MuiButton-root": {          
              color: "grey",
              textTransform: "none",
              "&:hover": {
              backgroundColor: "transparent", 
              color: "#c60094ff", 
        },
            },}}>

          <Button onClick={navigateHome}>
            Início
          </Button>

          <Button onClick={navigateMinhaLista}>
            Minha Lista
          </Button>

          <Button>
            Sugestões
          </Button>
          </Box>
        </Box>
        

        <Box sx={{
            display: "flex",
            gap: 3,
            p: 2,
            marginTop: 1,
            marginRight: 3,
            "& .MuiButton-root": {          
              textTransform: "none",
              borderRadius: 3
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