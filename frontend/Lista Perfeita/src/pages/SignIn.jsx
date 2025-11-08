import React from 'react'
import SignInComponent from '../components/SignInComponent'
import Header from '../components/Header'
import { Box } from '@mui/material'

/* 

    Cadastro de novo usuário
    - Nome completo
    - E-mail
    - Senha
    - Confirmar senha
    - CPF (opcional)
    - Botão de "Cadastrar"

*/

function SignIn() {
  return (
    <Box sx={{overflow: 'hidden'}} >
        <Header />
        <SignInComponent />
    </Box>
  )
}

export default SignIn
