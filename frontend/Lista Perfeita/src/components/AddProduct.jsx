import { Box, Stack, Typography, Button, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const AddProduct = () =>{
    return(
    <Container maxWidth="lg">
        <Box
        sx={{
            border: "2px dashed #ccc", 
            borderRadius: 3,
            p: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            marginBottom: 5,
            height: 280
        }}
        >
            <Stack direction="column" alignItems="center" spacing={1.5}>
                <AddIcon sx={{ fontSize: 70, color: "#ad30e7" }} />
                <Typography variant="h6" fontWeight="bold">Adicionar Presente</Typography>
                <Typography variant="body1" color="grey" > Adicione mais presentes à sua lista </Typography>

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        background: "linear-gradient(90deg, #ea33bd 0%, #ad30e7 100%)",
                        color: "white",
                        textTransform: "none",
                        border: "none",
                    }}
                >
                    Adicionar produto
                </Button>
            </Stack>
        </Box>
    </Container>
    )
}

export default AddProduct;