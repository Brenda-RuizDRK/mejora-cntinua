// resources/js/Components/Extrusores/Dialogs/DialogFormula.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";

export default function DialogFormula({
    open,
    numeroFormula,
    setNumeroFormula,
    onClose,
    onConfirm,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                style: {
                    borderRadius: "16px",
                    padding: "8px",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontSize: "1rem",
                    textAlign: "center",
                    padding: "8px 12px",
                    fontWeight: "bold",
                    height: "35px",
                }}
            >
                Ingrese el número de fórmula
            </DialogTitle>

            <DialogContent>
                <TextField
                    autoFocus
                    size="small"
                    label="Número de fórmula"
                    variant="outlined"
                    value={numeroFormula}
                    onChange={(e) => setNumeroFormula(e.target.value)}
                    sx={{ width: "90%", marginTop: "8px" }}
                />
            </DialogContent>

            <DialogActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 12px 8px",
                }}
            >
                <Button onClick={onClose} color="error" size="small">
                    Cancelar
                </Button>
                <Button
                    onClick={onConfirm}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
