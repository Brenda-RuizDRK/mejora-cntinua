import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Reguistro() {
    const { acciones } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    📋 Historial de Acciones — Extrusión
                </h1>

                <div className="overflow-x-auto border rounded-lg shadow-md">
                    <table className="min-w-full text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-700 border-b">
                            <tr>
                                <th className="border px-3 py-2">ID</th>
                                <th className="border px-3 py-2">Orden</th>
                                <th className="border px-3 py-2">Lote</th>
                                <th className="border px-3 py-2">Máquina</th>
                                <th className="border px-3 py-2">Acción</th>
                                <th className="border px-3 py-2">Operador</th>
                                <th className="border px-3 py-2">Paro</th>
                                <th className="border px-3 py-2">
                                    No. Fórmula
                                </th>
                                <th className="border px-3 py-2">
                                    Fecha Inicio
                                </th>
                                <th className="border px-3 py-2">
                                    Hora Inicio
                                </th>
                                <th className="border px-3 py-2">
                                    Fecha Final
                                </th>
                                <th className="border px-3 py-2">Hora Final</th>
                            </tr>
                        </thead>

                        <tbody>
                            {acciones.length > 0 ? (
                                acciones.map((accion) => (
                                    <tr
                                        key={accion.id}
                                        className="hover:bg-gray-50 border-b text-center"
                                    >
                                        <td className="border px-3 py-2">
                                            {accion.id}
                                        </td>

                                        {/* ✅ ORDEN */}
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.orden || "-"}
                                        </td>

                                        {/* ✅ LOTE */}
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.lote || "-"}
                                        </td>

                                        {/* ✅ MAQUINA */}
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.maquina || "-"}
                                        </td>

                                        <td className="border px-3 py-2">
                                            {accion.accion}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.operador}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.paro || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.no_formula || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.fecha_inicio}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.hora_inicio}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.fecha_final || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.hora_final || "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No hay registros en la base de datos
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
