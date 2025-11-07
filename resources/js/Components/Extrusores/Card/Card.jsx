import React, { useEffect, useState } from "react";
import { GiPowder } from "react-icons/gi";
import axios from "axios";

export default function Card() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get("/api/productos-ext54");
                setProductos(res.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };
        fetchProductos();
    }, []);

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {productos.length === 0 ? (
                <p className="text-gray-500">
                    No hay productos activos en EXT54
                </p>
            ) : (
                productos.map((producto) => (
                    <div
                        key={producto.id}
                        className="border inline-block p-3 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-amber-400 w-64"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <GiPowder className="text-amber-800 text-xl" />
                            <p className="font-bold text-gray-700">
                                {producto.nombre}
                            </p>
                        </div>
                        <p>
                            <span className="font-semibold">Clave:</span>{" "}
                            {producto.clave}
                        </p>
                        <p>
                            <span className="font-semibold">Fórmula:</span>{" "}
                            {producto.formula}
                        </p>
                        <p>
                            <span className="font-semibold">Fecha:</span>{" "}
                            {producto.fecha}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}
