import React from "react";
import { Link } from "@inertiajs/react";

export default function ExtrusorView({ extrusorId }) {
    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-6">
                Vista del Extrusor {extrusorId}
            </h1>
            <p className="text-gray-600 mb-8">
                Aquí puedes mostrar los detalles, gráficas o producción del
                extrusor.
            </p>
            <Link
                href="/extrusion"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Volver a la lista
            </Link>
        </div>
    );
}
