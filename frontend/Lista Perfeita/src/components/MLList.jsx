import { Typography } from "@mui/material";


const MLList = ({title, subtitle, type}) =>{
    return(
    <Box width={350} height={100}
        sx={{
        border: '3px solid transparent',
        borderRadius: 3,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        p:2
        }}
        >

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start' }}>
                <Typography variant="h6" fontSize={17} fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2">
                    {subtitle}
                </Typography>
            </Box>

            <Typography> {type} </Typography>            
        </Box>
    )
}

export default MLList;