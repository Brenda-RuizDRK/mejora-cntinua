import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Proceso from "@/Components/Extrusores/Accones/Proceso";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Operaciones from "@/Components/Extrusores/Accones/Operaciones";
import axios from "axios";

export default function ProcesoExtr54_2({ reporte }) {
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [formulaActual, setFormulaActual] = useState(
        () => localStorage.getItem(`formulaActual_${reporte.id}`) || null
    );
    const [ultimaAccion, setUltimaAccion] = useState(null);

    useEffect(() => {
        const actualizarFechaHora = () => {
            const ahora = new Date();
            setFechaActual(ahora.toLocaleDateString());
            setHoraActual(ahora.toLocaleTimeString());
        };
        actualizarFechaHora();
        const intervalo = setInterval(actualizarFechaHora, 1000);
        return () => clearInterval(intervalo);
    }, []);

    // 🔹 Guardar fórmula activa
    useEffect(() => {
        if (formulaActual) {
            localStorage.setItem(`formulaActual_${reporte.id}`, formulaActual);
        }
    }, [formulaActual, reporte.id]);

    // 🔹 Cargar la última acción al iniciar
    useEffect(() => {
        const fetchUltimaAccion = async () => {
            try {
                const res = await axios.get(
                    `/reporte-proceso-extrude/${reporte.id}/ultima-accion`
                );
                setUltimaAccion(res.data?.accion || null);
            } catch (err) {
                console.error("Error al obtener última acción:", err);
            }
        };
        fetchUltimaAccion();
    }, [reporte.id]);

    return (
        <AuthenticatedLayout>
            <div className="p-2">
                <h2 className="">Acciones del proceso</h2>

                <div className="flex flex-wrap gap-1 items-center justify-between w-full">
                    <span>
                        {reporte.producto_nombre} ({reporte.producto_clave})
                    </span>

                    <p className="font-semibold">Orden: {reporte.orden}</p>
                    <p className="font-semibold">Lote: {reporte.lote}</p>
                    <p className="flex rounded-lg px-1 items-center font-bold">
                        {fechaActual}-{horaActual}
                    </p>
                    <div className="bg-[#ffed85] p-1 rounded-lg">
                        <p className="font-bold text-[#481b00] text-[17px]">
                            {formulaActual
                                ? `Form: ${formulaActual}`
                                : "Sin fórmula activa"}
                        </p>
                    </div>
                </div>

                {/* 🟢 Mostrar última acción */}
                {ultimaAccion && (
                    <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow">
                        <p className="font-bold">
                            Última acción: {ultimaAccion.accion}
                        </p>
                        <p className="text-sm">
                            Operador: {ultimaAccion.operador} —{" "}
                            {ultimaAccion.fecha_inicio}{" "}
                            {ultimaAccion.hora_inicio}
                        </p>
                    </div>
                )}

                {/* 🟣 Componente de operaciones */}
                <Operaciones
                    reporteId={reporte.id}
                    onFormulaChange={setFormulaActual}
                    onUltimaAccion={(accion) => setUltimaAccion(accion)}
                />
            </div>
        </AuthenticatedLayout>
    );
}
