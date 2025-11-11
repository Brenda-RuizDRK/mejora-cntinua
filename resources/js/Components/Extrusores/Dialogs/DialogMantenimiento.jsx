import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";

export default function DialogMantenimiento({ open, onClose, onConfirm }) {
    const [comentario, setComentario] = useState("");

    const handleConfirm = () => {
        if (!comentario.trim()) {
            alert("⚠️ Ingresa la causa del mantenimiento antes de continuar.");
            return;
        }
        onConfirm(comentario);
        setComentario("");
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Causa de mantenimiento</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Describe brevemente la causa del mantenimiento"
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    variant="outlined"
                    sx={{ mt: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
