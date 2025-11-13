import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";

export default function DialogConfirmarFinProceso({
    open,
    onClose,
    onConfirm,
}) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ fontWeight: "bold" }}>
                ¿Finalizar el proceso?
            </DialogTitle>

            <DialogContent>
                <Typography>
                    ¿Estás seguro de que deseas finalizar el proceso completo
                    del producto?
                    <br />
                    <strong>Esta acción no se puede deshacer.</strong>
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="inherit" variant="outlined">
                    Cancelar
                </Button>

                <Button onClick={onConfirm} color="error" variant="contained">
                    Sí, finalizar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
