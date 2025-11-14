
import Header from "../components/Header";
import { Box } from '@mui/material';
import { Paper, Grid, Typography, TextField, Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const API = "http://localhost:8000/users"

    const navigateRegister = () => {
        navigate("/signin")
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: senha })
            })

            if (!res.ok) {
                const err = await res.json()
                throw new Error(err.detail || "Erro no login")
            }

            const data = await res.json()
            localStorage.setItem("token", data.access_token)
            toast.success("Login realizado com sucesso!")

            setTimeout(() => {
                navigate("/minhaLista")
            }, 2000) // espera 2 segundos

        } catch (err) {
            toast.error(err.message)
        }
    }
    return (
        <Box>
            <Header />
            <ToastContainer />
            <Grid container sx={{ minHeight: '100vh', width: '100%', display: 'flex' }}>
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

                    <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
                        <Stack spacing={3}>
                            <TextField
                                required
                                id='email'
                                label='Email'
                                type="email"
                                variant="outlined"
                                fullWidth
                                size='small'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                variant="outlined"
                                id='senha'
                                label="Senha"
                                type="password"
                                required
                                fullWidth
                                size='small'
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant='outlined'
                                color='black'
                                sx={{ borderRadius: 2, textTransform: 'none', background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white' }}
                            >
                                Entrar
                            </Button>

                            <Button variant='body2' color='pink' onClick={navigateRegister}>
                                Ainda não tem conta? Clique aqui para se registrar!
                            </Button>
                        </Stack>
                    </form>
                </Grid>

                {/* Coluna da direita: Imagem */}
                <Grid item xs={12} md={6} sx={{ width: '50%' }}>
                    <img
                        src="/hug_gift.jpg"
                        alt="Ilustração de login"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '10%', display: 'block' }}
                    />
                </Grid>
            </Grid >
        </Box>
    )
}

export default Login
