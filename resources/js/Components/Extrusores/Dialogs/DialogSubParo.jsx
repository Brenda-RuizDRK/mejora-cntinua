// resources/js/Components/Extrusores/Dialogs/DialogSubParo.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

export default function DialogSubParo({
    open,
    subParos,
    onClose,
    onSelectSubParo,
}) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Selecciona el subtipo de paro</DialogTitle>
            <DialogContent
                dividers
                className="flex flex-wrap gap-2 items-center w-full"
            >
                {subParos.map((sub) => (
                    <div
                        key={sub.id}
                        onClick={() => onSelectSubParo(sub)}
                        className="bg-[#ffc0c0] m-1 p-2 rounded-lg shadow-md cursor-pointer hover:bg-[#ff8a8a] transition-colors"
                    >
                        {`${sub.num} - ${sub.description}`}
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
