import React from 'react'
import SignInComponent from '../components/SignInComponent'
import Header from '../components/Header'

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
    <div>
        <Header />
        <SignInComponent />
    </div>
  )
}

export default SignIn
