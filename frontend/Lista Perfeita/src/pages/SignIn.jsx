// frontend/src/SignInComponent.jsx
import { Grid, Typography, TextField, Button, Stack, Checkbox } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import React, { useState } from 'react';
import Header from '../components/Header';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API = "http://localhost:8000";

const SignInComponent = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");

    if (!aceitouTermos) {
      toast.error("Você precisa aceitar os termos e condições.");
      return;
    }
    if (senha !== confirmSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          email: email,
          cpf: cpf,
          password: senha
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Erro no cadastro");
      }
      const data = await res.json();
      navigate("/login")
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <Grid container sx={{ minHeight: '100vh', width: '100%', display: 'flex', backgroundColor: 'white' }}>
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

          {mensagem && (
            <Typography variant="body2" color="error" align="center" mb={2}>
              {mensagem}
            </Typography>
          )}

          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400 }}>
            <Stack spacing={3}>
              <TextField
                required
                id='name'
                label='Nome Completo'
                type="text"
                variant="outlined"
                fullWidth
                size='small'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              <TextField
                required
                id='cpf'
                label='CPF (cadastro de pessoa física)'
                type="text"
                variant="outlined"
                fullWidth
                size='small'
                value={cpf}
                onChange={(e) => setCPF(e.target.value)}
              />

              <TextField
                required
                id='email'
                label='E-mail'
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

              <TextField
                variant="outlined"
                id='confirma-senha'
                label="Confirme sua senha"
                type="password"
                required
                fullWidth
                size='small'
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
              />

              <FormControlLabel
                required
                control={<Checkbox checked={aceitouTermos} onChange={(e) => setAceitouTermos(e.target.checked)} />}
                label="Aceito os termos e condições"
              />

              <Button
                type="submit"
                variant='outlined'
                color='black'
                startIcon={<HowToRegOutlinedIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white' }}
              >
                Cadastrar
              </Button>
            </Stack>
          </form>
        </Grid>

        <Grid item xs={12} md={6} sx={{ width: '50%' }}>
          <img
            src="/hug_gift.jpg"
            alt="Ilustração de login"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '10%' }}
          />
        </Grid>
      </Grid >
    </>

  )
}

export default SignInComponent;