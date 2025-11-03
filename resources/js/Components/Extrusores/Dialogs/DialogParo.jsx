// resources/js/Components/Extrusores/Dialogs/DialogParo.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import ParosExtrucion from "@/database/Extrusion/Paros";

export default function DialogParo({ open, onClose, onSelectParo }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle className="h-2">
                Selecciona el tipo de paro
            </DialogTitle>
            <DialogContent dividers>
                <div className="flex flex-wrap gap-2 items-center justify-between w-full">
                    {ParosExtrucion.map((paro, index) => (
                        <button
                            key={paro.id}
                            onClick={() => onSelectParo(paro)}
                            className={`cursor-pointer p-3 text-center rounded-2xl shadow-md font-semibold transition-transform transform hover:scale-105 w-[45%] ${
                                index % 2 === 0
                                    ? "bg-[#ffc3c3] text-[#a90b0b]"
                                    : "bg-[#ff5757] text-[#500000]"
                            }`}
                        >
                            {paro.num}-{paro.description}
                        </button>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
