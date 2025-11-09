import { Paper, Grid, Typography, TextField, Button, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPaper = () => {
    const navigate = useNavigate()

    const navigateRegister = () =>{
        navigate("/signin")
    }
    return (
        <Grid container sx={{ minHeight: '100vh', width:'100%', display: 'flex' }}>
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
                <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                    Bem-vindo(a) de volta!
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" mb={4}>
                    Insira seu e-mail e senha para acessar suas listas perfeitas!
                </Typography>

                <Stack spacing={3} sx={{ width: '100%', maxWidth: 400 }}>
                    <TextField
                        required
                        id='email'
                        label='Email'
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


                    <Button variant='outlined' color='black'
                        sx={{borderRadius: 2, textTransform:'none', background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white'}}
                    >
                        Entrar
                    </Button>

                    <Button variant='body2' color='pink' onClick={navigateRegister}> Ainda não tem conta? Clique aqui para se registrar!</Button>
                </Stack>
            </Grid>

            {/* Coluna da direita: Imagem */}
            <Grid item xs={12} md={6} sx={{
                width: '50%',
            }}>
                <img
                    src="/hug_gift.jpg"
                    alt="Ilustração de login"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '10%', display:'block' }}
                />
            </Grid>
        </Grid >
    )
}

export default LoginPaper