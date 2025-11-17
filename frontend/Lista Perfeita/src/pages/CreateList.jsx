import { Typography, Box, FormGroup, TextField, Select, MenuItem, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Header from "../components/Header";

import CreateListBox from "../components/CreateListBox";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';




const CreateList = () => {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [occasion, setOccasion] = useState("");
    const [dateEvent, setDateEvent] = useState("");
    const [privacy, setPrivacy] = useState("publica");
    const selectOptions = ["Natal", "Aniversário", "Dia dos Namorados", "Dia das Mães", "Dia dos Pais", "Casamento",
        "Formatura", "Chá de Bebê", "Chá de Panela", "Amigo Secreto", "Páscoa", "Dia da Mulher", "Aposentadoria", "Sem Ocasião Específica"
    ]

    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/minhaLista")
    }

    const API = "http://localhost:8000"

    const criarLista = async () => {
        const token = localStorage.getItem("token"); // Pegando o token do localStorage

        // Corpo da requisição
        const body = {
            nome_lista: title,
            descricao_lista: description,
            ocasiao: occasion,
            data_evento: dateEvent,
            privacidade_lista: privacy,
        };

        const response = await fetch(`${API}/giftlist/createList`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(body)
        });

        console.log("TOKEN ENVIADO:", localStorage.getItem("token"))

        const data = await response.json();
        console.log(data);
    };

    return (
        <>
            <Header />
            <Box marginTop={10} />

            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" >
                <Box sx={{
                    width: 600,
                    textAlign: "left",
                }}
                >
                    <Button
                        color="grey"
                        onClick={handleNavigate}
                        startIcon={<ArrowBackIcon sx={{ fontSize: 13 }} />}
                        sx={{ mb: 1, fontSize: 13 }}
                    >
                        Voltar para as minhas listas
                    </Button>

                    <Typography color="black" variant="h4" fontWeight="bold">
                        Criar Nova Lista
                    </Typography>

                    <Typography color="grey" variant="body2" sx={{ mb: 2 }}>
                        Preencha as informações para criar sua lista de presentes
                    </Typography>
                </Box>

                <Box width="570px" height="800px"
                    sx={{
                        backgroundColor: "white",
                        borderRadius: 4,
                        boxShadow: 3,
                        marginTop: 3,
                        marginBottom: 3,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >

                    <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
                        <CardGiftcardIcon sx={{ marginRight: 1, color: "#eb56afff" }} />
                        <Typography fontWeight="bold" variant="h6">
                            Informações da lista
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="grey" sx={{ marginBottom: 3 }}>
                        Configure os detalhes básicos da lista de presente
                    </Typography>

                    <FormGroup sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}>

                        <Typography fontWeight="bold" variant="body2">Título da lista *</Typography>
                        <TextField
                            id="title"
                            label="Ex: Meu Aniversário de 25 anos"
                            variant="outlined"
                            size="small"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{
                                width: "100%",
                                borderRadius: 2,
                                marginBottom: 3,
                            }}

                        />

                        <Typography fontWeight="bold" variant="body2">Descrição</Typography>
                        <TextField
                            id="description"
                            label="Descreva sua lista de presentes (opcional)"
                            variant="outlined"
                            size="medium"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{
                                width: "100%",
                                borderRadius: 2,
                                marginBottom: 3,
                            }}
                        />

                        <Typography fontWeight="bold" variant="body2">Ocasião *</Typography>
                        <Select
                            labelId="select-label"
                            id="ocasion"
                            label="Selecione uma opção"
                            size="small"
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            sx={{
                                width: 200,
                                borderRadius: 2,
                                marginBottom: 3,
                            }}
                        >
                            {selectOptions.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography fontWeight="bold" variant="body2">Data do Evento</Typography>
                        <TextField
                            type="date"
                            value={dateEvent}
                            onChange={(e) => setDateEvent(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />

                        <Typography fontWeight="bold" variant="body2" sx={{ marginTop: 3 }}>
                            Privacidade da Lista
                        </Typography>

                        <RadioGroup value={privacy}>
                            <CreateListBox
                                icon={<InsertLinkOutlinedIcon sx={{ color: "blue" }} />}
                                title="Compartilhar por Link"
                                subtitle="Apenas pessoas com este link pode ver sua lista"
                                value="shared"
                                selectedValue={privacy}
                                onChange={setPrivacy}
                            >
                            </CreateListBox>

                            <CreateListBox
                                icon={<LockOutlinedIcon sx={{ color: "grey" }} />}
                                title="Privado"
                                subtitle="Apenas você pode ver essa lista"
                                value="private"
                                selectedValue={privacy}
                                onChange={setPrivacy}
                            ></CreateListBox>

                        </RadioGroup>


                    </FormGroup>

                    <Box display={"flex"} justifyContent={"center"} gap={4} marginTop={4} marginLeft={5}>
                        <Button width="100px" variant="outlined" color="grey"
                            sx={{
                                width: 220,
                                color: 'black',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                borderRadius: 3
                            }}> Cancelar </Button>
                        <Button 
                            onClick={criarLista}
                        sx={{
                            background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)",
                            color: "white",
                            width: 220,
                            borderRadius: 3,
                        }} startIcon={<CardGiftcardIcon />} >
                            Criar lista
                        </Button>
                    </Box>

                </Box>

                <Box sx={{
                    backgroundColor: '#f9e9f5f7',
                    border: '1px solid pink',
                    borderRadius: 5,
                    width: 570,
                    height: 150,
                    padding: 3,
                    marginBottom: 4
                }}>
                    <Typography align="left" variant="body1" fontWeight="bold" marginTop={2} marginBottom={1}> Próximos passos </Typography>
                    <Typography align="left"> • Adicione um item a sua lista </Typography>
                    <Typography align="left"> • Use nossas sugestões inteligentes baseadas em IA </Typography>
                    <Typography align="left"> • Compartilhe com amigos e família </Typography>
                    <Typography align="left"> • Acompanhe o progresso dos presentes comprados </Typography>
                </Box>
            </Box>
        </>
    )
}

export default CreateList;