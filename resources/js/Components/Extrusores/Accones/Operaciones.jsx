import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../../../css/Compnents/Extrude.css";
import Paro from "@/Components/Acciones/Paro";
import Extrusor from "@/Components/Acciones/Extrusor";
import OperacionesIniciales from "@/Components/Acciones/OperacionesIniciales";
import DialogFormula from "@/Components/Extrusores/Dialogs/DialogFormula";
import { FaTools } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { GiChemicalDrop } from "react-icons/gi";
import { RiTestTubeFill } from "react-icons/ri";
import DialogKilos from "@/Components/Extrusores/Dialogs/DialogKilos";
import DialogParo from "@/Components/Extrusores/Dialogs/DialogParo";

export default function Operaciones({ accionActualFormula }) {
    const { props } = usePage();
    const reporteId = props.reporte?.id;

    // ⭐ Operaciones con tu mismo diseño
    const [operacionesIniciales] = useState([
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
    ]);

    const [operacionSeleccionada, setOperacionSeleccionada] = useState(null);
    const [openDialogFormula, setOpenDialogFormula] = useState(false);
    const [numeroFormula, setNumeroFormula] = useState("");
    const [openDialogKilos, setOpenDialogKilos] = useState(false);
    const [kilos, setKilos] = useState("");
    const [accionParaCerrar, setAccionParaCerrar] = useState(null);
    const [accionPendiente, setAccionPendiente] = useState(null);
    const [openDialogParo, setOpenDialogParo] = useState(false);
    const [openDialogSubParo, setOpenDialogSubParo] = useState(false);
    const [paroSeleccionado, setParoSeleccionado] = useState(null);

    // ⭐ CREA LA ACCIÓN EN EL BACKEND (incluye no_formula)
    const crearAccion = async (nombreAccion, numeroFormula) => {
        try {
            const now = new Date();

            const payload = {
                reporte_proceso_id: reporteId,
                accion: nombreAccion,
                fecha_inicio: now.toLocaleDateString("es-MX"),
                hora_inicio: now.toLocaleTimeString("es-MX"),
                status: "Activo",
                no_formula: numeroFormula, // ⭐ NUEVO
            };

            const res = await axios.post(
                "/reporte-proceso-extrude/accion",
                payload
            );

            toast.success(`Acción "${nombreAccion}" iniciada`);
            console.log("Acción creada:", res.data);
        } catch (error) {
            console.error(error);
            toast.error("Error al crear acción");
        }
    };

    const operacionesConFormula = [
        "Proceso Extrusión",
        "Procesos",
        "Ajustes de Producción",
        "Formula en Muestra",
        "Muestra",
    ];
    const ACCIONES_CON_KILOS = [
        "Proceso Extrusión",
        "Procesos",
        "Ajustes de Producción",
        "Formula en Muestra",
        "Muestra",
    ];

    // ⭐ Cuando seleccionas operación
    const handleSelectOperacion = async (op) => {
        setOperacionSeleccionada(op);

        try {
            // ✔ Obtener acción actual
            const resp = await axios.get(
                `/reporte-proceso-extrude/${reporteId}/ultima-accion`
            );

            const accionActiva = resp.data.accion;
            if (accionActiva && accionActiva.accion === op.name) {
                console.log("REPETIDA — cerrar e iniciar nueva");

                // ⭐ Si esta acción requiere fórmula → pedirla de nuevo
                if (operacionesConFormula.includes(op.name)) {
                    setOperacionSeleccionada(op);
                    setOpenDialogFormula(true);
                    return;
                }

                await cerrarAccionActualYReiniciar(accionActiva, op.name);
                return;
            }
        } catch (e) {
            console.error("Error obteniendo acción activa", e);
        }

        // ⭐ Si es PARO → abrir el diálogo de selección de paro
        if (op.name === "Paro") {
            setOpenDialogParo(true);
            return;
        }

        // ⭐ Si requiere fórmula
        if (operacionesConFormula.includes(op.name)) {
            setOpenDialogFormula(true);
        } else {
            handleIniciarAccion(op.name, null);
        }
    };

    const cerrarAccionActualYReiniciar = async (accionActiva, nombreAccion) => {
        const requiereKilos = ACCIONES_CON_KILOS.includes(accionActiva.accion);

        // ✔ Si esta acción requiere kilos → abrir diálogo y luego iniciar nueva
        if (requiereKilos) {
            setAccionParaCerrar(accionActiva);

            // Guardas acción pendiente con la MISMA acción de origen
            setAccionPendiente({
                accion: nombreAccion,
                numeroFormula: accionActiva.no_formula ?? null,
            });

            setOpenDialogKilos(true);
            return;
        }

        // ✔ Si NO requiere kilos → cerrar directo e iniciar la nueva
        await axios.put(
            `/reporte-proceso-extrude/accion/${accionActiva.id}/cerrar`
        );

        iniciarNuevaAccion(nombreAccion, accionActiva.no_formula ?? null);
    };

    // ⭐ Confirmar fórmula → crear acción
    const confirmarFormula = () => {
        if (!numeroFormula.trim()) {
            toast.warning("Ingresa el número de fórmula");
            return;
        }

        handleIniciarAccion(operacionSeleccionada.name, numeroFormula);

        setOpenDialogFormula(false);
        setNumeroFormula("");
    };

    const handleIniciarAccion = async (nuevaAccion, numeroFormula = null) => {
        try {
            const resp = await axios.get(
                `/reporte-proceso-extrude/${reporteId}/ultima-accion`
            );
            const accionActiva = resp.data.accion;

            if (accionActiva) {
                const requiereKilos = ACCIONES_CON_KILOS.includes(
                    accionActiva.accion
                );

                if (requiereKilos) {
                    setAccionParaCerrar(accionActiva);

                    // ⭐ Guardar también la fórmula
                    setAccionPendiente({
                        accion: nuevaAccion,
                        numeroFormula,
                    });

                    setOpenDialogKilos(true);
                    return;
                } else {
                    await axios.put(
                        `/reporte-proceso-extrude/accion/${accionActiva.id}/cerrar`
                    );
                }
            }

            iniciarNuevaAccion(nuevaAccion, numeroFormula);
        } catch (error) {
            console.error(error);
            toast.error("Error al cambiar de acción.");
        }
    };

    const iniciarNuevaAccion = async (
        accion,
        numeroFormula = null,
        paro = null
    ) => {
        const ahora = new Date();

        await axios.post("/reporte-proceso-extrude/accion", {
            reporte_proceso_id: reporteId,
            accion,
            fecha_inicio: ahora.toLocaleDateString("es-MX"),
            hora_inicio: ahora.toLocaleTimeString("es-MX"),
            no_formula: numeroFormula,
            paro: paro, // ⭐ Nuevo campo
        });

        toast.success(`Acción "${accion}" iniciada`);
    };

    const cargarAcciones = async () => {
        try {
            await axios.get(`/reporte-proceso-extrude/${reporteId}/acciones`);
        } catch (error) {
            console.error("Error al cargar acciones", error);
        }
    };
    const handleConfirmarKilos = async () => {
        try {
            if (!accionParaCerrar) return;

            await axios.put(
                `/reporte-proceso-extrude/accion/${accionParaCerrar.id}/cerrar`,
                {
                    kilos: kilos,
                }
            );

            setOpenDialogKilos(false);

            // ⭐ iniciar acción pendiente con su fórmula correcta
            if (accionPendiente) {
                iniciarNuevaAccion(
                    accionPendiente.accion,
                    accionPendiente.numeroFormula
                );
            }

            setKilos("");
            setAccionPendiente(null);
            setAccionParaCerrar(null);
        } catch (error) {
            console.error(error);
            toast.error("Error al guardar kilos.");
        }
    };
    const handleSelectParo = (paro) => {
        setParoSeleccionado(paro);
        setOpenDialogParo(false);

        // ⭐ Si el paro tiene sub-paros → abrir segundo diálogo
        if (paro.tipo_paro) {
            setOpenDialogSubParo(true);
        } else {
            // ⭐ Si NO tiene subparos → iniciar acción directo
            iniciarNuevaAccion(
                "Paro",
                null,
                `${paro.num} - ${paro.description}`
            );
        }
    };
    const handleSelectSubParo = (sub) => {
        setOpenDialogSubParo(false);

        const paroTexto = `${paroSeleccionado.num}-${paroSeleccionado.description} / ${sub.num}-${sub.description}`;

        iniciarNuevaAccion("Paro", null, paroTexto);
    };

    return (
        <div>
            {/* Tarjetas con tu diseño */}
            <OperacionesIniciales
                operaciones={operacionesIniciales}
                onSelectOperacion={handleSelectOperacion}
            />

            {/* Dialog para capturar número de fórmula */}
            <DialogFormula
                open={openDialogFormula}
                numeroFormula={numeroFormula}
                setNumeroFormula={setNumeroFormula}
                onClose={() => setOpenDialogFormula(false)}
                onConfirm={confirmarFormula}
            />
            <DialogKilos
                open={openDialogKilos}
                kilos={kilos}
                setKilos={setKilos}
                onClose={() => setOpenDialogKilos(false)}
                onConfirm={handleConfirmarKilos}
            />
            {/* Selección de PARO */}
            <DialogParo
                open={openDialogParo}
                onClose={() => setOpenDialogParo(false)}
                onSelectParo={handleSelectParo}
            />

            {/* Selección de SUB PARO */}
            {paroSeleccionado?.tipo_paro && (
                <DialogParo
                    open={openDialogSubParo}
                    onClose={() => setOpenDialogSubParo(false)}
                    onSelectParo={handleSelectSubParo}
                    paros={paroSeleccionado.tipo_paro} // ⭐ IMPORTANTE
                />
            )}

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
