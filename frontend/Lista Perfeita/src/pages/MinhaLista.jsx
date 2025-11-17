import { useState, useEffect } from 'react'
import { Typography, Button, Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Header from "../components/Header";

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MLBox from "../components/MLBox";

import { useNavigate } from "react-router-dom";
import MLList from "../components/MLList";
import CircularProgress from '@mui/material/CircularProgress';

const MinhaLista = () => {
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchListas = async () => {
            try {
                // Buscar token do localStorage ou de onde estiver armazenado
                const token = localStorage.getItem("token");

                // Envia requisicao com: token no header
                const res = await fetch("http://localhost:8000/giftlist/getLists", {
                    method: "GET",
                    headers: {
                        "token": token
                    }
                });

                // Verifica se a resposta foi ok
                if (!res.ok) {
                    throw new Error("Erro ao buscar listas");
                }

                // Pega os dados em formato JSON
                const data = await res.json();
                setListas(data.listas || []);


            } catch (error) {
                console.error("Erro ao buscar listas:", error);
            }

            finally {
                setLoading(false);
            }
        }

        fetchListas();
    }, []);


    const handleNavigateCreateList = () => {
        navigate("/createList")
    }

    console.log("Listas:", listas);

    return (
        <div className="pages">
            <Header />
            <Box paddingTop={10} />

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
            >

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography color="black" variant="h4" fontWeight="bold">
                        Minhas listas
                    </Typography>

                    <Button
                        variant="outlined"
                        color="white"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)",
                            color: 'white',
                            borderRadius: 3,
                            textTransform: 'none',
                        }}
                        onClick={handleNavigateCreateList}
                    >
                        Nova Lista
                    </Button>
                </Box>

                <Typography color="grey" variant="body2" sx={{ mt: 1 }}>
                    Gerencie suas listas de presentes e acompanhe o processo
                </Typography>
            </Box>

            <Box display={"flex"} sx={{ gap: 3, marginTop: 3 }}>
                <MLBox
                    title="Total de listas"
                    number={listas.length}
                    icon={<CardGiftcardIcon />}
                />

                <MLBox
                    title="Presentes totais"
                    number={0}
                    icon={<PeopleOutlineOutlinedIcon />}
                />

                <MLBox
                    title="Presentes comprados"
                    number={0}
                    icon={<CardGiftcardIcon />}
                />
            </Box>

            <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                mt={3}>
                {loading && <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 5
                    }}
                >
                    <CircularProgress size={50} />
                </Box>}

                {!loading && listas.length === 0 && (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 5
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Nenhuma lista criada ainda.
                        </Typography>
                    </Box>
                )}

                {!loading &&
                    listas.map((lista) => (
                        <MLList
                            key={lista.id_lista_presente}
                            title={lista.nome_lista || "Lista sem nome"}
                            subtitle={lista.descricao_lista || "Sem descrição"}
                            privacidade={lista.privacidade_lista === "private" ? "Privada" : "Compartilhada"}
                            ocasion={lista.ocasiao || "Sem ocasião"}
                            date={lista.data_evento || "Sem data"}
                            boughtGifts={lista.comprados || 0}
                            totalGifts={lista.total || 0}
                        />
                    ))}
            </Box>
        </div >
    )
}

export default MinhaLista