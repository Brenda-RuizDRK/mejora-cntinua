import React, { useEffect, useState } from "react";
import { GiPowder } from "react-icons/gi";
import axios from "axios";
import { router } from "@inertiajs/react"; // 👈 importa router de Inertia
import { FcSurvey } from "react-icons/fc";

export default function Card() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get("/productos-ext54");
                setProductos(res.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        fetchProductos();
    }, []);

    // 👇 función para redirigir
    const handleClick = (id) => {
        router.visit(`/reporte-proceso-extrude/${id}/acciones`);
    };

    return (
        <div className="flex flex-col items-center ">
            {/*   <p className="font-bold text-yellow-700">Formula Activa</p> */}
            {productos.length === 0 ? (
                <p className="text-gray-500">
                    No hay productos activos en EXT54
                </p>
            ) : (
                productos.map((producto) => (
                    <div
                        key={producto.id}
                        onClick={() => handleClick(producto.id)} // 👈 click redirige
                        className="border inline-block p-3 rounded-2xl bg-white shadow-md hover:shadow-lg transition-transform duration-300 border-l-4 border-amber-400 w-fit cursor-pointer hover:-translate-y-1"
                    >
                        <div className="flex justify-between gap-3">
                            <div className="flex gap-2">
                                <GiPowder className="text-amber-800 text-xl" />
                                <span className="font-semibold">
                                    {producto.clave}
                                </span>
                            </div>

                            <p>
                                <span className="font-semibold">Fórmula:</span>{" "}
                                {producto.formula}
                            </p>
                        </div>

                        <p className="font-bold text-gray-700">
                            {producto.nombre}
                        </p>

                        <span className="ml-2 w-fit font-bold text-yellow-700 bg-yellow-200 px-2 py-1 rounded flex items-center gap-1">
                            <FcSurvey /> {producto.accion}
                        </span>
                    </div>
                ))
            )}
        </div>
    );
}
