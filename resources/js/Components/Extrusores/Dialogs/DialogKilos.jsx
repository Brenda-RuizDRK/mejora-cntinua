import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

export default function DialogKilos({
    open,
    onClose,
    onConfirm,
    kilos,
    setKilos,
}) {
    const handleConfirm = () => {
        if (!kilos || kilos <= 0) return;
        onConfirm(); // ✅ ya NO envía parámetros
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registrar kilos terminados</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    fullWidth
                    type="number"
                    label="Kilos producidos"
                    value={kilos}
                    onChange={(e) => setKilos(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleConfirm}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
