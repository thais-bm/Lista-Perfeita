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
  const [nome, setNome] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const [confirmarSenha, setConfirmarSenha] = React.useState('')
  const [cpf, setCpf] = React.useState('')

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleCheckPasswords = () => {
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return false;
    }




  return (
    <Box sx={{ overflow: 'hidden' }} >
      <Header />
      <SignInComponent nome={nome} cpf={cpf} email={email}0/>
    </Box>
  )
}

export default SignIn
