import { Typography, Box, TextField, MenuItem, Select, Button } from "@mui/material";
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
    <Box paddingTop={10}/>
    
    
    <Box>
        <Typography variant='h4' fontWeight="bold"> Sugestões Inteligentes </Typography>
        <Typography color='grey' variant="body1"> Nossa IA analisa o perfil da pessoa e sugere presentes personalizados baseados nos interesses e ocasião.</Typography>
    </Box>

    <Box display={"flex"} justifyContent={"center"} sx={{gap: 3}} >
    
    <Box sx={{
        marginTop: 5,
        backgroundColor: 'white',
        width: 500,
        height:900,
        borderRadius: 4
    }}> 
        <PersonIcon/>
        <Typography> Perfil da pessoa </Typography>
        <Typography variant="body2"> Preencha as informações para gerar sugestões personalizadas</Typography>

        <Typography ontWeight="bold" > Nome </Typography>
        <TextField
            id="name"
            label="Ex: Maria"
            variant="outlined"
            sx={{width:400, height: 50, alignSelf: 'center', borderRadius: 40, marginBottom: 3}}
        />

        <Typography ontWeight="bold" > Idade </Typography>
        <TextField
            id="age"
            label="Ex: 25"
            variant="outlined"
            sx={{width:400, height: 50, alignSelf: 'center', borderRadius: 40, marginBottom: 3}}
        />


        <Typography ontWeight="bold" > Gênero</Typography>
        <Select>
        {gender.map((option, index)=>(
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        ))}
        </Select>

        <Typography fontWeight="bold"> Ocasião * </Typography>
        <Select
            labelId="select-label"
            id="ocasion"
            sx={{width: 150, height:40}}
        >
            {gender.map((option, index)=>(
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>

        <Typography fontWeight="bold" > Faixa de Preço (R$)</Typography>

        <Typography fontWeight="bold" > Interesses </Typography>
        <Select>
            {interests.map((option, index)=>(
                <MenuItem key={index} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>    
            
        
        <Button 
            sx={{
                background: "linear-gradient(90deg, #fd70daff 0%, #ad30e7ff 100%)",
                color: 'white',
                width: 400,
                borderRadius:2
            }}
            startIcon={<AutoAwesomeOutlinedIcon/>}
        > Gerar sugestões </Button>
        
    </Box>

    <Box backgroundColor='white' width={400} height={250} sx={{marginTop: 5, borderRadius: 4}} >
        <Typography fontWeight="bold"> Aguardando sugestões </Typography>
        <Typography variant="body2" color="grey"> Preencha o formulário ao lado e clique em "Gerar Sugestões" para ver recomendações personalizadas. </Typography>
    </Box>
    </Box>
    </>
    )
}

export default Sugestion;