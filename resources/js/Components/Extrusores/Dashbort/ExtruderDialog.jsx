// ExtruderDialog.jsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { X, Activity, Thermometer, Gauge, Zap, Package } from "lucide-react";
import { FaTachometerAlt } from "react-icons/fa";

const statusStyles = {
    Operando: "bg-green-100 text-green-700",
    Mantenimiento: "bg-orange-100 text-orange-700",
    Detenido: "bg-red-100 text-red-700",
    Standby: "bg-gray-100 text-gray-700",
};

export default function ExtruderDialog({ open, onClose, extruder }) {
    if (!extruder) return null;

    const ingredients = [
        { name: "Materia Prima A", value: 45 },
        { name: "Materia Prima B", value: 30 },
        { name: "Aditivo C", value: 15 },
        { name: "Catalizador D", value: 10 },
    ];

    const timeline = [
        {
            label: "Proceso extrusión",
            color: "bg-green-300",
            left: "10%",
            width: "28%",
            text: "2.00 hr",
        },
        {
            label: "Limpieza",
            color: "bg-blue-300",
            left: "42%",
            width: "12%",
            text: "45 min",
        },
        {
            label: "Formula Muestra",
            color: "bg-yellow-300",
            left: "53%",
            width: "18%",
            text: "1.25 hr",
        },
        {
            label: "Proceso extrusión",
            color: "bg-green-300",
            left: "78%",
            width: "14%",
            text: "1.00 hr",
        },
    ];

    const history = [
        {
            date: "22 abr",
            formula: "F-2024-B",
            production: "91.0 ton",
            efficiency: "81%",
        },
        {
            date: "23 abr",
            formula: "F-2024-C",
            production: "98.6 ton",
            efficiency: "88%",
        },
        {
            date: "24 abr",
            formula: "F-2024-C",
            production: "94.0 ton",
            efficiency: "95%",
        },
        {
            date: "25 abr",
            formula: "F-2024-A",
            production: "84.3 ton",
            efficiency: "83%",
        },
        {
            date: "26 abr",
            formula: "F-2024-A",
            production: "92.3 ton",
            efficiency: "93%",
        },
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            PaperProps={{
                className: "rounded-2xl shadow-2xl bg-[#f8f9fb]",
            }}
        >
            <DialogContent className="p-0">
                <div className="p-4">
                    {/* HEADER */}
                    <div className="flex justify-between items-start border-b ">
                        <div className="flex gap-7">
                            <h2 className="text-4xl font-bold text-gray-900">
                                {extruder.name}
                            </h2>

                            <div className="flex items-center gap-3 mt-3">
                                <span
                                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                        statusStyles[extruder.status]
                                    }`}
                                >
                                    {extruder.status}
                                </span>

                                <span className="text-gray-500 text-lg">
                                    Fórmula: {extruder.formula}
                                </span>
                            </div>
                        </div>

                        <IconButton onClick={onClose}>
                            <X size={28} />
                        </IconButton>
                    </div>
                    <div className="flex gap-8 ">
                        {/* STATS */}
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                                <p className="text-sm text-blue-600 flex items-center gap-2">
                                    <Package size={16} />
                                    Producción por turno
                                </p>
                                <h3 className="text-3xl font-bold mt-2">
                                    {extruder.production} kilos
                                </h3>
                            </div>

                            <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                                <p className="text-sm text-orange-600 flex items-center gap-2">
                                    <FaTachometerAlt size={16} />
                                    Revoluciones por minuto
                                </p>
                                <h3 className="text-3xl font-bold mt-2">
                                    1,200 RPM
                                </h3>
                            </div>
                        </div>

                        {/* FORMULA DETAILS */}
                        <div className="mt-4 bg-white rounded-2xl border p-3 shadow-sm">
                            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                <Activity size={22} />
                                Detalles de Fórmula
                            </h3>

                            <div className="grid grid-cols-1 gap-8">
                                <div className="space-y-2 text-gray-700">
                                    <p>
                                        <b>Código:</b> PGL239508-1
                                    </p>
                                    <p>
                                        <b>Tamaño de lote:</b> 1197 kg
                                    </p>
                                    <p>
                                        <b>Tiempo del proceso:</b> 30 min
                                    </p>
                                    {/* <p>
                                        <b>Presión:</b> 4 bar
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TIMELINE */}
                    <div className="mt-8 bg-white rounded-2xl border p-6 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6">
                            Cronograma de Procesos del Día
                        </h3>

                        <div className="border rounded-xl overflow-hidden">
                            {/* GRID PRINCIPAL */}
                            <div className="grid grid-cols-[180px_1fr]">
                                {/* LABELS IZQUIERDA */}
                                <div className="bg-white border-r">
                                    {[
                                        "Proceso extrusión",
                                        "Procesos",
                                        "Ajustes Producción",
                                        "Limpieza",
                                        "Formula Muestra",
                                        "Mantenimiento",
                                        "Paro",
                                        "Muestra",
                                    ].map((label, idx) => (
                                        <div
                                            key={idx}
                                            className="h-6 border-b flex items-center px-3 text-sm font-medium text-gray-800"
                                        >
                                            {label}
                                        </div>
                                    ))}

                                    {/* FOOTER VACÍO */}
                                    <div className="h-10 border-b"></div>
                                </div>

                                {/* AREA DE CRONOGRAMA */}
                                <div className="relative bg-gray-50">
                                    {/* Líneas horizontales */}
                                    {Array.from({ length: 8 }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            className="h-6 border-b border-gray-300"
                                        ></div>
                                    ))}

                                    {/* Líneas verticales */}
                                    <div className="absolute inset-0 flex justify-between pointer-events-none">
                                        {Array.from({ length: 10 }).map(
                                            (_, idx) => (
                                                <div
                                                    key={idx}
                                                    className="h-full border-l border-gray-200"
                                                ></div>
                                            ),
                                        )}
                                    </div>

                                    <div
                                        className="absolute top-0 h-[220px] bg-green-300 border border-green-400 flex flex-col justify-center items-center text-center font-medium text-sm"
                                        style={{
                                            left: "0%",
                                            width: "28%",
                                        }}
                                    >
                                        <span>Proceso extrusión</span>
                                    </div>

                                    {/* Limpieza */}
                                    <div
                                        className="absolute bg-blue-200 border border-blue-300 flex flex-col justify-center items-center text-center font-medium text-sm"
                                        style={{
                                            top: "72px",
                                            left: "28%",
                                            width: "10%",
                                            height: "150px",
                                        }}
                                    >
                                        <span>Limpieza</span>
                                    </div>

                                    {/* Formula muestra */}
                                    <div
                                        className="absolute bg-yellow-200 border border-yellow-300 flex flex-col justify-center items-center text-center font-medium text-sm"
                                        style={{
                                            top: "92px",
                                            left: "38%",
                                            width: "14%",
                                            height: "100px",
                                        }}
                                    >
                                        <span>Formula</span>
                                        <span>Muestra</span>
                                    </div>

                                    {/* Proceso extrusión 2 */}
                                    <div
                                        className="absolute top-0 h-[220px] bg-green-300 border border-green-400 flex flex-col justify-center items-center text-center font-medium text-sm"
                                        style={{
                                            left: "52%",
                                            width: "18%",
                                        }}
                                    >
                                        <span>Proceso extrusión</span>
                                    </div>

                                    {/* Muestra */}
                                    <div
                                        className="absolute bg-pink-200 border border-pink-300 flex flex-col justify-center items-center text-center font-medium text-sm"
                                        style={{
                                            top: "165px",
                                            left: "70%",
                                            width: "10%",
                                            height: "28px",
                                        }}
                                    >
                                        <span>Muestra</span>
                                    </div>

                                    {/* FOOTER TIEMPOS */}
                                    <div className="absolute bottom-0 left-0 right-0 h-10 border-t bg-white flex text-sm font-medium text-gray-800">
                                        <div className="w-[28%] flex items-center justify-start pl-2 border-r">
                                            2hr
                                        </div>
                                        <div className="w-[10%] flex items-center justify-center border-r">
                                            45 min
                                        </div>
                                        <div className="w-[14%] flex items-center justify-center border-r">
                                            1,25 mn
                                        </div>
                                        <div className="w-[18%] flex items-center justify-center border-r">
                                            1hr
                                        </div>
                                        <div className="w-[10%] flex items-center justify-center">
                                            30 min
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* LABEL INFERIOR */}
                            <div className="text-center py-3 font-medium border-t bg-white">
                                Tiempos
                            </div>
                        </div>
                    </div>

                    {/* HISTORY */}
                    {/*  <div className="mt-8 bg-white rounded-2xl border p-6 shadow-sm">
                        <h3 className="text-2xl font-bold mb-6">
                            Histórico de Producción (Últimos 7 días)
                        </h3>
                        <div className="flex items-end gap-8 h-48 border-b pb-4 mb-6">
                            {[91, 99, 94, 84, 92, 74, 78].map((val, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div
                                        className="bg-green-500 rounded-t-md w-10"
                                        style={{ height: `${val * 1.2}px` }}
                                    ></div>
                                    <span className="text-xs text-gray-500">
                                        {22 + i} abr
                                    </span>
                                </div>
                            ))}
                        </div>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b text-gray-500">
                                    <th className="py-3">Fecha</th>
                                    <th>Fórmula</th>
                                    <th>Producción</th>
                                    <th>Eficiencia</th>
                                </tr>
                            </thead>

                            <tbody>
                                {history.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-3">{item.date}</td>
                                        <td>{item.formula}</td>
                                        <td>{item.production}</td>
                                        <td>
                                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-xs font-semibold">
                                                {item.efficiency}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> */}
                </div>
            </DialogContent>
        </Dialog>
    );
}
