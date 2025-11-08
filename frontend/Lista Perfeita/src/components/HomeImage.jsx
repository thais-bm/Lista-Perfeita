import { Box, Button, Typography } from "@mui/material"

//desisto de tentar fazer isso funcionar
//essa imagem n estica de jeito nenhum

const HomeImage = () =>{
    return(
    <>
    {/*Box da Imagem :D*/}
    <Box
    sx={{      
        position: 'relative',
        width: "100%",
        height: "80vh",           
        overflow: "hidden",
        marginBottom: 3
    }}
    >
    {/* Imagemr do fundor, n conseguir baixar do figmar ent botei essa so pra apoio */}

    <img
        src="/background-home.png"
        alt="foto de fundo"
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            zIndex: -1,
        }}
    />

    <Box
    sx={{
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        textAlign: "center",
        color: "white", // texto branco pra destacar
          zIndex: 1, // garante que fique acima da imagem
          px: 2, // padding lateral (ajuda em telas menores)
    }}
    >
        <Typography variant="h2" sx={{ fontWeight: "bold",  mb: 2 }}>
            Lista Perfeita
        </Typography>

        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 3 }}>
            A maneira mais fácil de criar listas de presentes personalizadas, receber sugestões inteligentes e compartilhar com amigos e família.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center",
            "& .MuiButton-root": {          
                textTransform: "none",
            }, }}>

            <Button
            variant="contained"
            sx={{
                backgroundColor: "white", 
                borderRadius: '10px',
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#fff" },
            }}
            >
            Criar nova lista de presentes
            </Button>

            <Button
            variant="outlined"
            sx={{
                borderColor: "white",
                borderRadius: '10px',
                color: "white",
                fontWeight: "bold",
                "&:hover": {  borderColor: "white" },
            }}
            >
            Descobrir presente ideal
            </Button>
        </Box>
        </Box>
    </Box>
    </>
    )
}

export default HomeImage;