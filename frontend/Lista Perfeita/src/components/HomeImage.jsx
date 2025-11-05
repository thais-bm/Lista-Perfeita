import { Box, Button, Typography } from "@mui/material"

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
    }}
    >
    {/* Imagemr do fundor, n conseguir baixar do figmar ent botei essa so pra apoio */}

    <img
        src="/background-home.png"
        alt="foto de fundo"
        style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
        }}
    />


    <Box
    sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        textAlign: "center",
    }}
    >
        <Typography variant="h2" sx={{ fontWeight: "bold",  mb: 2 }}>
            Lista Perfeita
        </Typography>

        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 3 }}>
            Seus presentes na palma da mão
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