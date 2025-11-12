import React, { useEffect, useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Proceso from "@/Components/Extrusores/Accones/Proceso";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Operaciones from "@/Components/Extrusores/Accones/Operaciones";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";

export default function ProcesoExtr54_2({ reporte }) {
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [formulaActual, setFormulaActual] = useState(
        () => localStorage.getItem(`formulaActual_${reporte.id}`) || null
    );
    const [ultimaAccion, setUltimaAccion] = useState(null);
    const [accionPasada, setAccionPasada] = useState(null);
    const [accionEnEdicion, setAccionEnEdicion] = useState(null);
    const cargadoRef = useRef(false); // 🚫 evita múltiples llamadas al montar

    // 🕒 fecha/hora en tiempo real
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setFechaActual(now.toLocaleDateString());
            setHoraActual(now.toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 💾 Guarda fórmula en localStorage
    useEffect(() => {
        if (formulaActual)
            localStorage.setItem(`formulaActual_${reporte.id}`, formulaActual);
    }, [formulaActual]);

    // 🔄 Obtener acciones (solo si se solicita o recarga la página)
    const fetchAcciones = async () => {
        try {
            const [ultima, pasada] = await Promise.all([
                axios.get(
                    `/reporte-proceso-extrude/${reporte.id}/ultima-accion`
                ),
                axios.get(
                    `/reporte-proceso-extrude/${reporte.id}/accion-pasada`
                ),
            ]);
            setUltimaAccion(ultima.data?.accion || null);
            setAccionPasada(pasada.data?.accion_pasada || null);
        } catch (e) {
            console.error("Error al obtener acciones:", e);
        }
    };

    // 🧠 Solo ejecuta una vez al cargar la página
    useEffect(() => {
        if (!cargadoRef.current) {
            cargadoRef.current = true;
            fetchAcciones();
        }
    }, [reporte.id]);

    // ✏️ Editar acción
    const handleEditarAccion = () => {
        if (!ultimaAccion) return;
        setAccionEnEdicion(ultimaAccion);
        toast.info("Editando acción en curso...");
    };

    // 🗑️ Eliminar acción
    const handleEliminarAccion = async () => {
        if (!ultimaAccion) return;
        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar esta acción?"
        );
        if (!confirmar) return;

        try {
            await axios.delete(
                `/reporte-proceso-extrude/accion/${ultimaAccion.id}`
            );
            toast.success("Acción eliminada correctamente.");
            setUltimaAccion(null);
            fetchAcciones();
        } catch (e) {
            console.error(e);
            toast.error("Error al eliminar la acción.");
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="p-2">
                <h2 className="font-bold text-lg">Acciones del proceso</h2>

                <div className="flex flex-wrap gap-1 items-center justify-between w-full">
                    <span>
                        {reporte.producto_nombre} ({reporte.producto_clave})
                    </span>
                    <p className="font-semibold">Orden: {reporte.orden}</p>
                    <p className="font-semibold">Lote: {reporte.lote}</p>
                    <p className="font-semibold">
                        {fechaActual} - {horaActual}
                    </p>

                    {ultimaAccion && (
                        <div className="bg-[#ffed85] p-1 rounded-lg">
                            <p className="font-bold text-[#481b00] text-[17px]">
                                Fórmula: {ultimaAccion.no_formula}
                            </p>
                        </div>
                    )}
                </div>

                {/* 🟣 Acción pasada */}
                {accionPasada && (
                    <div className="mt-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-lg shadow">
                        <p className="font-bold">
                            Acción anterior: {accionPasada.accion}
                        </p>
                        <p className="text-sm">
                            Operador: {accionPasada.operador} —{" "}
                            {accionPasada.fecha_inicio}{" "}
                            {accionPasada.hora_inicio}
                        </p>
                    </div>
                )}

                {/* 🟢 Última acción */}
                {ultimaAccion && (
                    <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow flex justify-between items-center">
                        <div>
                            <p className="font-bold">
                                Acción Actual: {ultimaAccion.accion}
                            </p>
                            <p className="text-sm">
                                Operador: {ultimaAccion.operador} —{" "}
                                {ultimaAccion.fecha_inicio}{" "}
                                {ultimaAccion.hora_inicio}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <IconButton onClick={handleEditarAccion}>
                                <MdModeEditOutline className="text-yellow-500" />
                            </IconButton>
                            <IconButton onClick={handleEliminarAccion}>
                                <RiDeleteBin6Fill className="text-red-500" />
                            </IconButton>
                        </div>
                    </div>
                )}

                {/* ⚙️ Componente de operaciones */}
                <Operaciones
                    reporteId={reporte.id}
                    onFormulaChange={setFormulaActual}
                    onUltimaAccion={(accion) => {
                        setAccionPasada(ultimaAccion);
                        setUltimaAccion(accion);
                    }}
                    accionActualFormula={ultimaAccion?.accion}
                    accionEnEdicion={accionEnEdicion}
                    setAccionEnEdicion={setAccionEnEdicion}
                    onUpdateAccion={fetchAcciones} // 🔄 se llama solo cuando el usuario lo pida
                />
            </div>
        </AuthenticatedLayout>
    );
}
