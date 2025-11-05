import { Typography, Button, Box } from "@mui/material";
import Header from "../components/Header";
import HomeImage from "../components/HomeImage";

const Home = () =>{
    return(
    <>
        <Header/>
        {/*tem q ver a imagem desse homeImage ai dpsr*/}

        {/*<HomeImage/>*/}

        <Box sx={{ paddingTop: "80px" }}>
        </Box>

        <Typography variant="h4" color="black" > Listas de presentes para Aniversários, Festas de Debutantes, Casamento e Chá de Bebês! </Typography>

        <Typography variant="body1" color="grey" paddingBottom={8}> Somos o seu parceiro, com quem você pode contar na hora de organizar a lista de presentes mais importantes na sua vida. </Typography>

        <Typography  variant= "h4" color="black"> Como funciona ? </Typography>

        <Box
        sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 5,
            maxWidth: 1200,
            marginTop: 3,
            textAlign: "left"
        }}>


        <Box
        sx={{
            display: "flex",
            alignItems: "flex-start", // alinha pelo topo
            gap: 2,
        }}>
        <Box
        sx={{
            width: 15,
            height: 15,
            backgroundColor: "grey.600",
            borderRadius: "50%",
            mt: "4px", 
        }}/>

            {/* Textos à direita */}
            <Box>
                <Typography variant="h6" color="black">
                    Adicione um produto à sua lista
                </Typography>

                <Typography color="grey.700">
                    Nós compartilharemos o link do produto que você selecionou para os
                    presentiados. Escolha qualquer item, a qualquer preço.
                </Typography>
            </Box>
            </Box>
        </Box>



        <Box
        sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 5,
            maxWidth: 1200,
            marginTop: 3,
            textAlign: "left"
        }}>


        <Box
        sx={{
            display: "flex",
            alignItems: "flex-start", // alinha pelo topo
            gap: 2,
        }}>
        <Box
        sx={{
            width: 15,
            height: 15,
            backgroundColor: "grey.600",
            borderRadius: "50%",
            mt: "4px", 
        }}/>

            {/* Textos à direita */}
            <Box>
                <Typography variant="h6" color="black">
                    Seus convidados compram o produto
                </Typography>

                <Typography color="grey.700">
                    Nós compartilharemos o link do produto que você selecionou para eles.
                </Typography>
            </Box>
            </Box>
        </Box>



        <Box
        sx={{
            backgroundColor: "grey.300",
            p: 3,
            borderRadius: 5,
            maxWidth: 1200,
            marginTop: 3,
            textAlign: "left"
        }}>


        <Box
        sx={{
            display: "flex",
            alignItems: "flex-start", // alinha pelo topo
            gap: 2,
        }}>
        <Box
        sx={{
            width: 15,
            height: 15,
            backgroundColor: "grey.600",
            borderRadius: "50%",
            mt: "4px", 
        }}/>

            {/* Textos à direita */}
            <Box>
                <Typography variant="h6" color="black">
                    Receba o produto no conforto da sua casa
                </Typography>

                <Typography color="grey.700">
                    Ajudaremos seu convidado a enviar o presente diretamente para sua casa, sem problemas, sem intermédios.
                </Typography>
            </Box>
            </Box>
        </Box>


        <Typography  sx= {{marginTop: 5}}variant="h4" color="black"> Relatos de quem realmente se importa! </Typography>
        </>
    )
}

export default Home;