import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Proceso({ reporteId }) {
    const [acciones, setAcciones] = useState([]);
    const [ahora, setAhora] = useState(new Date());

    // 🕒 Actualiza el tiempo cada segundo (para acciones en curso)
    useEffect(() => {
        const interval = setInterval(() => setAhora(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    // 📡 Cargar acciones del reporte
    const fetchAcciones = async () => {
        try {
            const res = await axios.get(
                `/reporte-proceso-extrude/${reporteId}/acciones-json`
            );
            setAcciones(res.data.acciones || []);
        } catch (error) {
            console.error("Error al cargar acciones:", error);
        }
    };

    useEffect(() => {
        fetchAcciones();
        const interval = setInterval(fetchAcciones, 10000); // 🔁 refresca cada 10 segundos
        return () => clearInterval(interval);
    }, [reporteId]);

    // 🧮 Calcular porcentaje del progreso en tiempo real
    const calcularProgreso = (inicio, fin) => {
        const inicioMs = new Date(inicio).getTime();
        const finMs = fin ? new Date(fin).getTime() : ahora.getTime();
        const duracion = finMs - inicioMs;
        const total = fin ? finMs - inicioMs : duracion;
        const porcentaje = (duracion / total) * 100;
        return Math.min(porcentaje, 100);
    };

    if (acciones.length === 0) {
        return (
            <div className="mt-5 p-4 bg-gray-50 border rounded-xl text-gray-500 italic text-center">
                Sin acciones registradas aún.
            </div>
        );
    }

    return (
        <div className="mt-5 p-4 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                🕓 Línea de Tiempo del Proceso
            </h2>

            <div className="relative flex items-center w-full overflow-x-auto py-4 px-2">
                {/* Línea base */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 rounded-full z-0"></div>

                {/* Puntos y barras de acción */}
                <div className="flex items-center gap-8 w-full z-10">
                    {acciones.map((accion, index) => {
                        const enCurso = !accion.fecha_hora_final;
                        const progreso = calcularProgreso(
                            accion.fecha_hora_inicio,
                            accion.fecha_hora_final
                        );

                        const color = enCurso ? "#16a34a" : "#2563eb"; // verde en curso / azul terminado

                        return (
                            <div
                                key={accion.id}
                                className="flex flex-col items-center min-w-[120px] relative"
                            >
                                {/* Barra entre puntos */}
                                {index > 0 && (
                                    <div
                                        className="absolute top-3 left-[-4rem] h-1 bg-gray-300"
                                        style={{ width: "4rem" }}
                                    ></div>
                                )}

                                {/* Círculo con animación */}
                                <motion.div
                                    className="w-6 h-6 rounded-full border-4 shadow-md"
                                    style={{
                                        backgroundColor: color,
                                        borderColor: enCurso
                                            ? "#bbf7d0"
                                            : "#c7d2fe",
                                    }}
                                    animate={{
                                        scale: enCurso ? [1, 1.2, 1] : 1,
                                        opacity: enCurso ? [0.8, 1, 0.8] : 1,
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: enCurso ? Infinity : 0,
                                    }}
                                ></motion.div>

                                {/* Etiquetas */}
                                <div className="text-sm font-semibold text-gray-700 mt-2 text-center whitespace-nowrap">
                                    {accion.accion}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(
                                        accion.fecha_hora_inicio
                                    ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                    {accion.fecha_hora_final &&
                                        ` - ${new Date(
                                            accion.fecha_hora_final
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}`}
                                </div>

                                {/* Indicador de progreso bajo el punto */}
                                {enCurso && (
                                    <motion.div
                                        className="absolute top-[28px] h-1 rounded-full"
                                        style={{
                                            backgroundColor: "#16a34a",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            width: `${progreso}%`,
                                        }}
                                        animate={{
                                            width: ["0%", `${progreso}%`],
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: "linear",
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
