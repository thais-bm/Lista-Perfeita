import React from 'react'
import Header from '../components/Header'
import Container from '@mui/material/Container'
import { Button, Box, Typography, Stack, LinearProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from 'react-router-dom';

/* 
Conteúdo da página VerLista vai aqui 
Exemplo de conteúdo
    - Nome da lista
    - Descrição
    - Categoria - data do evento - criadora do evento
    - Botão de compartilhar
    
    - Barra de progresso - quantos presentes foram comprados/quantos exisstem no total
    
    - Box com os presentes da lista (pode ser um grid ou uma lista)
    - Cada presente pode ter: nome, imagem, descrição, preço, link para compra, status (disponível ou comprado)

    - Se for a criadora da lista, pode ter botões para editar ou excluir a lista e adicionar presentes
                
*/



const VerLista = () => {

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/minhaLista");
    }

    // Dados de exemplo da lista
    const listaNome = "Exemplo de Lista";
    const listaDescricao = "Esta é uma descrição de exemplo para a lista de presentes.";
    const listaCategoria = "Aniversário";
    const listaDataEvento = "2023-12-25";
    const listaCriadora = "Joana Silva";
    const porcentagemComprados = 60;
    const quantidadePresentes = 10;
    const quantidadeComprados = (porcentagemComprados / 100) * quantidadePresentes;

    const listaPresentes = [
        {
            id: 1,
            nome: "Presente 1",
            descricao: "Descrição do Presente 1",
            preco: 100,
            imagem: "https://via.placeholder.com/150",
            link: "#",
            status: "disponível"
        },
        {
            id: 2,
            nome: "Presente 2",
            descricao: "Descrição do Presente 2",
            preco: 200,
            imagem: "https://via.placeholder.com/150",
            link: "#",
            status: "comprado"
        }
    ];


    // Renderização da página
    return (
        <div>

            <Header />

            <Box marginTop={12} /> {/* Espaçamento entre o header e o conteúdo da página: 10 + DISTANCIA */}

            {/* informação sobre a lista */}
            <Container maxWidth="lg" sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>

                <Button
                    color="grey"
                    onClick={handleReturn}
                    startIcon={<ArrowBackIcon sx={{ fontSize: 13 }} />}
                    sx={{ mb: 1, fontSize: 13, padding: 2 }}
                >
                    Voltar para as minhas listas
                </Button>

                <Box padding={3}>
                    <Typography color="black" variant="h4" fontWeight="bold">{listaNome}</Typography>
                    <Typography variant="body2" color="secondary" sx={{ paddingTop: 3, paddingBottom: 3 }}>{listaDescricao}</Typography>

                    {/* Categoria - data do evento - criadora do evento */}
                    <Stack direction="row" spacing={2} mt={1}>

                        <Stack direction="row" spacing={1} mt={1}>
                            <CardGiftcardIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                            <Typography variant="body2" color="initial">{listaCategoria}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} mt={1}>
                            <EventIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                            <Typography variant="body2" color="initial">{listaDataEvento}</Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} mt={1}>
                            <PersonIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                            <Typography variant="body2" color="initial">{listaCriadora}</Typography>
                        </Stack>
                    </Stack>

                    <Box mt={4} mb={2} backgroundColor="#f0f0f0ff" padding={2} borderRadius={2}>
                        <Stack direction="row" spacing={2} mt={1} paddingBottom={2} justifyContent={'space-between'} >
                            <Typography variant="body2" color="initial">Progresso da Lista</Typography>
                            <Typography variant="body2" color="initial">{quantidadeComprados} de {quantidadePresentes} presentes comprados</Typography>
                        </Stack>

                        <LinearProgress
                            variant="determinate"
                            value={porcentagemComprados}
                            sx={{
                                height: 10,
                                borderRadius: 2,
                                backgroundColor: '#eee', // cor do fundo (trilha)
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#ea33bd', // cor da parte carregada
                                },
                            }}
                        />

                        <Typography variant="body2" color="initial" paddingTop={1}>{porcentagemComprados}%</Typography>
                    </Box>



                </Box>

            </Container>

            {/* Todos os presentes organizados em box lado a lado */}

            {/* Se for a criadora da lista -> botões para editar ou excluir a lista e adicionar presentes */}

        </div>
    )
}

export default VerLista