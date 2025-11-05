import {Button, Box, Typography} from '@mui/material'
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';

const Header = () =>{
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
            gap: 2,
            p: 2,
            marginLeft: 4,
            "& .MuiButton-root": {          
              color: "grey",
              textTransform: "none",
            },
          }}
        >
          <Box sx={{marginTop: 0.6, display: 'flex', gap: 1}}>
            <FilterVintageIcon></FilterVintageIcon>
            <Typography> Lista Perfeita </Typography>
          </Box>
          

          <Button>
            Início
          </Button>

          <Button>
            Minha Lista
          </Button>

          <Button>
            Sugestão de presentes
          </Button>
        </Box>
        

        <Box sx={{
            opacity: "60%", 
            display: "flex",
            gap: 3,
            p: 2,
            marginTop: 1,
            marginRight: 3,
            }}>
          <InstagramIcon></InstagramIcon>
          <LinkedInIcon></LinkedInIcon>
          <XIcon></XIcon>
        </Box>
        
    </Box>
  )
}

export default Header;