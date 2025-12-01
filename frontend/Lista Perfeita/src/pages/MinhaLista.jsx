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
import DialogBox from "../components/dialogBox";
import { toast } from 'react-toastify';

const MinhaLista = () => {
    const navigate = useNavigate();
    const [listas, setListas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openDelete, setOpenDelete] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // BUSCAR LISTAS
    useEffect(() => {
        const fetchListas = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:8000/giftlist/getLists", {
                    method: "GET",
                    headers: { "token": token }
                });

                if (!res.ok) throw new Error("Erro ao buscar listas");

                const data = await res.json();
                setListas(data.listas || []);

            } catch (error) {
                console.error("Erro ao buscar listas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchListas();
    }, []);

    

    // QUANDO CLICA EM APAGAR
    const handleDeleteClick = (id) => {
        setListToDelete(id);
        setOpenDelete(true);
    };

    // CONFIRMAR EXCLUSÃO
    const confirmDelete = async () => {
        setDeleteLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://localhost:8000/giftlist/deleteList/${listToDelete}`, {
                method: "DELETE",
                headers: { "token": token }
            });

            if (!res.ok) throw new Error("Erro ao apagar lista");

            // remover da UI
            setListas(prev => prev.filter(l => l.id_lista_presente !== listToDelete));

            setOpenDelete(false);

        } catch (err) {
            toast.error("Erro ao apagar lista.");
            console.error(err);
        }

        setDeleteLoading(false);
    };

    // NAVEGAR
    const handleNavigateCreateList = () => {
        navigate("/createList");
    };

    const totalPresentes = listas.reduce((acc, lista) => {
        return acc + (lista.presentes ? lista.presentes.length : 0);
    }, 0);

    const totalComprados = listas.reduce((acc, lista) => {
        if (!lista.presentes) return acc;
        // Conta quantos itens têm status "comprado" nesta lista
        const compradosNestaLista = lista.presentes.filter(p => p.status === "comprado").length;
        return acc + compradosNestaLista;
    }, 0);

    // RETURN DO COMPONENTE
    return (
        <div className="pages">

            <DialogBox
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={confirmDelete}
                loading={deleteLoading}
            />

            <Header />
            <Box paddingTop={10} />

            {/* HEADER DO TÍTULO */}
            <Box sx={{ width: "100%", mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="black" variant="h4" fontWeight="bold">
                        Minhas listas
                    </Typography>

                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)",
                            color: "white",
                            borderRadius: 3,
                            textTransform: "none",
                            border: 'none', 
                                '&:focus': {
                                    outline: 'none',
                                },
                                '&:hover': {
                                    border: 'none',
                                   
                                    backgroundColor: 'transparent',
                                    opacity: 0.9, 
                                }
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

            {/* BOXES RESUMO */}
            <Box display="flex" gap={3} mt={3}>
                <MLBox title="Total de listas" number={listas.length} icon={<CardGiftcardIcon />} />
                <MLBox title="Presentes totais" number={totalPresentes} icon={<PeopleOutlineOutlinedIcon />} />
                <MLBox title="Presentes comprados" number={totalComprados} icon={<CardGiftcardIcon />} />
            </Box>

            {/* LISTA DE CARTÕES */}
            <Box display="flex" flexWrap="wrap" gap={3} mt={3}>

                {loading && (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 5 }}>
                        <CircularProgress size={50} />
                    </Box>
                )}

                {!loading && listas.length === 0 && (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 5 }}>
                        <Typography variant="h6" color="text.secondary">
                            Nenhuma lista criada ainda.
                        </Typography>
                    </Box>
                )}

                {!loading && listas.map(lista => (
                    <MLList
                        key={lista.id_lista_presente}
                        id={lista.id_lista_presente}
                        title={lista.nome_lista}
                        subtitle={lista.descricao_lista}
                        ocasion={lista.ocasiao}
                        date={lista.data_evento}
                        boughtGifts={lista.presentes.filter(p => p.status === "comprado").length || 0}
                        totalGifts={lista.presentes.length || 0}
                        privacidade={lista.privacidade_lista === "private" ? "Privada" : "Compartilhada"}
                        onDelete={handleDeleteClick}
                    />
                ))}
            </Box>
        </div>
    );
};

export default MinhaLista;
