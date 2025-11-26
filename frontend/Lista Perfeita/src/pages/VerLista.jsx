import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/Header';
import { Button, Box, Typography, Stack, LinearProgress, Paper, Container, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import PresenteItem from '../components/PresenteItem';
import AddProduct from '../components/AddProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { AddProductContext } from '../contexts/AddProductContext';
import { ToastContainer, toast } from 'react-toastify';

const VerLista = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lista, setLista] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDono, setIsDono] = useState(false);


    const handleReturn = () => navigate("/minhaLista");

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.id;
        } catch {
            return null;
        }
    };

    const carregarLista = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const resp = await fetch(`http://localhost:8000/giftlist/getList/${id}`, {
                headers: token ? { "token": token } : {}
            });

            if (!resp.ok) {
                setLista(null);
                setIsDono(false);
                return;
            }

            const data = await resp.json();

            if (!data.lista) {
                setLista(null);
                setIsDono(false);
                return;
            }

            const userId = getUserIdFromToken();
            const dono = userId && userId === data.lista.id_organizador;

            setLista(data.lista);
            setIsDono(dono);
        } catch (err) {
            console.error("Erro ao carregar a lista:", err);
            setLista(null);
            setIsDono(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarLista();
    }, [id]);



    const adicionarProduto = async (produto) => {
        const token = localStorage.getItem("token");

        try {
            const resp = await fetch(`http://localhost:8000/giftlist/addItem/${id}`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify(produto)
            });

            if (resp.ok) {
                console.log("Produto adicionado com sucesso. Recarregando a lista...");
                await carregarLista();
            } else {
                const errorData = await resp.json();
                console.error("Falha ao adicionar produto. Status:", resp.status, "Erro:", errorData);
                toast.error(`Erro ao adicionar produto: ${errorData.detail || 'Verifique sua conexão e permissões.'}`);
            }
        } catch (err) {
            console.error("Erro de rede ao adicionar produto:", err);
            toast.error("Erro de conexão ao tentar adicionar o produto.");
        }
    };

    const marcarItem = async (itemId, nomeComprador) => {
        const token = localStorage.getItem("token");

        try {
            const resp = await fetch(`http://localhost:8000/giftlist/markItem/${id}/${itemId}`, {
                method: "POST",
                headers: {
                    "token": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comprado_por: nomeComprador })
            });

            if (resp.ok) {
                toast.success("Item marcado como comprado!");
                await carregarLista();
            } else {
                const errorData = await resp.json();
                toast.error(`Erro ao marcar item: ${errorData.detail || 'Falha na comunicação.'}`);
            }
        } catch (err) {
            console.error("Erro ao marcar item:", err);
            toast.error("Erro de rede.");
        }
    };

    const desmarcarItem = async (itemId) => {
        const token = localStorage.getItem("token");

        try {
            const resp = await fetch(`http://localhost:8000/giftlist/unmarkItem/${id}/${itemId}`, {
                method: "POST",
                headers: { "token": token }
            });

            if (resp.ok) {
                alert("Item desmarcado!");
                await carregarLista();
            } else {
                const errorData = await resp.json();
                alert(`Erro ao desmarcar item: ${errorData.detail || 'Falha na comunicação.'}`);
            }
        } catch (err) {
            console.error("Erro ao desmarcar item:", err);
            alert("Erro de rede.");
        }
    };

    const compartilharLista = async () => {
        const token = localStorage.getItem("token");

        try {
            const resp = await fetch(`http://localhost:8000/giftlist/shareList/${id}`, {
                method: "GET",
                headers: { "token": token }
            });

            if (resp.ok) {
                const data = await resp.json();
                prompt("Link de Compartilhamento:", data.share_link);
            } else {
                const errorData = await resp.json();
                toast.error(`Erro ao compartilhar: ${errorData.detail || 'Falha ao gerar link.'}`);
            }
        } catch (err) {
            console.error("Erro ao compartilhar lista:", err);
            toast.error("Erro de rede ao compartilhar.");
        }
    };

    const removerItem = async (itemId) => {
        const token = localStorage.getItem("token");

        if (!window.confirm("Tem certeza que deseja remover este item da lista?")) {
            return;
        }

        try {
            const resp = await fetch(`http://localhost:8000/giftlist/removeItem/${id}/${itemId}`, {
                method: "DELETE",
                headers: { "token": token }
            });

            if (resp.ok) {
                toast.success("Item removido com sucesso!");
                await carregarLista();
            } else {
                let detail = 'Falha na comunicação ou erro desconhecido.';
                try {
                    const errorData = await resp.json();
                    detail = errorData.detail || detail;
                } catch (e) {
                    console.warn("Resposta de erro não é JSON. Status:", resp.status);
                    detail = `Erro HTTP ${resp.status}. Verifique as permissões.`;
                }
                toast.error(`Erro ao remover item: ${detail}`);
            }
        } catch (err) {
            console.error("Erro de rede ao remover item:", err);
            toast.error("Erro de rede. Verifique se o servidor backend está ativo.");
        }
    };


    if (loading) return (
        <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
            <CircularProgress size={50} />
        </Box>
    );

    if (!lista) return <Typography>Lista não encontrada</Typography>;

    const presentes = lista.presentes || [];
    const total = presentes.length;
    const comprados = presentes.filter(p => p.status === "comprado").length;
    const porcentagem = total === 0 ? 0 : Math.round((comprados / total) * 100);

    const contextValue = {
        listaId: id,
        onAdd: adicionarProduto
    };

    return (
        <AddProductContext.Provider value={contextValue}>
            <ToastContainer />
            <div>
                <Header />
                <Box marginTop={12} />

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
                            <Box display="flex">
                                <Typography color="black" variant="h4" fontWeight="bold">
                                    {lista.nome_lista}
                                </Typography>



                                {lista.privacidade_lista === "Compartilhada" ? (
                                    <Button
                                        variant='outlined'
                                        onClick={compartilharLista}
                                        color='grey'
                                        startIcon={<ShareOutlinedIcon />}
                                        sx={{
                                            marginLeft: "auto",
                                            color: 'black',
                                            borderRadius: 4,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Compartilhar
                                    </Button>
                                ) : null}
                            </Box>

                            <Typography variant="body2" color="grey" sx={{ paddingBottom: 3 }}>
                                {lista.descricao_lista}
                            </Typography>

                            <Stack direction="row" spacing={2}>
                                <Stack direction="row" spacing={1}>
                                    <CardGiftcardIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" color="grey">{lista.ocasiao}</Typography>
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <EventIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" color="grey">{lista.data_evento}</Typography>
                                </Stack>

                                <Stack direction="row" spacing={1}>
                                    <PersonIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" color="grey">{lista.organizador}</Typography>
                                </Stack>
                            </Stack>

                            <Box mt={4} backgroundColor="#e8e8e8ff" padding={2} borderRadius={2}>
                                <Stack direction="row" mt={1} justifyContent={'space-between'}>
                                    <Typography variant="body2" color="black">Progresso da Lista</Typography>
                                    <Typography variant="body2" color="black">{comprados} presentes comprados</Typography>
                                </Stack>

                                <LinearProgress
                                    variant="determinate"
                                    value={porcentagem}
                                    sx={{
                                        height: 10,
                                        borderRadius: 2,
                                        backgroundColor: '#eee',
                                        '& .MuiLinearProgress-bar': { backgroundColor: '#000000ff' },
                                    }}
                                />

                                <Typography variant="body2" color="black" paddingTop={1}>
                                    {porcentagem}% completo
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Container>

                <Container sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2}>
                        {presentes.map((presente) => (
                            <Grid item xs={12} sm={6} md={4} key={presente.id}>
                                <PresenteItem
                                    id={presente.id}
                                    nome={presente.nome}
                                    descricao={presente.descricao}
                                    preco={presente.preco}
                                    imagem={presente.imagem}
                                    links={presente.link}
                                    status={presente.status}
                                    organizador={lista.organizador}
                                    comprado_por={presente.comprado_por}
                                    onMark={isDono ? marcarItem : null}
                                    onUnmark={isDono ? desmarcarItem : null}
                                    onRemove={isDono ? removerItem : null}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>

                {isDono && <AddProduct />}


            </div>
        </AddProductContext.Provider>
    );
};

export default VerLista;