import { Typography, Box, Button, LinearProgress, Chip } from "@mui/material";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EventIcon from "@mui/icons-material/Event";


const MLList = ({ id, title, subtitle, ocasion, date, totalGifts, boughtGifts, privacidade, onDelete }) => {
    const progress = totalGifts > 0 ? (boughtGifts / totalGifts) * 100 : 0;

    return (
        <Box width={355} height={250}
            sx={{
                boxShadow: 2,
                borderRadius: 3,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: 2,
                marginTop: 4,
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                }}
            >
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                </Box>

                <Chip
                    label={privacidade}
                    size="small"
                    sx={{
                        backgroundColor: "#f0f4ff",
                        color: privacidade === "Privada" ? "#2b65ff" : "#04c290ff",
                        fontWeight: "bold",
                        fontSize: "0.75rem",
                    }}
                />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <EventIcon fontSize="small" sx={{ color: "grey.600", mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                    {ocasion} • {date}
                </Typography>
            </Box>


            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="bold">
                        Progresso
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {boughtGifts}/{totalGifts} presentes
                    </Typography>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#f0f0f0",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#1a1a1af9",
                        },
                    }}
                />
                <Typography
                    variant="caption"
                    sx={{ mt: 1, display: "block", color: "text.secondary" }}
                >
                    {Math.round(progress)}% completo {/*esse progresso é fogor*/}
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                    mt: 2,
                }}
            >
                <Button
                    variant="outlined"
                    startIcon={<RemoveRedEyeOutlinedIcon />}
                    sx={{
                        borderColor: "#ddd",
                        color: "black",
                        textTransform: "none",
                        width: 400,
                        borderRadius: 3
                    }}
                >
                    Ver
                </Button>

                {/* Botao de compartilhar aparece apenas p */}
                {privacidade === "Compartilhada" ? (
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: "#ddd",
                            color: "black",
                            borderRadius: 3
                        }}
                        startIcon={<ShareOutlinedIcon />}
                    />
                ) : null
                }
                <Button
                    variant="outlined"
                    sx={{
                        borderColor: "#ddd",
                        color: "red",
                        borderRadius: 3,
                        width: 20
                    }}
                    onClick={() => onDelete(id)}
                    startIcon={<DeleteOutlineIcon />}
                />
            </Box>

        </Box>
    )
}

export default MLList;