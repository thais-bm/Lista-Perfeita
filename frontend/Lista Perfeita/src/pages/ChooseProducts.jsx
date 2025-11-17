import { Box, Dialog, Typography, DialogContent, TextField, Stack, Button, Container, Grid } from "@mui/material";
import ProdutoItem from "../components/ProdutoItem";

const ChooseProducts = ({ open, onClose }) =>{
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

    return(
    <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth={false} 
    PaperProps={{
        sx: {
        borderRadius: 4,
        overflowX: 'hidden',
        width: 1000, 
        maxWidth: '90%', 
        },
    }}
    >
        <DialogContent sx={{borderRadius: 4, alignItems:'center', display:'flex', flexDirection:'column'}}>
            <Typography color="black" fontWeight="bold" mb={1}>
                Selecione os presentes
            </Typography>

            <TextField
            label="Escreva o presente..."
            variant="outlined"
            sx={{ mb: 3, width: 700,
                '& .MuiOutlinedInput-root': {
                borderRadius: 2, 
            },}}
            
            />

            {/*aq q vai botar os produtos do scrapper n sei oq*/}
            <Container sx={{ mt: 4, mb: 4 }}>
                <Stack container spacing={2} alignItems='center' display="flex" flexDirection="column" >
                    {listaExemplo.presentes.map((presente) => (
                            <ProdutoItem
                                id={presente.id}
                                nome={presente.nome}
                                descricao={presente.descricao}
                                preco={presente.preco}
                                imagem={presente.imagem}
                                links={presente.link}
                                status={presente.status}
                            />
                    ))}
                </Stack>
            </Container>

            <Stack direction="row" spacing={3} justifyContent="center">
            <Button variant="outlined" color= 'grey' onClick={onClose} sx={{ 
                textTransform: 'none',
                width: 300,
                color: 'black'
                }}>
                Cancelar
            </Button>

            <Button
                variant="contained"
                sx={{
                textTransform: 'none',
                width: 300, 
                background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                color: 'white',
                '&:hover': { backgroundColor: '#333' },
                }}
            >
                Confirmar
            </Button>
            </Stack>
        </DialogContent>
    </Dialog>
    )
}

export default ChooseProducts;