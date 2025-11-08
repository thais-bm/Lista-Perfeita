import { Paper, Grid, Typography, TextField, Button, Stack, Checkbox } from '@mui/material'
import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

const LoginPaper = () => {
    return (
        <Grid container sx={{ minHeight: '100vh', width:'100%', display: 'flex', backgroundColor: 'white' }}>
            {/* Coluna da esquerda: Login */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                }}
            >
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom mt={10}>
                    Comece agora a fazer suas listas de presente
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" mb={4}>
                    Você está a poucos passos de criar sua lista perfeita!
                </Typography>

                <Stack spacing={3} sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        required
                        id='name'
                        label='Nome Completo'
                        type="text"
                        variant="outlined"
                        fullWidth
                        size='small'
                    />

                    <TextField
                        required
                        id='cpf'
                        label='CPF (cadastro de pessoa física)'
                        type="text"
                        variant="outlined"
                        fullWidth
                        size='small'
                    />

                    <TextField
                        required
                        id='email'
                        label='E-mail'
                        type="email"
                        variant="outlined"
                        fullWidth
                        size='small'
                        
                    />

                    <TextField
                        variant="outlined"
                        id='senha'
                        label="Senha"
                        type="password"
                        required
                        fullWidth
                        size='small'
                    />

                    <TextField
                        variant="outlined"
                        id='senha'
                        label="Confirme sua senha"
                        type="password"
                        required
                        fullWidth
                        size='small'
                    />

                    <FormControlLabel required control={<Checkbox />} label="Aceito os termos e condições" />

                    <Button variant='outlined' color='black'
                    startIcon={<HowToRegOutlinedIcon/>}
                        sx={{borderRadius: 2, textTransform:'none', background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white'}}
                    >
                        Cadastrar
                    </Button>
                </Stack>
            </Grid>

            {/* Coluna da direita: Imagem */}
            <Grid item xs={12} md={6} sx={{
                width: '50%',
            }}>
                <img
                    src="/hug_gift.jpg"
                    alt="Ilustração de login"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '10%' }}
                />
            </Grid>
        </Grid >
    )
}

export default LoginPaper