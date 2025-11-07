import React from 'react'
import Header from "../components/Header";
import LoginPaper from '../components/LoginPaper';
import { Box } from '@mui/material';

const Login = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}>
            <Header />
            <LoginPaper />
        </Box>
    )
}

export default Login
