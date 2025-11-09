import React from 'react'
import { Stack, Typography, Box, Paper, Button } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';

{/* 
  - Cada presente pode ter: nome, imagem, descrição, preço, link para compra, status (disponível ou comprado)
  */}


const BoxPresente = ({ id, nome, descricao, preco, imagem, links, status }) => {
  return (
    <Paper elevation={3} padding={2} margin={2}>



      <Box padding={3} alignContent={'center'} justifyContent={'center'}>
        {/* Conteúdo do presente aqui */}
        <img src={imagem} alt="Imagem do Presente" style={{ Width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }} />

        <Stack spacing={2} padding={2} direction={'row'}>
          <Typography color="black" variant="h4">{nome}</Typography>
          <Typography color="green" variant="h4" fontWeight="bold">R$ {preco}</Typography>
        </Stack>

        <Typography variant="body1" color="initial">{descricao}</Typography>

        <Stack spacing={2} padding={2} direction="row">
          {links && links.map((link, index) => (
            <Button
              key={index}
              variant="text"
              color="rosa.dark"
              startIcon={<LaunchIcon color="rosa.dark"/>}
              component="a"              // transforma o botão em <a>
              href={link}                // destino do link
              target="_blank"            // abre em nova aba
              rel="noopener noreferrer"  // segurança
              sx={{
                '&:hover .MuiSvgIcon-root': { color: 'rosa.light', },
              }}>

              <Typography variant="body2" color="rosa.dark">
                Link {index + 1}
              </Typography>
            </Button>
          ))}
        </Stack>


        {status === "disponível" ? (

          <Box backgroundColor="lightgreen" padding={1} borderRadius={1} width="fit-content" alignContent={'center'}>
            <Typography variant="body1" color="green">Disponível</Typography>
          </Box>
        ) : (
          <Box backgroundColor="lightcoral" padding={1} borderRadius={1} width="fit-content">
            <Typography variant="body1" color="red">Comprado</Typography>
          </Box>
        )}

      </Box>


    </Paper>

  )
}

export default BoxPresente