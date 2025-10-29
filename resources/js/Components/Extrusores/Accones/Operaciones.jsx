import React from "react";
import axios from "axios";
import "../../../../css/Compnents/Extrude.css";

export default function Operaciones({ reporteId }) {
    const operaciones = [
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

    const registrarAccion = async (accion) => {
        try {
            // 🔹 Obtener fecha y hora actual en formato YYYY-MM-DD HH:mm:ss
            const ahora = new Date();
            const fechaHoraLocal = new Date(
                ahora.getTime() - ahora.getTimezoneOffset() * 60000
            )
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            await axios.post("/reporte-proceso-extrude/accion", {
                reporte_proceso_id: reporteId,
                fecha_hora_inicio: fechaHoraLocal, // ✅ guarda la fecha actual
                fecha_hora_final: null,
                accion: accion.name,
            });

            alert(`Acción "${accion.name}" registrada correctamente.`);
        } catch (error) {
            console.error("Error al guardar acción:", error);
            alert("Error al registrar la acción.");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {operaciones.map((operacion) => (
                    <div
                        key={operacion.id}
                        onClick={() => registrarAccion(operacion)}
                        className="cursor-pointer p-[0.5rem] text-center rounded-2xl shadow-md font-semibold flex gap-1 justify-around items-center transition-transform transform hover:scale-105"
                        style={{
                            backgroundColor: operacion.bgColor,
                            color: operacion.color,
                        }}
                    >
                        <div
                            className="text-2xl font-extrabold bordeText"
                            style={{ WebkitTextStrokeColor: operacion.color }}
                        >
                            {operacion.abreviatura}
                        </div>
                        <div className="text-[15px] lg:text-base">
                            {operacion.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
