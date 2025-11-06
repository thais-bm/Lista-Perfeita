import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box, Container} from '@mui/material';


const NotFound = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');  
    }

    return (
    <Container component="section" maxWidth="100%">

        <Container maxWidth="xs" component="main" sx={{
        minHeight: '100vh',
        maxHeight: 'xs',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        }}>
        
        <Paper elevation={3} sx={{ padding: 4, width: '100%'}}>
            <Typography component="h1" variant="h5" align="center" color="primary">Página não encontrada</Typography>
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginTop: 2 }}>
                Até os grandes aventureiros se perdem às vezes... Mas não se preocupe: estamos aqui para ajudar! Apenas aperte nesse botão para voltar
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button variant="contained" color="primary" onClick={handleHomeClick}>
                Página Inicial
            </Button>
            </Box>
        </Paper>

        </Container>
        
    </Container>

    );
}

export default NotFound