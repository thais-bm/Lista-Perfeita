import { Typography, Box, TextField, MenuItem, Select, Button, Grid } from "@mui/material";
import Header from "../components/Header";
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PersonIcon from '@mui/icons-material/Person';

const Sugestion = () =>{
    const gender =  ["Feminino", "Masculino", "Outro", "Prefiro não dizer"]
    const interests = ["Tecnologia", "Livros e Literatura", "Esportes e Fitness", "Culinária e Gastronomia", "Música", "Cinemas e Série"
        , "Viagem", "Arte e Design", "Jogos e Games", "Moda e Estilo", "Natureza e Meio Ambiente", "Fotografia", "Artesanato", "Pets e Animais",
        "Casa e Decoração", "Beleza e Cuidados Pessoais", "Investimentos e Finanças", "Educação e Cursos"]
        
    return(
    <>
    <Header/>
    <Box paddingTop={13}/>
    
    
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
        <Typography variant='h4' fontWeight="bold"> Sugestões Inteligentes </Typography>
        <Typography color='grey' variant="body1"> Nossa IA analisa o perfil da pessoa e sugere presentes personalizados baseados nos interesses e ocasião.</Typography>
    </Box>

    <Box display={"flex"} justifyContent={"center"} sx={{gap: 3}} >
    
    <Box
        sx={{
        mt: 5,
        backgroundColor: "white",
        width: 450,
        borderRadius: 4,
        boxShadow: 2,
        p: 4,
        mb: 3
        }}
    >

        <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon color="secondary" />
            <Typography fontWeight="bold" variant="h6">
                Perfil da Pessoa
            </Typography>
        </Box>
        <Typography variant="body2" color="grey" mb={2}>
        Preencha as informações para gerar sugestões personalizadas
        </Typography>

            <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
                <Typography fontWeight="bold" variant="body2" mb={0.5}>
                    Nome
                </Typography>
                <TextField fullWidth label="Ex: Maria" variant="outlined" size="small" />
            </Grid>


            <Grid item xs={6}>
                <Typography fontWeight="bold" variant="body2" mb={0.5}>
                    Idade
                </Typography>
                <TextField fullWidth label="Ex: 25" variant="outlined" size="small" />
            </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>    
                <Typography fontWeight="bold" variant="body2" mb={0.5}>
                    Gênero
                </Typography>
                <Select fullWidth defaultValue="" sx={{width:210, height: 35}}>
                {gender.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </Select>
            </Grid>

            <Grid item xs={6}>
                <Typography fontWeight="bold" variant="body2" mb={0.5} >
                    Ocasião
                </Typography>
                <Select fullWidth defaultValue="" sx={{width:210, height: 35}}>
                    {interests.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
                </Select>
            </Grid>
        </Grid>

        <Grid item xs={12} mb={2}>
            <Typography fontWeight="bold" variant="body2" mb={1}>
                Faixa de Preço (R$)
            </Typography>

            <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="body2" mb={0.5}>
                    Mínimo
                </Typography>
                <TextField fullWidth label="50" variant="outlined" size="small" />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2" mb={0.5}>
                    Máximo
                </Typography>
                <TextField fullWidth label="500" variant="outlined" size="small"/>
            </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12} >
            <Typography fontWeight="bold" variant="body2" >
                Interesses
            </Typography>
            <Select fullWidth defaultValue="" size="small" sx={{width:200}}>
            <MenuItem value="">Adicionar interesse</MenuItem>
            {interests.map((option, index) => (
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
            </Select>
        </Grid>

        <Grid item xs={12} mt={5}>
            <Button
            fullWidth
            variant="contained"
            startIcon={<AutoAwesomeOutlinedIcon />}
            sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 4,
                color: "white",
                background: "linear-gradient(90deg, #fd70da 0%, #ad30e7 100%)",
                height: 45,
                "&:hover": {
                    opacity: 0.75,
            },}}
            >
            Gerar Sugestões
            </Button>
        </Grid>
    </Box>

    <Box 
    backgroundColor='white'
    width={520}
    height={260}
    justifyContent={"center"}
    flexDirection={"column"}
    display={"flex"}
    boxShadow={2}
    sx={{marginTop: 5, borderRadius: 4}} >
        <AutoAwesomeOutlinedIcon sx={{align: 'center', display:'flex', fontSize:"100px", color:'grey', marginLeft: 25, marginBottom: 3}}/>
        <Typography fontWeight="bold" align={"center"}> Aguardando sugestões </Typography>
        <Typography variant="body2" color="grey" align="center"> Preencha o formulário ao lado e clique em "Gerar Sugestões" para ver recomendações personalizadas. </Typography>
    </Box>
    </Box>
    </>
    )
}

export default Sugestion;