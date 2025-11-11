import React, { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@mui/material";
import { RiFileExcel2Fill } from "react-icons/ri";

export default function Reguistro() {
    const { acciones } = usePage().props;
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [filtroMaquina, setFiltroMaquina] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");

    // 🔍 Obtener lista única de máquinas y estatus
    const maquinas = [
        ...new Set(
            acciones
                .map((a) => a.reporte_proceso_extrude?.maquina)
                .filter(Boolean)
        ),
    ];
    const statusList = [
        ...new Set(acciones.map((a) => a.status).filter(Boolean)),
    ];

    // 🔎 Filtrar, buscar y ordenar
    const filteredAcciones = useMemo(() => {
        const searchLower = search.toLowerCase();

        const filtered = acciones.filter((accion) => {
            const reporte = accion.reporte_proceso_extrude;
            const producto =
                reporte?.etiqueta_produccion?.producto2?.nombre || "";
            const clave = reporte?.etiqueta_produccion?.producto2?.clave || "";
            const orden = reporte?.orden || "";
            const lote = reporte?.lote || "";
            const operador = accion.operador || "";
            const accionTxt = accion.accion || "";
            const maquina = reporte?.maquina || "";
            const status = accion.status || "";

            // ✅ Filtros combinados
            const matchesSearch =
                producto.toLowerCase().includes(searchLower) ||
                clave.toLowerCase().includes(searchLower) ||
                orden.toLowerCase().includes(searchLower) ||
                lote.toLowerCase().includes(searchLower) ||
                operador.toLowerCase().includes(searchLower) ||
                accionTxt.toLowerCase().includes(searchLower);

            const matchesMaquina = filtroMaquina
                ? maquina === filtroMaquina
                : true;

            const matchesStatus = filtroStatus ? status === filtroStatus : true;

            return matchesSearch && matchesMaquina && matchesStatus;
        });

        // 🧭 Ordenar por fecha de inicio
        return filtered.sort((a, b) => {
            const dateA = new Date(a.fecha_inicio);
            const dateB = new Date(b.fecha_inicio);
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
    }, [acciones, search, sortOrder, filtroMaquina, filtroStatus]);

    const handleExport = () => {
        window.location.href = "/extrusion/acciones/export";
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                    <h1 className="text-2xl font-bold text-gray-800">
                        📋 Historial de Extrusión
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: 10,
                        }}
                    ></div>

                    {/* 🔍 Buscador y filtros */}
                    <div className="flex flex-wrap items-center gap-2">
                        <input
                            type="text"
                            placeholder="Buscar producto, orden, operador..."
                            className="border rounded-lg px-3 py-2 text-sm w-64 focus:ring focus:ring-blue-300"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={filtroMaquina}
                            onChange={(e) => setFiltroMaquina(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">Todas las máquinas</option>
                            {maquinas.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filtroStatus}
                            onChange={(e) => setFiltroStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2 text-sm"
                        >
                            <option value="">Todos los estatus</option>
                            {statusList.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleExport}
                            className="flex px-4 py-2 rounded-lg text-sm gap-1 bg-green-700"
                        >
                            <RiFileExcel2Fill className="text-[20px]" />
                            Descargar Excel
                        </button>

                        {/* 🔽 Botón de orden */}
                        <button
                            onClick={() =>
                                setSortOrder((prev) =>
                                    prev === "asc" ? "desc" : "asc"
                                )
                            }
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                            {sortOrder === "asc"
                                ? "⬆️ Más antiguo"
                                : "⬇️ Más reciente"}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto border rounded-lg shadow-md">
                    <table className="min-w-full text-sm border-collapse">
                        <thead className="bg-[#efb003] text-gray-700 border-b">
                            <tr>
                                <th className="border px-3 py-2">ID</th>
                                <th className="border px-3 py-2">Orden</th>
                                <th className="border px-3 py-2">Lote</th>
                                <th className="border px-3 py-2">Clave</th>
                                <th className="border px-3 py-2 w-[200px]">
                                    Nombre
                                </th>
                                <th className="border px-3 py-2">Máquina</th>
                                <th className="border px-3 py-2">Acción</th>
                                <th className="border px-3 py-2">Operador</th>
                                <th className="border px-3 py-2">Paro</th>
                                <th className="border px-3 py-2">Comentario</th>
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
                                <th className="border px-3 py-2">Estatus</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredAcciones.length > 0 ? (
                                filteredAcciones.map((accion) => (
                                    <tr
                                        key={accion.id}
                                        className="hover:bg-gray-50 border-b text-center"
                                    >
                                        <td className="border px-3 py-2">
                                            {accion.id}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.orden || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.lote || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.etiqueta_produccion?.producto2
                                                ?.clave || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {accion.reporte_proceso_extrude
                                                ?.etiqueta_produccion?.producto2
                                                ?.nombre || "-"}
                                        </td>
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
                                            {accion.comentario || "-"}
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
                                        <td className="border px-3 py-2">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    accion.status === "Activo"
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}
                                            >
                                                {accion.status || "-"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="15"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        No hay registros coincidentes
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
