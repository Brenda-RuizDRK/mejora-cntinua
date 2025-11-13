import React, { useState } from "react";
import { Bell } from "lucide-react";

export default function HeaderMonitoreo() {
    const [open, setOpen] = useState(false);

    const notificaciones = [
        {
            id: 1,
            tipo: "error",
            titulo: "Fallo en máquina M-016",
            descripcion: "Error crítico detectado en M-016 - Acción requerida",
            maquina: "M-016",
            tiempo: "Ahora",
        },
        {
            id: 2,
            tipo: "success",
            titulo: "Producción completada M-005",
            descripcion: "Objetivo alcanzado M-005 - Acción requerida",
            maquina: "M-005",
            tiempo: "Ahora",
        },
        {
            id: 3,
            tipo: "warning",
            titulo: "Mantenimiento requerido M-003",
            descripcion: "Temperatura elevada M-003 - Acción requerida",
            maquina: "M-003",
            tiempo: "Ahora",
        },
    ];

    const getColor = (tipo) => {
        switch (tipo) {
            case "error":
                return "bg-blue-700 border-blue-600";
            case "success":
                return "bg-green-700 border-green-600";
            case "warning":
                return "bg-yellow-700 border-yellow-600";
            default:
                return "bg-gray-700 border-gray-600";
        }
    };

    return (
        <div className="relative  p-4 flex justify-between items-start">
            {/* Título */}
            <div>
                <h1 className="text-2xl font-bold">Monitoreo de Máquinas</h1>
                <p className="text-sm text-gray-500">
                    Panel de control en tiempo real - 16 máquinas activas
                </p>
            </div>

            {/* Botón de notificaciones */}
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="relative  hover:bg-[#ffae00] p-2 rounded-lg border border-[#ffae00] transition"
                >
                    <Bell className="w-6 h-6 text-gray-200" />
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        7
                    </span>
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 mt-2 w-80  border border-gray-800 rounded-lg shadow-lg z-50">
                        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
                            <p className="text-sm text-gray-300">
                                Notificaciones{" "}
                                <span className="text-gray-500">
                                    7 sin leer
                                </span>
                            </p>
                            <button className="text-xs text-blue-400 hover:underline">
                                Marcar todas como leídas
                            </button>
                        </div>

                        <div className="max-h-72 overflow-y-auto">
                            {notificaciones.map((n) => (
                                <div
                                    key={n.id}
                                    className={`p-3 border-b border-gray-800 ${getColor(
                                        n.tipo
                                    )} hover:brightness-110 transition`}
                                >
                                    <p className="font-semibold text-sm">
                                        {n.titulo}
                                    </p>
                                    <p className="text-xs text-gray-200">
                                        {n.descripcion}
                                    </p>
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>{n.maquina}</span>
                                        <span>{n.tiempo}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
