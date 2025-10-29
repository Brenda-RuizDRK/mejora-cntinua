import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import Proceso from "@/Components/Extrusores/Accones/Proceso";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Operaciones from "@/Components/Extrusores/Accones/Operaciones";

export default function ProcesoExtr54_2({ reporte }) {
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");

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
                    <div className="flex ">
                        <strong>Fecha:</strong>
                        <strong>
                            {fechaActual} - {horaActual}
                        </strong>
                    </div>
                </div>
                <Operaciones reporteId={reporte.id} />
                <Proceso reporteId={reporte.id} />
            </div>
        </AuthenticatedLayout>
    );
}
