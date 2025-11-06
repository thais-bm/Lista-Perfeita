import { Box, Typography } from "@mui/material";
import { lighten, darken } from "@mui/material/styles";


const HomeResources = ({ color, icon, title, subtitle }) => {

    const gradient = `linear-gradient(135deg, ${lighten(color, 0.1)}, ${darken(color, 0.4)})`;
    
    return (
    <Box
    sx={{
        width: 350,
        height: 250,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        p: 2,
    }}
    >
    {icon && (
        <Box
        sx={{
            background: gradient,
            width: 90,
            height: 90,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mt: 3,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", 
        }}
        >
        <Box sx={{ color: "white" }}>{icon}</Box>
        </Box>
    )}

      {/* Textos */}
    <Typography color="black" variant="h6" marginTop={2}> {title} </Typography>

    <Typography color="grey" variant="body2" marginTop={1}> {subtitle} </Typography>
    </Box>
    );
};

export default HomeResources;
