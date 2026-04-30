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
            <div className="border rounded-xl overflow-hidden">
                {/* GRID PRINCIPAL */}
                <div className="grid grid-cols-[110px_1fr]">
                    {/* LABELS IZQUIERDA */}
                    <div className="bg-white border-r">
                        {[
                            "Proc. extrusión",
                            "Procesos",
                            "Ajus. Producción",
                            "Limpieza",
                            "F. Muestra",
                            "Mantenimiento",
                            "Paro",
                            "Muestra",
                        ].map((label, idx) => (
                            <div
                                key={idx}
                                className="h-6 border-b flex items-center px-2 pt-3 text-[12px] font-medium text-gray-800 "
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
                            {Array.from({ length: 10 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className="h-full border-l border-gray-200"
                                ></div>
                            ))}
                        </div>

                        <div
                            className="absolute top-0 h-[220px] bg-green-300 border border-green-400 flex flex-col justify-center items-center text-center font-medium text-sm"
                            style={{
                                left: "0%",
                                width: "28%",
                            }}
                        >
                            <span className="text-[11px]">
                                Proceso extrusión
                            </span>
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
                            <span className="text-[11px]">Limpieza</span>
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
                            <span className="text-[11px]">F. Muestra</span>
                        </div>

                        {/* Proceso extrusión 2 */}
                        <div
                            className="absolute top-0 h-[220px] bg-green-300 border border-green-400 flex flex-col justify-center items-center text-center font-medium text-sm"
                            style={{
                                left: "52%",
                                width: "18%",
                            }}
                        >
                            <span className="text-[11px]">Proc. extrusión</span>
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
                            <span className="text-[11px]">Muestra</span>
                        </div>

                        {/* FOOTER TIEMPOS */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 border-t bg-white flex text-[13px] font-medium text-gray-800">
                            <div className="w-[28%] flex items-center justify-start pl-2 border-r ">
                                2hr
                            </div>
                            <div className="w-[10%] flex items-center justify-center border-r ">
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
                <div className="text-center py-1 font-medium border-t bg-white text-[12px]">
                    Tiempos
                </div>
            </div>
        </div>
    );
}
