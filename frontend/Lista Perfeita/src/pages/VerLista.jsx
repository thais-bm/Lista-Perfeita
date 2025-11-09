import React from 'react'
import Header from '../components/Header'
import { Button, Box, Typography, Stack, LinearProgress, Paper, Container, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PresenteItem from '../components/PresenteItem';

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

    const listaExemplo = {
        nome: "Exemplo de Lista",
        descricao: "Esta é uma descrição de exemplo para a lista de presentes.",
        categoria: "Aniversário",
        dataEvento: "2023-12-25",
        criadora: "Joana Silva",
        porcentagemComprados: 60,
        quantidadePresentes: 10,

        presentes: [
            { id: 1, nome: "Fone Bluetooth Legal", descricao: "Fones sem fio com cancelamento de ruído ativo", preco: 299.99, imagem: "https://m.media-amazon.com/images/I/51xuDWMXfRL._AC_UF1000,1000_QL80_.jpg", link: ["#", "##"], status: "disponível" },
            { id: 2, nome: "Smartphone XYZ", descricao: "Smartphone com câmera de alta resolução", preco: 1999.99, imagem: "https://s2-techtudo.glbimg.com/UtPQgyuHfZrGtYH77LHDjxEnM8I=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/W/m/PJ6zOcTBeXSApdBnoRIw/2016-06-29-1iphone-2g.jpg", link: ["#", "##"], status: "comprado" },
            { id: 3, nome: "Computador Gamer", descricao: "Camiseta de algodão com estampa moderna", preco: 79.99, imagem: "https://cdn.dooca.store/559/products/c1_640x640+fill_ffffff.png", link: ["#", "##"], status: "disponível" }
        ]
    }


    // Renderização da página
    return (
        <div>

            <Header />

            <Box marginTop={12} /> {/* Espaçamento entre o header e o conteúdo da página: 10 + DISTANCIA */}

            {/* informação sobre a lista */}
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>
                    <Button
                        color="grey"
                        onClick={handleReturn}
                        startIcon={<ArrowBackIcon sx={{ fontSize: 13 }} />}
                        sx={{ mb: 1, fontSize: 13, padding: 2 }}
                    >
                        Voltar para as minhas listas
                    </Button>

                    <Box padding={3}>
                        <Typography color="black" variant="h4" fontWeight="bold">{listaExemplo.nome}</Typography>
                        <Typography variant="body2" color="secondary" sx={{ paddingTop: 3, paddingBottom: 3 }}>{listaExemplo.descricao}</Typography>

                        {/* Categoria - data do evento - criadora do evento */}
                        <Stack direction="row" spacing={2} mt={1}>

                            <Stack direction="row" spacing={1} mt={1}>
                                <CardGiftcardIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="initial">{listaExemplo.categoria}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} mt={1}>
                                <EventIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="initial">{listaExemplo.dataEvento}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} mt={1}>
                                <PersonIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="initial">{listaExemplo.criadora}</Typography>
                            </Stack>
                        </Stack>

                        <Box mt={4} mb={2} backgroundColor="#f0f0f0ff" padding={2} borderRadius={2}>
                            <Stack direction="row" spacing={2} mt={1} paddingBottom={2} justifyContent={'space-between'} >
                                <Typography variant="body2" color="initial">Progresso da Lista</Typography>
                                <Typography variant="body2" color="initial">{(listaExemplo.porcentagemComprados / 100) * listaExemplo.quantidadePresentes} de {listaExemplo.quantidadePresentes} presentes comprados</Typography>
                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={listaExemplo.porcentagemComprados}
                                sx={{
                                    height: 10,
                                    borderRadius: 2,
                                    backgroundColor: '#eee', // cor do fundo (trilha)
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#ea33bd', // cor da parte carregada
                                    },
                                }}
                            />

                            <Typography variant="body2" color="initial" paddingTop={1}>{listaExemplo.porcentagemComprados}%</Typography>
                        </Box>



                    </Box>

                </Paper>




            </Container>

            {/* Todos os presentes organizados em box lado a lado */}

            {/* Se for a criadora da lista -> botões para editar ou excluir a lista e adicionar presentes */}

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    {listaExemplo.presentes.map((presente) => (
                        <Grid item xs={12} sm={6} md={4} key={presente.id}>
                            <PresenteItem
                                id={presente.id}
                                nome={presente.nome}
                                descricao={presente.descricao}
                                preco={presente.preco}
                                imagem={presente.imagem}
                                links={presente.link}
                                status={presente.status}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>


        </div>
    )
}

export default VerLista