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
    kilos,
    setKilos,
    onClose,
    onConfirm,
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Capturar kilos procesados</DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Kilos"
                    type="number"
                    fullWidth
                    value={kilos}
                    onChange={(e) => setKilos(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={onConfirm}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
