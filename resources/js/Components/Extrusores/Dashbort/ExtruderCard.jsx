import React from "react";

const statusStyles = {
    Operando: "bg-green-100 text-green-700 border-green-300",
    Mantenimiento: "bg-orange-100 text-orange-700 border-orange-300",
    Detenido: "bg-red-100 text-red-700 border-red-300",
    Standby: "bg-gray-100 text-gray-700 border-gray-300",
};

export default function ExtruderCard({ extruder, onClick }) {
    return (
        <div
            onClick={() => onClick(extruder)}
            className="cursor-pointer rounded-xl border p-4 shadow-sm hover:shadow-md transition bg-white"
        >
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{extruder.name}</h3>

                <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                        statusStyles[extruder.status] || "bg-gray-100"
                    }`}
                >
                    {extruder.status}
                </span>
            </div>

            {/* INFO PRINCIPAL */}
            <div className="mt-3 space-y-1">
                <p className="text-[12px] text-gray-500 mt-2">Producto</p>
                <p className="font-bold text-[#164864]">{extruder.product}</p>

                <div className="flex gap-2 items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 text-[12px]">
                            Fórmula
                        </p>
                        <p className="font-semibold text-gray-800">
                            {extruder.formula}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 text-[12px] ">
                            Kilos
                        </p>
                        <p className="font-bold text-blue-600">
                            {extruder.production} Kg
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
