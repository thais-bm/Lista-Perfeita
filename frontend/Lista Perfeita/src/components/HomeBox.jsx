import { Box, Typography } from "@mui/material";
import { lighten } from "@mui/material/styles";

const HomeBox = ({color, icon, title, subtitle}) =>{
    return(
    <>
        <Box 
        sx={{
            borderRadius: 5,
            border:  `2px solid ${lighten(color, 0.8)}`,
            width: 350,
            height: 250,
            backgroundColor: 'white'
            }}>

            {icon && (
            <Box  marginTop={3}
                sx={{
                backgroundColor: lighten(color, 0.8), 
                color: color,
                width: 64,
                height: 64,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto"
            }}>
                {icon}
            </Box>
            )}


            <Typography color= {color} variant="body1" marginTop={2}> {title} </Typography>

            <Typography color="grey" variant="body2" marginTop={2}> {subtitle} </Typography>
        </Box>
    </>
    )
}

export default HomeBox;