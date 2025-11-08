import { Box, Typography, Radio } from "@mui/material";

const CreateListBox = ({ icon, title, subtitle, value, selectedValue, onChange }) => {
    const isSelected = value === selectedValue;

    return (
    <Box
        onClick={() => onChange(value)}
        sx={{
        width: 520,
        display: "flex",
        alignItems: "center",
        gap: 2,
        marginTop: 2,
        borderRadius: 3,
        border: isSelected ? "2px solid #fcfbfdff" : "1px solid #ccc",
        padding: 2,
        marginBottom: 2,
        cursor: "pointer",
        backgroundColor: isSelected ? "#faf5fdff" : "white",
        boxShadow: isSelected
            ? "0px 4px 10px rgba(206, 128, 243, 0.2)"
            : "0px 2px 5px rgba(0,0,0,0.05)",
        transition: "all 0.2s ease",
        }}
    >
        <Radio
        checked={isSelected}
        onChange={() => onChange(value)}
        value={value}
        color="secondary"
        />


        <Box sx={{ display: "flex", alignItems: "center" }}>
            {icon}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" fontWeight="bold">
                {title}
            </Typography>
            {subtitle && (
            <Typography variant="body2" color="grey">
                {subtitle}
            </Typography>
            )}
        </Box>
    </Box>
    );
};

export default CreateListBox;
