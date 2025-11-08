import { Box, Typography, Button } from "@mui/material";
import Header from "../components/Header";
import HomeImage from "../components/HomeImage";
import HomeBox from "../components/HomeBox";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import HomeResources from "../components/HomeResources";

import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    
    const navigateSignIn = () =>{
        navigate('/signin');
    }

    return (
    <div className="pages">
        <Header />

        <Box paddingTop={10}/>

        {/*<HomeImage/>*/}

        <Typography variant="h2"
        sx={{
            background: "linear-gradient(90deg, #f019bbff 0%, #8d00ceff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
        }}
        >
        Crie e Compartilhe
        </Typography>
            
        <Typography variant="h2"
        sx={{
            background: "linear-gradient(90deg, #960a9bff 0%, #c872f0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            mb: 2
        }}
        >
        Lista de Presentes
        </Typography>

        <Typography variant="body1" color="grey"> A maneira mais fácil de criar listas de presentes personalizadas, receber sugestões</Typography>
        <Typography variant="body1" color="grey" mb={4}> inteligentes e compartilhar com amigos e família. </Typography>

            <Box gap={3} 
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"} 
                flexDirection={"row"}
                marginBottom={7}
            >
                <Button variant='outlined' color='black'
                    sx={{borderRadius: 2, textTransform:'none', background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)", color: 'white'}}
                    startIcon={<FavoriteBorderOutlinedIcon />}
                    onClick={navigateSignIn}
                >
                    Criar Minha Lista
                </Button>

                <Button variant='outlined' color='black'
                    sx={{ borderRadius: 2,color: '#ff00bfff', textTransform:'none'}}
                    startIcon={<AutoAwesomeOutlinedIcon/>}
                    onClick={navigateSignIn}
                >
                    Ver Sugestões
                </Button>
            </Box>


            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: 3, marginRight: 5 }}>
                <HomeBox
                    color="#d200afff"
                    icon={<CardGiftcardIcon />}
                    title="Fácil de criar"
                    subtitle="Adicione presentes rapidamente com links automáticos para Amazon, Mercado Livre e outras lojas."
                />

                <HomeBox
                    color="#7e009dff"
                    icon={<AutoAwesomeOutlinedIcon />}
                    title="Sugestões inteligentes"
                    subtitle="IA personalizada sugere presentes baseados nos interesses e perfil da pessoa"
                />

                <HomeBox
                    color="#0400e9ff"
                    icon={<ShareOutlinedIcon />}
                    title="Compartilhamento Simples"
                    subtitle="Compartilhe com um link único. Amigos podem marcar presentes como comprados."
                />
            </Box>

            <Typography marginTop="80px" color="black" variant="h4" sx={{ fontWeight: "bold" }}> Tudo o que você precisa para o presente perfeito </Typography>
            <Typography color="black" sx={{ opacity: '70%' }}> Recursos pensados para tornar a experiência de dar e receber presentes mais especial. </Typography>

            <Box display={"flex"} sx={{ gap: 3, marginLeft: 3 }}>
                <HomeResources
                    color="#ff83daff"
                    icon={<SellOutlinedIcon />}
                    title="Links Afiliados"
                    subtitle="Encontre automaticamente os melhores preços em Amazon, Mercado Livre e outras lojas."
                />

                <HomeResources
                    color="#ab4cbeff"
                    icon={<PeopleOutlineOutlinedIcon />}
                    title="Colaborativo"
                    subtitle="Amigos e família podem ver a lista e marcar presentes como reservados ou comprados."
                />

                <HomeResources
                    color="#649ce1ff"
                    icon={<StarBorderOutlinedIcon />}
                    title="Personalizado"
                    subtitle="Organize por prioridade, categoria e ocasião. Cada lista é única como você."
                />
            </Box>

            <Box sx={{
                background: "linear-gradient(90deg, #ff5edf 0%, #845ef7 100%)",
                gap: 5,
                p: 4,
                color: "white",
                textAlign: "center",
                borderRadius: 3
            }}>
                <Typography variant="h4"> Pronto para criar sua primeira lista?</Typography>
                <Typography sx={{ marginTop: 1, marginBottom: 2.5}} variant="body2"> Comece agora e torne cada ocasião mais memorável.</Typography>

                <Button variant='outlined' color='black'
                    sx={{ 
                        borderRadius: 2,
                        color: '#ff00bfff',
                        textTransform:'none', 
                        backgroundColor:'white',
                    }}
                    startIcon={<AutoAwesomeOutlinedIcon/>}
                    onClick={navigateSignIn}
                >
                    Criar lista agora
                </Button>

            </Box>

        </div>
    )
}

export default Home;