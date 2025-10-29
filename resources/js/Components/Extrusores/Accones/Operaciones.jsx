import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../../css/Compnents/Extrude.css";
import ParosExtrucion from "@/database/Extrusion/Paros";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

export default function Operaciones({ reporteId }) {
    const { auth } = usePage().props;
    const operadorNombre = auth?.user?.nombre || "Desconocido";

    const operacionesIniciales = [
        {
            id: 1,
            name: "Proceso Extrusión",
            abreviatura: "PRE",
            color: "#145318",
            bgColor: "#BBF7BC",
        },
        {
            id: 2,
            name: "Procesos",
            abreviatura: "REPE",
            color: "#621679",
            bgColor: "#EBD3FF",
        },
        {
            id: 3,
            name: "Ajustes de Producción",
            abreviatura: "AP",
            color: "#714012",
            bgColor: "#E5D1A3",
        },
        {
            id: 4,
            name: "Limpieza",
            abreviatura: "LIM",
            color: "#194061",
            bgColor: "#C3DFF4",
        },
        {
            id: 5,
            name: "Formula en Muestra",
            abreviatura: "FM",
            color: "#C98D05",
            bgColor: "#FEFAC3",
        },
        {
            id: 6,
            name: "Mantenimiento",
            abreviatura: "MAN",
            color: "#CC4902",
            bgColor: "#FFC26D",
        },
        {
            id: 7,
            name: "Paro",
            abreviatura: "PARO",
            color: "#D70000",
            bgColor: "#FF9494",
        },
        {
            id: 8,
            name: "Muestra",
            abreviatura: "MUE",
            color: "#A70D45",
            bgColor: "#FECCE6",
        },
    ];

    const [accionesActivas, setAccionesActivas] = useState({});
    const [openParoDialog, setOpenParoDialog] = useState(false);

    // ✅ Restaurar acciones guardadas en localStorage
    useEffect(() => {
        const guardadas = localStorage.getItem(`accionesActivas_${reporteId}`);
        if (guardadas) setAccionesActivas(JSON.parse(guardadas));
    }, [reporteId]);

    // ✅ Guardar cada cambio
    useEffect(() => {
        localStorage.setItem(
            `accionesActivas_${reporteId}`,
            JSON.stringify(accionesActivas)
        );
    }, [accionesActivas, reporteId]);

    const registrarAccion = async (accion, paroSeleccionado = null) => {
        const idActiva = accionesActivas[accion.name];

        if (!idActiva) {
            try {
                const ahora = new Date();
                const fechaHoraLocal = new Date(
                    ahora.getTime() - ahora.getTimezoneOffset() * 60000
                )
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");

                const payload = {
                    reporte_proceso_id: reporteId,
                    fecha_hora_inicio: fechaHoraLocal,
                    fecha_hora_final: null,
                    accion: accion.name,
                    operador: operadorNombre,
                };

                if (paroSeleccionado) {
                    payload.tipo_paro = paroSeleccionado.description;
                    payload.numero_paro = paroSeleccionado.num;
                }

                const res = await axios.post(
                    "/reporte-proceso-extrude/accion",
                    payload
                );

                setAccionesActivas((prev) => ({
                    ...prev,
                    [accion.name]: res.data.accion.id,
                }));

                toast.success(
                    `✅ ${accion.name} ${
                        paroSeleccionado
                            ? `(${paroSeleccionado.description})`
                            : ""
                    } iniciada por ${operadorNombre}`,
                    { position: "top-right" }
                );
            } catch (error) {
                console.error("Error al guardar acción:", error);
                toast.error("❌ Error al registrar la acción.");
            }
        } else {
            try {
                await axios.put(
                    `/reporte-proceso-extrude/accion/${idActiva}/cerrar`
                );
                setAccionesActivas((prev) => {
                    const copia = { ...prev };
                    delete copia[accion.name];
                    return copia;
                });
                toast.info(`🕓 ${accion.name} finalizada.`);
            } catch (error) {
                console.error("Error al cerrar acción:", error);
                toast.error("❌ Error al finalizar la acción.");
            }
        }
    };

    // ✅ Manejadores del diálogo de Paros
    const handleOpenParoDialog = () => setOpenParoDialog(true);
    const handleCloseParoDialog = () => setOpenParoDialog(false);

    const handleSelectParo = (paro) => {
        registrarAccion({ name: "Paro" }, paro);
        handleCloseParoDialog();
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {operacionesIniciales.map((operacion) => {
                    const activa = !!accionesActivas[operacion.name];

                    const handleClick = () => {
                        if (operacion.name === "Paro") {
                            handleOpenParoDialog();
                        } else {
                            registrarAccion(operacion);
                        }
                    };

                    return (
                        <div
                            key={operacion.id}
                            onClick={handleClick}
                            className={`cursor-pointer p-[0.5rem] text-center rounded-2xl shadow-md font-semibold flex gap-1 justify-around items-center transition-transform transform hover:scale-105 ${
                                activa ? "opacity-60" : ""
                            }`}
                            style={{
                                backgroundColor: activa
                                    ? "#d1d5db"
                                    : operacion.bgColor,
                                color: activa ? "#555" : operacion.color,
                            }}
                        >
                            <div
                                className="text-2xl font-extrabold bordeText"
                                style={{
                                    WebkitTextStrokeColor: operacion.color,
                                }}
                            >
                                {operacion.abreviatura}
                            </div>
                            <div className="text-[15px] lg:text-base">
                                {operacion.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 🟢 Diálogo de Paros */}
            <Dialog
                open={openParoDialog}
                onClose={handleCloseParoDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle className="h-1">
                    Selecciona el tipo de paro
                </DialogTitle>
                <DialogContent dividers>
                    <div className="flex flex-wrap gap-2 items-center justify-between w-full">
                        {ParosExtrucion.map((paro, index) => (
                            <div key={paro.id}>
                                <button
                                    onClick={() => handleSelectParo(paro)}
                                    className={`cursor-pointer p-3 text-center rounded-2xl shadow-md font-semibold flex gap-1 justify-between items-center transition-transform transform hover:scale-105 ${
                                        index % 2 === 0
                                            ? "bg-[#ffc3c3] text-[#a90b0b]"
                                            : "bg-[#ff5757] text-[#500000]"
                                    }`}
                                >
                                    {`${paro.num} `}
                                </button>

                                {/* Subtipos */}
                                {paro.tipo_paro && (
                                    <div className="ml-6">
                                        {paro.tipo_paro.map((sub) => (
                                            <ListItem
                                                key={sub.id}
                                                button
                                                onClick={() =>
                                                    handleSelectParo(sub)
                                                }
                                            >
                                                <ListItemText
                                                    primary={`↳ ${sub.num} - ${sub.description}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions className="h-[35px]">
                    <Button onClick={handleCloseParoDialog}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
