import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../../css/Compnents/Extrude.css";
import DialogFormula from "@/Components/Extrusores/Dialogs/DialogFormula";
import DialogParo from "@/Components/Extrusores/Dialogs/DialogParo";
import DialogSubParo from "@/Components/Extrusores/Dialogs/DialogSubParo";
import Paro from "@/Components/Acciones/Paro";
import { FaTools } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import Extrusor from "@/Components/Acciones/Extrusor";
import { IoIosTimer } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { GiChemicalDrop } from "react-icons/gi";
import { RiTestTubeFill } from "react-icons/ri";

export default function Operaciones({ reporteId, onFormulaChange }) {
    const { auth } = usePage().props;
    const operadorNombre = auth?.user?.nombre || "Desconocido";

    const operacionesIniciales = [
        {
            id: 1,
            name: "Proceso Extrusión",
            abreviatura: "PRE",
            color: "#145318",
            bgColor: "#BBF7BC",
            icons: <Extrusor />,
        },
        {
            id: 2,
            name: "Procesos",
            abreviatura: "REPE",
            color: "#621679",
            bgColor: "#EBD3FF",
            icons: <IoIosTimer className="text-[70px]" />,
        },
        {
            id: 3,
            name: "Ajustes de Producción",
            abreviatura: "AP",
            color: "#714012",
            bgColor: "#E5D1A3",
            icons: <FaGears className="text-[80px]" />,
        },
        {
            id: 4,
            name: "Limpieza",
            abreviatura: "LIM",
            color: "#194061",
            bgColor: "#C3DFF4",
            icons: <FaDroplet className="text-[70px]" />,
        },
        {
            id: 5,
            name: "Formula en Muestra",
            abreviatura: "FM",
            color: "#C98D05",
            bgColor: "#FEFAC3",
            icons: <RiTestTubeFill className="text-[70px]" />,
        },
        {
            id: 6,
            name: "Mantenimiento",
            abreviatura: "MAN",
            color: "#CC4902",
            bgColor: "#FFC26D",
            icons: <FaTools className="text-[70px]" />,
        },
        {
            id: 7,
            name: "Paro",
            abreviatura: "PARO",
            color: "#D70000",
            bgColor: "#FF9494",
            icons: <Paro />,
        },
        {
            id: 8,
            name: "Muestra",
            abreviatura: "MUE",
            color: "#A70D45",
            bgColor: "#FECCE6",
            icons: <GiChemicalDrop className="text-[70px]" />,
        },
    ];

    const [accionActiva, setAccionActiva] = useState(null);
    const [accionId, setAccionId] = useState(null);
    const [openParoDialog, setOpenParoDialog] = useState(false);
    const [openSubParoDialog, setOpenSubParoDialog] = useState(false);
    const [subParos, setSubParos] = useState([]);
    const [openFormulaDialog, setOpenFormulaDialog] = useState(false);
    const [numeroFormula, setNumeroFormula] = useState("");
    const [accionSeleccionada, setAccionSeleccionada] = useState(null);

    // 🔹 Cargar acción guardada
    useEffect(() => {
        const guardada = localStorage.getItem(`accionActiva_${reporteId}`);
        if (guardada) {
            const { nombre, id } = JSON.parse(guardada);
            setAccionActiva(nombre);
            setAccionId(id);
        }
    }, [reporteId]);

    // 🔹 Guardar en localStorage
    useEffect(() => {
        if (accionActiva && accionId) {
            localStorage.setItem(
                `accionActiva_${reporteId}`,
                JSON.stringify({ nombre: accionActiva, id: accionId })
            );
        } else {
            localStorage.removeItem(`accionActiva_${reporteId}`);
        }
    }, [accionActiva, accionId, reporteId]);

    // 🔹 Registrar acción (cerrar actual si hay una en curso)
    const registrarAccion = async (
        accion,
        paroSeleccionado = null,
        numFormula = null
    ) => {
        try {
            // Cierra acción anterior si es distinta
            if (accionActiva && accionActiva !== accion.name && accionId) {
                await axios.put(
                    `/reporte-proceso-extrude/accion/${accionId}/cerrar`
                );
                toast.info(`🕓 ${accionActiva} finalizada.`);
            }

            // Si se vuelve a seleccionar la misma, se finaliza
            if (accionActiva === accion.name) {
                await axios.put(
                    `/reporte-proceso-extrude/accion/${accionId}/cerrar`
                );
                setAccionActiva(null);
                setAccionId(null);
                toast.info(`🕓 ${accion.name} finalizada.`);
                return;
            }

            // Registrar nueva acción
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
                numero_formula: numFormula,
                no_formula: numFormula, // ✅ almacena la fórmula también aquí
            };

            if (accion.name === "Paro" && paroSeleccionado) {
                payload.paro = `${paroSeleccionado.num} - ${paroSeleccionado.description}`;
            }

            const res = await axios.post(
                "/reporte-proceso-extrude/accion",
                payload
            );

            // 🔹 Actualiza el estado local
            setAccionActiva(accion.name);
            setAccionId(res.data.accion.id);

            // 🔹 Notifica al padre el número de fórmula actual
            if (numFormula && onFormulaChange) {
                onFormulaChange(numFormula);
            }

            toast.success(
                `✅ ${accion.name} ${
                    paroSeleccionado ? `(${paroSeleccionado.description})` : ""
                } iniciada por ${operadorNombre}`
            );
        } catch (error) {
            console.error("Error al registrar acción:", error);
            toast.error("❌ Error al registrar la acción.");
        }
    };

    // 🟢 Manejadores de los diálogos
    const handleSelectParo = (paro) => {
        if (paro.id === "4" && paro.tipo_paro) {
            setSubParos(paro.tipo_paro);
            setOpenSubParoDialog(true);
        } else {
            registrarAccion({ name: "Paro" }, paro);
            setOpenParoDialog(false);
        }
    };

    const handleSelectSubParo = (subParo) => {
        registrarAccion({ name: "Paro" }, subParo);
        setOpenSubParoDialog(false);
        setOpenParoDialog(false);
    };

    const handleConfirmFormula = () => {
        if (!numeroFormula.trim()) {
            toast.warn("⚠️ Ingresa un número de fórmula antes de continuar.");
            return;
        }
        if (accionSeleccionada)
            registrarAccion(accionSeleccionada, null, numeroFormula);
        setOpenFormulaDialog(false);
    };

    return (
        <div>
            {/* 🔘 Botones de acciones */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
                {operacionesIniciales.map((operacion) => {
                    const esActiva = accionActiva === operacion.name;
                    const hayActiva = !!accionActiva;

                    const handleClick = () => {
                        if (operacion.name === "Paro") setOpenParoDialog(true);
                        else {
                            setAccionSeleccionada(operacion);
                            setOpenFormulaDialog(true);
                        }
                    };

                    return (
                        <div
                            key={operacion.id}
                            onClick={handleClick}
                            className={`relative cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 ${
                                esActiva ? "ring-4 ring-green-700" : ""
                            }`}
                            style={{
                                backgroundColor: hayActiva
                                    ? esActiva
                                        ? operacion.bgColor
                                        : "#d1d5db"
                                    : operacion.bgColor,
                                color: hayActiva
                                    ? esActiva
                                        ? operacion.color
                                        : "#555"
                                    : operacion.color,
                            }}
                        >
                            {/* Ícono de fondo translúcido */}
                            <div className="absolute inset-0 flex items-center justify-start opacity-40 pl-0  left-[-8%]">
                                <div>{operacion.icons}</div>
                            </div>

                            {/* Contenido principal */}
                            <div className="relative flex items-center justify-between px-2 py-2">
                                <div className="text-[33px] font-extrabold tracking-wide contorno text-[#f2f9fd] ">
                                    {operacion.abreviatura}
                                </div>
                                <div className="text-right">
                                    <div className="text-[18px] font-bold leading-tight">
                                        {operacion.name.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Diálogos */}
            <DialogFormula
                open={openFormulaDialog}
                numeroFormula={numeroFormula}
                setNumeroFormula={setNumeroFormula}
                onClose={() => setOpenFormulaDialog(false)}
                onConfirm={handleConfirmFormula}
            />

            <DialogParo
                open={openParoDialog}
                onClose={() => setOpenParoDialog(false)}
                onSelectParo={handleSelectParo}
            />

            <DialogSubParo
                open={openSubParoDialog}
                subParos={subParos}
                onClose={() => setOpenSubParoDialog(false)}
                onSelectSubParo={handleSelectSubParo}
            />
        </div>
    );
}
