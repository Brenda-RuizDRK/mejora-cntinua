import React from "react";

export default function OperacionesIniciales({
    operaciones,
    onSelectOperacion,
}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
            {operaciones.map((operacion) => (
                <div
                    key={operacion.id}
                    onClick={() =>
                        onSelectOperacion && onSelectOperacion(operacion)
                    }
                    className="relative cursor-pointer rounded-lg shadow-md"
                    style={{ backgroundColor: operacion.bgColor }}
                >
                    <div className="absolute inset-0 flex items-center justify-start opacity-30 pl-1 left-[-1%]">
                        {operacion.icons}
                    </div>

                    <div className="relative flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left px-2 py-2">
                        <div className="text-[30px] sm:text-[33px] lg:text-[40px] font-extrabold tracking-wide contorno text-[#f2f9fd] leading-tight">
                            {operacion.abreviatura}
                        </div>

                        <div className="text-[16px] sm:text-[18px] font-bold leading-tight mt-1 sm:mt-0 overflow-visible">
                            {operacion.name.toUpperCase()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
