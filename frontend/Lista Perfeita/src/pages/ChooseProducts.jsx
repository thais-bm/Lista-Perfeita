import { useState } from "react";
import axios from "axios";
import {
    Dialog, DialogContent, Typography, TextField,
    Stack, Button, Container
} from "@mui/material";
import ProdutoItem from "../components/ProdutoItem";

const ChooseProducts = ({ open, onClose }) => {
    const [searchText, setSearchText] = useState("");
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchText.trim()) return;

        try {
            setLoading(true);

            const res = await axios.post("http://localhost:8000/giftlist/search", {
                termo: searchText
            });

            setResultados(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Typography color="black" fontWeight="bold" mb={2}>
                    Selecione os presentes
                </Typography>

                <Stack direction="row" spacing={2} mb={3}>
                    <TextField
                        label="Escreva o presente..."
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 500 }}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSearch}
                        sx={{
                            background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                            color: "white",
                            textTransform: "none",
                        }}
                    >
                        Buscar
                    </Button>
                </Stack>

                <Container>
                    {loading && <Typography>Carregando...</Typography>}

                    {!loading && resultados.length === 0 && (
                        <Typography color="grey">Nenhum produto encontrado</Typography>
                    )}

                    <Stack spacing={2} alignItems="center">
                        {resultados.map((item) => (
                            <ProdutoItem
                                key={item.id}
                                id={item.id}
                                nome={item.nome}
                                descricao={item.descricao}
                                preco={item.preco}
                                imagem={item.imagem}
                                links={item.link}
                                status={item.status}
                            />
                        ))}
                    </Stack>
                </Container>

                <Stack direction="row" spacing={3} mt={4}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{ width: 250, textTransform: "none", color: "black" }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            width: 250,
                            textTransform: "none",
                            background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                            color: "white",
                        }}
                    >
                        Confirmar
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ChooseProducts;
