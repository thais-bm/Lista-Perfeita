import { Box, Typography } from "@mui/material";
import React from "react";

const MLBox = ({number, title, icon}) =>{
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
                <Typography variant="h6" fontSize={17} >
                    {title}
                </Typography>
                <Typography variant="h6" fontWeight="bold" sx={{marginTop:2.5}}>
                    {number}
                </Typography>
            </Box>

            {icon && React.cloneElement(icon, { sx: { fontSize: 20, color: '#000000ff', mt: 1 } })} 
        </Box>
    )
}

export default MLBox;