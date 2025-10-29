import React from "react";
import { router } from "@inertiajs/react";
import ExtrusoresData from "@/database/Extrusion/Extrusores";

export default function Cards() {
    const handleClick = (extrusor) => {
        if (extrusor.page) {
            // Usa el campo `page` directamente como ruta
            router.visit(`/extrusion${extrusor.page}`);
        } else {
            console.warn(`No se ha definido una página para ${extrusor.name}`);
        }
    };

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {ExtrusoresData.map((extrusor, index) => (
                    <div
                        key={extrusor.id}
                        onClick={() => handleClick(extrusor)}
                        className={`cursor-pointer p-3 text-center rounded-2xl shadow-md font-semibold flex gap-1 justify-between items-center transition-transform transform hover:scale-105 ${
                            index % 2 === 0
                                ? "bg-[#ffdd46] text-[#481b00]"
                                : "bg-[#7eb8dd] text-[#15293c]"
                        }`}
                    >
                        <img
                            src="/img/Extrusores/extrusora.png"
                            alt=""
                            className="w-[30%]"
                        />
                        <p className="text-[18px]">{extrusor.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
