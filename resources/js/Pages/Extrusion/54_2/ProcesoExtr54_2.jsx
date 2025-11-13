import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Operaciones from "@/Components/Extrusores/Accones/Operaciones";
import useAccionesExtrusor from "@/Hooks/useAccionesExtrusor";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-toastify";
import axios from "axios";

export default function ProcesoExtr54_2({ reporte }) {
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [formulaActual, setFormulaActual] = useState(
        () => localStorage.getItem(`formulaActual_${reporte.id}`) || null
    );

    // ✅ Hook reutilizable
    const {
        ultimaAccion,
        accionPasada,
        setUltimaAccion,
        setAccionPasada,
        fetchAcciones,
        eliminarAccion,
    } = useAccionesExtrusor(reporte.id);

    const [accionEnEdicion, setAccionEnEdicion] = useState(null);

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

    const handleEditarAccion = () => {
        if (!ultimaAccion) return;
        setAccionEnEdicion(ultimaAccion);
        toast.info("Editando acción en curso...");
    };

    const handleEliminarAccion = async () => {
        await eliminarAccion();
        toast.success("Acción eliminada correctamente.");
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
                    onUpdateAccion={fetchAcciones}
                />
            </div>
        </AuthenticatedLayout>
    );
}
