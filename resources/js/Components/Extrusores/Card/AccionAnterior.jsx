import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AccionAnterior({ reporteId }) {
    const [acciones, setAcciones] = useState([]);

    useEffect(() => {
        if (!reporteId) return;

        const fetchAcciones = async () => {
            try {
                const res = await axios.get(
                    `/reporte-proceso-extrude/${reporteId}/acciones-json`
                );
                setAcciones(res.data.acciones || []);
            } catch (error) {
                console.error("Error al obtener acciones:", error);
            }
        };

        fetchAcciones();
    }, [reporteId]);

    return (
        <div className="border p-3 rounded bg-gray-100">
            <h2 className="font-bold text-lg mb-2">Acciones registradas</h2>

            {acciones.length === 0 && (
                <p className="text-gray-600">No hay acciones registradas.</p>
            )}

            {acciones.map((a) => (
                <div
                    key={a.id}
                    className="p-2 my-2 bg-white shadow rounded border"
                >
                    <p>
                        <strong>Acción:</strong> {a.accion}
                    </p>
                    <p>
                        <strong>Inicio:</strong> {a.fecha_inicio}{" "}
                        {a.hora_inicio}
                    </p>
                    <p>
                        <strong>Final:</strong> {a.fecha_final ?? "—"}{" "}
                        {a.hora_final ?? ""}
                    </p>
                    <p>
                        <strong>Fórmula:</strong> {a.no_formula ?? "—"}
                    </p>
                    <p>
                        <strong>Operador:</strong> {a.operador ?? "—"}
                    </p>
                </div>
            ))}
        </div>
    );
}
