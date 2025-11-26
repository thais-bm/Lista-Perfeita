import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Tooltip
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { toast, ToastContainer } from "react-toastify";

const ShareDialog = ({ open, onClose, id }) => {
  const giftListLink = `http://localhost:5173/verLista/${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(giftListLink);
    toast.success("Link da lista copiado!");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Minha lista de presentes 🎁",
          text: "Confira minha lista de presentes:",
          url: giftListLink
        });
      } catch (err) {
        toast.error("Erro ao compartilhar");
      }
    } else {
      toast.error("Compartilhamento nativo não suportado neste dispositivo.");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Compartilhar Lista</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={giftListLink}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <Tooltip title="Copiar link">
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNativeShare}
            variant="contained"
            color="primary"
            startIcon={<ShareIcon />}
          >
            Compartilhar no dispositivo
          </Button>
          <Button onClick={onClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareDialog;