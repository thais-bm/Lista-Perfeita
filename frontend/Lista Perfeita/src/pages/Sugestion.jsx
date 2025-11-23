import { useState } from "react"; // Importar useState
import { Typography, Box, TextField, MenuItem, Select, Button, Grid, CircularProgress, Card, CardContent, CardMedia, Link } from "@mui/material"; // Adicionei componentes para exibir o resultado
import Header from "../components/Header";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PersonIcon from '@mui/icons-material/Person';

const Sugestion = () => {
    const genderOptions = ["Feminino", "Masculino", "Outro", "Prefiro não dizer"];
    const interestOptions = ["Tecnologia", "Livros e Literatura", "Esportes e Fitness", "Culinária e Gastronomia", "Música", "Cinemas e Série", "Viagem", "Arte e Design", "Jogos e Games", "Moda e Estilo", "Natureza e Meio Ambiente", "Fotografia", "Artesanato", "Pets e Animais", "Casa e Decoração", "Beleza e Cuidados Pessoais", "Investimentos e Finanças", "Educação e Cursos"];

    // Estados para o formulário
    const [formData, setFormData] = useState({
        nome: "",
        idade: "",
        genero: "",
        ocasiao: "",
        min_preco: "",
        max_preco: "",
        interesses: [] // Simplificado para um único interesse no select por enquanto, ou array se for múltiplo
    });

    const [loading, setLoading] = useState(false);
    const [sugestoes, setSugestoes] = useState(null); // Para guardar a resposta da API

    // Atualiza os dados do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Lida com a seleção de interesse (adicionando ao array)
    const handleInterestChange = (e) => {
        const value = e.target.value;
        if (value && !formData.interesses.includes(value)) {
            setFormData(prev => ({
                ...prev,
                interesses: [value] // Por simplicidade do exemplo, substituindo. Para múltiplos, use [...prev.interesses, value]
            }));
        }
    };

    // Função para chamar a API
    const handleGenerate = async () => {
        setLoading(true);
        setSugestoes(null);
        try {
            const response = await fetch("http://localhost:8000/sugestions/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    idade: parseInt(formData.idade) || 0,
                    min_preco: parseFloat(formData.min_preco) || 0,
                    max_preco: parseFloat(formData.max_preco) || 0,
                })
            });

            const data = await response.json();
            setSugestoes(data);
        } catch (error) {
            console.error("Erro ao buscar sugestões:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Box paddingTop={13} />

            <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
                <Typography variant='h4' fontWeight="bold"> Sugestões Inteligentes </Typography>
                <Typography color='grey' variant="body1"> Nossa IA analisa o perfil da pessoa e sugere presentes personalizados baseados nos interesses e ocasião.</Typography>
            </Box>

            <Box display={"flex"} justifyContent={"center"} sx={{ gap: 3, flexDirection: 'row', flexWrap: 'wrap', px: 2 }}>

                {/* Formulário */}
                <Box
                    sx={{
                        mt: 5,
                        backgroundColor: "white",
                        width: 450,
                        borderRadius: 4,
                        boxShadow: 2,
                        p: 4,
                        mb: 3,
                        height: "fit-content"
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon color="secondary" />
                        <Typography fontWeight="bold" variant="h6"> Perfil da Pessoa </Typography>
                    </Box>
                    <Typography variant="body2" color="grey" mb={2}> Preencha as informações para gerar sugestões personalizadas </Typography>

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={6}>
                            <Typography fontWeight="bold" variant="body2" mb={0.5}> Nome </Typography>
                            <TextField fullWidth name="nome" value={formData.nome} onChange={handleChange} label="Ex: Maria" variant="outlined" size="small" />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontWeight="bold" variant="body2" mb={0.5}> Idade </Typography>
                            <TextField fullWidth name="idade" value={formData.idade} onChange={handleChange} label="Ex: 25" variant="outlined" size="small" type="number" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={6}>
                            <Typography fontWeight="bold" variant="body2" mb={0.5}> Gênero </Typography>
                            <Select fullWidth name="genero" value={formData.genero} onChange={handleChange} displayEmpty sx={{ height: 40 }}>
                                <MenuItem value="" disabled>Selecione</MenuItem>
                                {genderOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontWeight="bold" variant="body2" mb={0.5} > Ocasião </Typography>
                            <Select fullWidth name="ocasiao" value={formData.ocasiao} onChange={handleChange} displayEmpty sx={{ height: 40 }}>
                                <MenuItem value="" disabled>Selecione</MenuItem>
                                <MenuItem value="Aniversário">Aniversário</MenuItem>
                                <MenuItem value="Natal">Natal</MenuItem>
                                <MenuItem value="Amigo Secreto">Amigo Secreto</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} mb={2}>
                        <Typography fontWeight="bold" variant="body2" mb={1}> Faixa de Preço (R$) </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField fullWidth name="min_preco" value={formData.min_preco} onChange={handleChange} label="Mínimo" variant="outlined" size="small" type="number" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth name="max_preco" value={formData.max_preco} onChange={handleChange} label="Máximo" variant="outlined" size="small" type="number" />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} >
                        <Typography fontWeight="bold" variant="body2" > Interesses </Typography>
                        <Select fullWidth onChange={handleInterestChange} value="" displayEmpty size="small">
                            <MenuItem value="" disabled>Adicionar interesse</MenuItem>
                            {interestOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                        {/* Exibir interesses selecionados */}
                        <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
                            {formData.interesses.map((int, i) => (
                                <Typography key={i} variant="caption" sx={{ background: "#eee", p: 0.5, borderRadius: 1 }}>{int}</Typography>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} mt={5}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleGenerate}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeOutlinedIcon />}
                            sx={{
                                textTransform: "none", fontWeight: "bold", borderRadius: 4, color: "white",
                                background: "linear-gradient(90deg, #fd70da 0%, #ad30e7 100%)", height: 45
                            }}
                        >
                            {loading ? "Gerando..." : "Gerar Sugestões"}
                        </Button>
                    </Grid>
                </Box>

                {/* Área de Resultado */}
                <Box
                    backgroundColor='white'
                    width={520}
                    minHeight={260}
                    justifyContent={!sugestoes ? "center" : "flex-start"}
                    flexDirection={"column"}
                    display={"flex"}
                    boxShadow={2}
                    sx={{ marginTop: 5, borderRadius: 4, p: 3, mb: 3 }}
                >
                    {!sugestoes && !loading && (
                        <>
                            <AutoAwesomeOutlinedIcon sx={{ alignSelf: 'center', fontSize: "100px", color: 'grey', mb: 3 }} />
                            <Typography fontWeight="bold" align="center"> Aguardando sugestões </Typography>
                            <Typography variant="body2" color="grey" align="center"> Preencha o formulário ao lado e clique em "Gerar Sugestões". </Typography>
                        </>
                    )}

                    {loading && (
                        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                            <CircularProgress />
                        </Box>
                    )}

                    {sugestoes && sugestoes.searches && (
                        <Box>
                            <Typography variant="h6" fontWeight="bold" mb={2}>Sugestões da IA:</Typography>
                            <Typography variant="body2" paragraph fontStyle="italic" bgcolor="#f9f9f9" p={2} borderRadius={2}>
                                "{sugestoes.brainstorm}"
                            </Typography>

                            {sugestoes.searches.map((item, index) => (
                                <Box key={index} mb={3} borderBottom="1px solid #eee" pb={2}>
                                    <Typography fontWeight="bold" color="secondary">{item["search query"]}</Typography>
                                    <Typography variant="body2" color="text.secondary" mb={1}>{item["ai reasoning"]}</Typography>
                                    
                                    {/* Renderiza os produtos encontrados no Zoom */}
                                    <Box display="flex" gap={2} overflow="auto">
                                        {item["search results"] && item["search results"].length > 0 ? (
                                            item["search results"].map((prod, idx) => (
                                                <Card key={idx} sx={{ minWidth: 120, maxWidth: 120, boxShadow: 1 }}>
                                                    <CardMedia component="img" height="100" image={prod.image || "https://via.placeholder.com/100"} alt={prod.title} />
                                                    <CardContent sx={{ p: 1 }}>
                                                        <Typography variant="caption" display="block" noWrap>{prod.title}</Typography>
                                                        <Typography variant="caption" fontWeight="bold" color="green">{prod.price}</Typography>
                                                        <Link href={prod.link} target="_blank" rel="noopener" variant="caption" display="block">Ver Loja</Link>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <Typography variant="caption">Nenhum produto encontrado.</Typography>
                                        )}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}

export default Sugestion;