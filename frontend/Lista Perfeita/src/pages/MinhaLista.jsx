import { Typography, Button, Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import Header from "../components/Header";

import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import MLBox from "../components/MLBox";

const MinhaLista = () =>{
    return(
    <>  
    <Header/>
    <Box paddingTop={10}/>

    <Box
    sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }}
    >

    <Box
        sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', 
        }}
    >
        <Typography color="black" variant="h4" fontWeight="bold">
        Minhas listas
        </Typography>

        <Button
        variant="outlined"
        color="white"
        startIcon={<AddIcon />}
        sx={{
            background: "linear-gradient(90deg, #ea33bdff 0%, #ad30e7ff 100%)",
            color: 'white',
            borderRadius: 3,
            textTransform: 'none',
        }}
        >
        Nova Lista
        </Button>
    </Box>

    <Typography color="black" variant="body2" sx={{ mt: 1 }}>
        Gerencie suas listas de presentes e acompanhe o processo
    </Typography>
    </Box>

    <Box display={"flex"} sx={{gap: 3, marginTop: 3}}>
        <MLBox
            title="Total de listas"
            number= {3}
            icon={<CardGiftcardIcon/>}
        />

        <MLBox
            title="Presentes totais"
            number={35}
            icon={<PeopleOutlineOutlinedIcon/>}
        />

        <MLBox 
            title="Presentes comprados"
            number={14}
            icon={<CardGiftcardIcon/>}
        />
    </Box>

    </>
    )
}

export default MinhaLista