import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, subHours, differenceInMinutes, parse } from "date-fns";
import { es } from "date-fns/locale";

export default function GraficaAcciones({ reporteId }) {
    const [acciones, setAcciones] = useState([]);
    const [ahora, setAhora] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setAhora(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchAcciones = async () => {
            try {
                const res = await axios.get(
                    `/reporte-proceso-extrude/${reporteId}/acciones-ultimas-3h`
                );
                if (res.data.success) setAcciones(res.data.acciones);
            } catch (err) {
                console.error("Error al obtener acciones:", err);
            }
        };
        fetchAcciones();
    }, [reporteId]);

    const inicio = subHours(ahora, 3);
    const totalMinutos = 3 * 60;

    const getColor = (accion) => {
        if (accion.paro) return "#f87171"; // rojo si fue paro
        if (accion.accion?.toLowerCase().includes("proceso")) return "#34d399"; // verde
        return "#60a5fa"; // azul por defecto
    };

    const convertirAHora = (fecha, hora) => {
        try {
            return parse(`${fecha} ${hora}`, "dd/MM/yyyy HH:mm:ss", new Date());
        } catch {
            return new Date();
        }
    };

    return (
        <div className="mt-6 p-4 bg-gray-900 rounded-xl shadow-lg text-gray-100">
            <h3 className="font-bold text-lg mb-3">
                Línea de tiempo (últimas 3h)
            </h3>

            <div className="relative w-full h-8 bg-gray-800 rounded-lg overflow-hidden">
                {acciones.map((accion, i) => {
                    const inicioAccion = convertirAHora(
                        accion.fecha_inicio,
                        accion.hora_inicio
                    );
                    const finAccion = accion.hora_final
                        ? convertirAHora(accion.fecha_final, accion.hora_final)
                        : ahora;

                    const minutosInicio = Math.max(
                        0,
                        differenceInMinutes(inicioAccion, inicio)
                    );
                    const minutosDuracion = Math.max(
                        1,
                        differenceInMinutes(finAccion, inicioAccion)
                    );

                    const left = (minutosInicio / totalMinutos) * 100;
                    const width = (minutosDuracion / totalMinutos) * 100;

                    return (
                        <div
                            key={i}
                            className="absolute h-full rounded-md"
                            style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                backgroundColor: getColor(accion),
                            }}
                            title={`${accion.accion} (${accion.hora_inicio} - ${
                                accion.hora_final || "en curso"
                            })`}
                        ></div>
                    );
                })}

                {/* Línea de hora actual */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-yellow-400"
                    style={{
                        left: "100%",
                    }}
                ></div>
            </div>

            <div className="flex justify-between text-xs mt-2 text-gray-400">
                <span>{format(inicio, "HH:mm", { locale: es })}</span>
                <span>Ahora ({format(ahora, "HH:mm", { locale: es })})</span>
            </div>
        </div>
    );
}
