import React, { useEffect, useState } from "react";
import { GiPowder } from "react-icons/gi";
import { FcSurvey } from "react-icons/fc";
import axios from "axios";
import { router } from "@inertiajs/react";
import useAccionesExtrusor from "@/Hooks/useAccionesExtrusor";

export default function Card() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get("/productos-ext54");
                console.log(
                    "📦 Datos obtenidos de /productos-ext54:",
                    res.data
                );
                setProductos(res.data);
            } catch (error) {
                console.error("❌ Error al obtener productos:", error);
            }
        };
        fetchProductos();
    }, []);

    const handleClick = (id) => {
        router.visit(`/reporte-proceso-extrude/${id}/acciones`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-4">
            {productos.length === 0 ? (
                <p className="text-gray-500">
                    No hay productos activos en EXT54
                </p>
            ) : (
                productos.map((producto) => (
                    <ProductoCard
                        key={producto.id}
                        producto={producto}
                        onClick={() => handleClick(producto.id)}
                    />
                ))
            )}
        </div>
    );
}

function ProductoCard({ producto, onClick }) {
    const { ultimaAccion } = useAccionesExtrusor(producto.id);

    return (
        <div
            onClick={onClick}
            className="border inline-block p-4 rounded-2xl bg-white shadow-md hover:shadow-lg transition-transform duration-300 border-l-4 border-amber-400 w-72 cursor-pointer hover:-translate-y-1"
        >
            <div className="flex justify-between gap-3">
                <div className="flex gap-2 items-center">
                    <GiPowder className="text-amber-800 text-xl" />
                    <span className="font-semibold">{producto.clave}</span>
                </div>

                <p>
                    <span className="font-semibold">Fórmula:</span>{" "}
                    {producto.formula}
                </p>
            </div>

            <p className="font-bold text-gray-700 mt-2">{producto.nombre}</p>

            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                <p>
                    <span className="font-semibold">Fecha:</span>{" "}
                    {producto.fecha}
                </p>
            </div>

            <span className="mt-2 ml-2 w-fit font-bold text-yellow-700 bg-yellow-200 px-2 py-1 rounded flex items-center gap-1">
                <FcSurvey /> {ultimaAccion?.accion || "Sin acción"}
            </span>
        </div>
    );
}
