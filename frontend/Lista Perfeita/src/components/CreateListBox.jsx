import { Box, Typography, Radio } from "@mui/material";

const CreateListBox = ({icon, title, subtitle, children}) =>{
    return(
    <>
    <Box
    sx={{
        borderRadius: 3,
        border: '1px solid grey',
        padding: 3,
        marginBottom: 3,

    }}
    >
        <Box sx={{ display: "flex", alignItems:'flex-start', flexDirection:'column', gap: 1, marginBottom: 1 }}>
            {icon}
            <Typography variant="body2" fontWeight="bold">
                {title}
            </Typography>

            {subtitle && (
            <Typography variant="body2" color="grey" sx={{ marginBottom: 2 }}>
                {subtitle}
            </Typography>
            )}

        </Box>

        

        {children}
    </Box>
    
    
    </>
    )
}

export default CreateListBox;