import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Proceso from "@/Components/Extrusores/Accones/Proceso";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Operaciones from "@/Components/Extrusores/Accones/Operaciones";

export default function ProcesoExtr54_2({ reporte }) {
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [formulaActual, setFormulaActual] = useState(
        () => localStorage.getItem(`formulaActual_${reporte.id}`) || null
    );

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

    // 🔹 Cada vez que cambia la fórmula, la guardamos
    useEffect(() => {
        if (formulaActual) {
            localStorage.setItem(`formulaActual_${reporte.id}`, formulaActual);
        }
    }, [formulaActual, reporte.id]);

    return (
        <AuthenticatedLayout>
            <div className="p-2">
                <h2 className="">Acciones del proceso</h2>

                <div className="flex justify-between mb-1 lg:mb-5 gap-1">
                    <span className="">
                        {reporte.producto_nombre} ({reporte.producto_clave})
                    </span>

                    <p className="font-semibold">Orden: {reporte.orden}</p>
                    <p className="font-semibold">Lote: {reporte.lote}</p>
                    <div className="flex border border-[#7c380b] rounded-lg px-1 items-center">
                        <strong>
                            {fechaActual} - {horaActual}
                        </strong>
                    </div>
                    <div className="bg-[#ffed85] p-1 rounded-lg">
                        <p className="font-bold text-[#481b00] text-[17px]">
                            {formulaActual
                                ? `Fórmula: ${formulaActual}`
                                : "Sin fórmula activa"}
                        </p>
                    </div>
                </div>

                <Operaciones
                    reporteId={reporte.id}
                    onFormulaChange={setFormulaActual}
                />
            </div>
        </AuthenticatedLayout>
    );
}
