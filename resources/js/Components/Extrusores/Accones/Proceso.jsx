import React, { useState, useEffect } from "react";

export default function Proceso() {
    const procesos = [
        {
            id: 1,
            name: "Proceso",
            formula: 1,
            color: "#2ECC40", // Verde
        },
        {
            id: 2,
            name: "Limpieza",
            formula: 2,
            color: "#3498DB", // Azul
        },
        {
            id: 3,
            name: "Ajuste",
            formula: 3,
            color: "#A67C52", // Marrón
        },
        {
            id: 4,
            name: "Calidad",
            formula: 4,
            color: "#F1C40F", // Amarillo
        },
        {
            id: 5,
            name: "Paro",
            formula: 5,
            color: "#E74C3C", // Rojo
        },
    ];

    return (
        <div className="mt-[0.2rem] lg:mt-6 p-2 ">
            <h2 className="font-bold mb-2">Línea de tiempo de procesos</h2>

            <div className="flex w-full">
                {procesos.map((p, index) => (
                    <div
                        key={p.id}
                        className="flex-1 flex flex-col items-center justify-center text-center border border-gray-400 text-xs sm:text-sm font-semibold transition-all duration-500"
                        style={{
                            backgroundColor: "#d1d5db", // gris cuando no está activo
                        }}
                    >
                        <span>{p.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
