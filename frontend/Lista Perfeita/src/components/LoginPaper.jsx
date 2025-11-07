import { Paper, Grid, Typography, TextField, Button, Stack } from '@mui/material'
import React from 'react'

const LoginPaper = () => {
    return (
        <Grid container sx={{ minHeight: '100vh', minWidth: '100vw', display: 'flex' }}>
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
                    />

                    <TextField
                        variant="outlined"
                        id='senha'
                        label="Senha"
                        type="password"
                        required
                        fullWidth
                    />

                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Entrar
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