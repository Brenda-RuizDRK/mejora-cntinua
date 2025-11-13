import React from "react";
import GraficaAcciones from "../../Graficas/GraficaAcciones";

export default function ExtrusorCard({ reporte }) {
    return (
        <div className=" text-white rounded-xl p-4 w-56 shadow-lg border border-gray-800">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-2">
                <div>
                    <p className="text-xs text-gray-400">M-01</p>
                    <h2 className="text-lg font-semibold">Máquina 1</h2>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-lg">
                    Activa
                </span>

                {/*   <GraficaAcciones reporteId={reporte.id} /> */}
            </div>
        </div>
    );
}
