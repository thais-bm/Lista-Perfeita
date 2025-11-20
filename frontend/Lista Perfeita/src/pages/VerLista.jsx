import React from 'react'
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header'
import { Button, Box, Typography, Stack, LinearProgress, Paper, Container, Grid } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PresenteItem from '../components/PresenteItem';
import AddProduct from '../components/AddProduct';
import ChooseProducts from './ChooseProducts';

import { useNavigate, useParams } from 'react-router-dom';

const VerLista = () => {
    const { id } = useParams(); // pega o ID da URL
    console.log("ID do useParams:", id);
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/minhaLista");
    }

    const [lista, setLista] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDono, setIsDono] = useState(false);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.id; // campo que você usa no JWT
        } catch {
            return null;
        }
    };

    useEffect(() => {
        async function carregar() {
            try {
                const token = localStorage.getItem("token");

                const resp = await fetch(`http://localhost:8000/giftlist/getList/${id}`, {
                    headers: token ? { "token": token } : {}
                });

                const data = await resp.json();
                setLista(data.lista);

                const userId = getUserIdFromToken();
                if (userId && userId === data.lista.id_organizador) {
                    setIsDono(true);   // AGORA FUNCIONA
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        carregar();
    }, [id]);

    if (loading) return (
        <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={50} />
        </Box>
    );

    if (!lista) return <Typography>Lista não encontrada</Typography>;

    const total = lista.presentes.length;
    const comprados = lista.presentes.filter(p => p.status === "comprado").length;
    const porcentagem = total === 0 ? 0 : Math.round((comprados / total) * 100);

    // Renderização da página
    return (
        <div>
            <Header />

            <Box marginTop={12} /> {/* Espaçamento entre o header e o conteúdo da página: 10 + DISTANCIA */}

            {/* informação sobre a lista */}
            <Container maxWidth="lg">
                <Button
                    color='grey'
                    onClick={handleReturn}
                    startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
                    sx={{ fontSize: 15, textTransform: 'none', marginBottom: 2 }}
                >
                    Voltar para as minhas listas
                </Button>

                <Paper elevation={3} sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}>

                    <Box padding={3}>
                        <Box display="flex" flexDirection={'row'}>
                            <Typography color="black" variant="h4" fontWeight="bold">{lista.nome_lista}</Typography>

                            <Button variant='outlined'
                                color='grey'
                                startIcon={<ShareOutlinedIcon />}
                                sx={{
                                    marginLeft: 80,
                                    color: 'black',
                                    borderRadius: 4,
                                    textTransform: 'none',
                                }}>
                                Compartilhar
                            </Button>

                        </Box>

                        <Typography variant="body2" color="grey" sx={{ paddingBottom: 3 }}>{lista.descricao_lista}</Typography>


                        {/* Categoria - data do evento - criadora do evento */}
                        <Stack direction="row" spacing={2} >
                            {/*eu tirei o "initial" das cores pq tava transparente */}
                            <Stack direction="row" spacing={1}>
                                <CardGiftcardIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="grey">{lista.ocasiao}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <EventIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="grey">{lista.data_evento}</Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <PersonIcon sx={{ fontSize: 16, alignSelf: 'center' }} />
                                <Typography variant="body2" color="grey">{lista.organizador}</Typography>
                            </Stack>
                        </Stack>

                        <Box mt={4} backgroundColor="#e8e8e8ff" padding={2} borderRadius={2}>
                            <Stack direction="row" spacing={2} mt={1} justifyContent={'space-between'} >
                                <Typography variant="body2" color="black">Progresso da Lista</Typography> {/*mudei a cor pq n dava pra ver nadakkk*/}
                                <Typography variant="body2" color="black">{comprados} presentes comprados</Typography>
                            </Stack>

                            <LinearProgress
                                variant="determinate"
                                value={porcentagem}
                                sx={{
                                    height: 10,
                                    borderRadius: 2,
                                    backgroundColor: '#eee', // cor do fundo (trilha)
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#000000ff', // cor da parte carregada
                                    },
                                }}
                            />

                            <Typography variant="body2" color="black" paddingTop={1}>{porcentagem}% completo</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>

            {/* Todos os presentes organizados em box lado a lado */}

            {/* Se for a criadora da lista -> botões para editar ou excluir a lista e adicionar presentes */}

            <Container sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={2}>
                    {lista.presentes.map((presente) => (
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


            {/* Adicionar produto condicional -> apenas se o organizador verdadeiro estiver logadoe o add produto tem que receber o id da lista pra sber que lista mexer*/}
            {isDono && (
                <AddProduct listaId={lista.id} />
            )}
        </div>
    )
}

export default VerLista