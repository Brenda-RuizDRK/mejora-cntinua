import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../../css/Compnents/Extrude.css";
import DialogFormula from "@/Components/Extrusores/Dialogs/DialogFormula";
import DialogParo from "@/Components/Extrusores/Dialogs/DialogParo";
import DialogSubParo from "@/Components/Extrusores/Dialogs/DialogSubParo";
import DialogMantenimiento from "@/Components/Extrusores/Dialogs/DialogMantenimiento";

import Paro from "@/Components/Acciones/Paro";
import { FaTools } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import Extrusor from "@/Components/Acciones/Extrusor";
import { IoIosTimer } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { GiChemicalDrop } from "react-icons/gi";
import { RiTestTubeFill } from "react-icons/ri";
import DialogConfirmarFinProceso from "@/Components/Extrusores/Dialogs/DialogConfirmarFinProceso";
import DialogKilos from "@/Components/Extrusores/Dialogs/DialogKilos";
export default function Operaciones({
    reporteId,
    onFormulaChange,
    onUltimaAccion,
    accionActualFormula,
    accionEnEdicion, // 🟣 NUEVO
    setAccionEnEdicion, // 🟣 NUEVO
    onUpdateAccion, // 🟣 NUEVO
}) {
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
    const [openMantenimientoDialog, setOpenMantenimientoDialog] =
        useState(false);
    const [formulaActual, setFormulaActual] = useState("");
    const [openDialogFinProceso, setOpenDialogFinProceso] = useState(false);
    // --- NUEVOS ESTADOS ----
    const [openKilosDialog, setOpenKilosDialog] = useState(false);
    const [kilosIngresados, setKilosIngresados] = useState("");
    const [accionPendiente, setAccionPendiente] = useState(null);

    // Si el padre manda una acción actual, márcala al montar
    // 🔹 Si el padre manda una acción actual, márcala al montar y sincroniza con backend
    useEffect(() => {
        if (accionActualFormula) {
            const encontrada = operacionesIniciales.find(
                (op) => op.name === accionActualFormula
            );
            if (encontrada) {
                setAccionActiva(encontrada.name);
            }

            // 🆕 Sincroniza con la acción real desde el backend
            const obtenerUltimaAccion = async () => {
                try {
                    const res = await axios.get(
                        `/reporte-proceso-extrude/${reporteId}/ultima-accion`
                    );
                    if (res.data?.accion) {
                        setAccionActiva(res.data.accion.accion);
                        setAccionId(res.data.accion.id); // ✅ guarda el ID real
                    }
                } catch (err) {
                    console.error("Error al sincronizar última acción:", err);
                }
            };
            obtenerUltimaAccion();
        }
    }, [accionActualFormula]);
    const cerrarAccionAnteriorConKilos = async () => {
        if (!accionId) return;

        try {
            const ahora = new Date();

            const fecha_final = ahora.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const hora_final = ahora.toLocaleTimeString("es-MX", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            await axios.put(
                `/reporte-proceso-extrude/accion/${accionId}/cerrar`,
                {
                    fecha_final,
                    hora_final,
                    kilos: kilosIngresados,
                }
            );

            toast.success(
                `✔ Acción ${accionActiva} finalizada (${kilosIngresados} kg)`
            );

            // Limpiar estado
            setAccionActiva(null);
            setAccionId(null);

            // 🔥 Ahora sí iniciamos la acción nueva que el usuario había seleccionado:
            if (accionPendiente) {
                registrarAccion(
                    accionPendiente.operacion,
                    accionPendiente.paro,
                    accionPendiente.formula,
                    true
                );
                setAccionPendiente(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Error al cerrar la acción anterior.");
        }
    };

    const registrarAccion = async (
        accion,
        paroSeleccionado = null,
        numFormula = null,
        forzarInicio = false
    ) => {
        // --- Sólo cerramos si NO viene desde cerrarAccionAnteriorConKilos ---
        if (
            !forzarInicio &&
            accionActiva &&
            accionActiva !== accion.name &&
            accionId
        ) {
            // Guardamos qué acción el usuario quiere iniciar
            setAccionPendiente({
                operacion: accion,
                paro: paroSeleccionado,
                formula: numFormula,
            });

            // Abrimos dialog de kilos ANTES de iniciar nueva acción
            setOpenKilosDialog(true);
            return;
        }

        // ---------------------------------------
        // AQUÍ INICIA LA ACCIÓN NUEVA NORMALMENTE
        // ---------------------------------------

        try {
            const ahora = new Date();

            const fecha_inicio = ahora.toLocaleDateString("es-MX", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

            const hora_inicio = ahora.toLocaleTimeString("es-MX", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            const payload = {
                reporte_proceso_id: reporteId,
                fecha_inicio,
                hora_inicio,
                fecha_final: null,
                hora_final: null,
                accion: accion.name,
                operador: operadorNombre,
                status: accion.name === "Paro" ? "Paro" : "Activado",
                kilos: null,
                no_formula: numFormula,
            };

            const res = await axios.post(
                "/reporte-proceso-extrude/accion",
                payload
            );

            setAccionActiva(accion.name);
            setAccionId(res.data.accion.id);

            toast.success(`🚀 ${accion.name} iniciada`);
        } catch (error) {
            console.error(error);
            toast.error("❌ Error al iniciar acción.");
        }
    };

    // ------------------------------------------------
    // 🟣 DIALOGO DE KILOS: cuando se confirma:
    const confirmarKilos = () => {
        if (!kilosIngresados.trim()) {
            toast.warn("⚠ Ingresa los kilos antes de continuar.");
            return;
        }

        setOpenKilosDialog(false); // 👈 SE CIERRA AQUÍ
        cerrarAccionAnteriorConKilos();
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

        if (accionSeleccionada) {
            registrarAccion(accionSeleccionada, null, numeroFormula);
            setFormulaActual(numeroFormula); // 🔥 GUARDA LA FORMULA ACTUAL
        }

        // 🔥 Cierra el diálogo al confirmar
        setOpenFormulaDialog(false);

        // 🔥 Limpia el input para futuros ingresos
        setNumeroFormula("");
    };

    const handleConfirmMantenimiento = (comentario) => {
        if (accionSeleccionada) {
            registrarAccion(accionSeleccionada, null, comentario);
        }
        setOpenMantenimientoDialog(false);
    };

    useEffect(() => {
        if (onFormulaChange) setFormulaActual(onFormulaChange);
    }, [onFormulaChange]);

    const finalizarProceso = async () => {
        try {
            const res = await axios.put(
                `/reporte-proceso-extrude/${reporteId}/finalizar`
            );

            if (res.data.success) {
                toast.success("✅ Proceso finalizado correctamente");
                window.location.href = "/";
            } else {
                toast.error("⚠️ No se pudo finalizar el proceso");
            }
        } catch (error) {
            console.error(error);
            toast.error("❌ Error al finalizar el proceso");
        } finally {
            setOpenDialogFinProceso(false);
        }
    };

    return (
        <div>
            {/* 🔘 Botones de acciones */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 ">
                {operacionesIniciales.map((operacion) => {
                    const esActiva =
                        accionActiva === operacion.name ||
                        accionActualFormula === operacion.name; // ✅ activa si coincide con ultimaAccion

                    const hayActiva = !!accionActiva;

                    const handleClick = () => {
                        if (operacion.name === "Paro") {
                            setOpenParoDialog(true);
                        } else if (operacion.name === "Mantenimiento") {
                            setAccionSeleccionada(operacion);
                            setOpenMantenimientoDialog(true);
                        } else if (operacion.name === "Limpieza") {
                            registrarAccion(operacion, null, null);
                        } else if (operacion.name === "Formula en Muestra") {
                            if (!formulaActual) {
                                toast.warn(
                                    "⚠️ No hay una fórmula activa en curso."
                                );
                                return;
                            }
                            registrarAccion(operacion, null, formulaActual);
                        } else {
                            setAccionSeleccionada(operacion);
                            setOpenFormulaDialog(true);
                        }
                    };

                    return (
                        <div
                            key={operacion.id}
                            onClick={handleClick}
                            className={`relative cursor-pointer rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105 w-[200px] ${
                                esActiva
                                    ? "ring-4 ring-green-700 brightness-110"
                                    : ""
                            }`}
                            style={{
                                backgroundColor: esActiva
                                    ? operacion.bgColor
                                    : "#d1d5db",
                                color: esActiva ? operacion.color : "#555",
                            }}
                        >
                            <div className="absolute inset-0 flex items-center justify-start opacity-40 pl-0 left-[-8%]">
                                <div>{operacion.icons}</div>
                            </div>

                            <div className="relative flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left px-2 py-2">
                                <div className="text-[30px] sm:text-[33px] lg:text-[40px] font-extrabold tracking-wide contorno text-[#f2f9fd] leading-tight">
                                    {operacion.abreviatura}
                                </div>
                                <div className="text-[16px] sm:text-[18px] font-bold leading-tight mt-1 sm:mt-0">
                                    {operacion.name.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <DialogKilos
                open={openKilosDialog}
                kilos={kilosIngresados}
                setKilos={setKilosIngresados}
                onClose={() => setOpenKilosDialog(false)}
                onConfirm={confirmarKilos}
            />

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

            <DialogMantenimiento
                open={openMantenimientoDialog}
                onClose={() => setOpenMantenimientoDialog(false)}
                onConfirm={handleConfirmMantenimiento}
            />
            <DialogConfirmarFinProceso
                open={openDialogFinProceso}
                onClose={() => setOpenDialogFinProceso(false)}
                onConfirm={finalizarProceso}
            />

            {/* 🟣 Botón para finalizar el proceso */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => setOpenDialogFinProceso(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
                >
                    Ha terminado el proceso
                </button>
            </div>
        </div>
    );
}
