import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function Info({ maquina = "" }) {
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [fechaActual, setFechaActual] = useState("");
    const [horaActual, setHoraActual] = useState("");
    const [orden, setOrden] = useState("");
    const [lote, setLote] = useState("");
    const [form, setForm] = useState("");
    const [kilos, setKilos] = useState("");

    useEffect(() => {
        axios
            .get("/productos-etiqueta")
            .then((res) => setProductos(res.data))
            .catch((err) => console.error("Error cargando productos:", err));
    }, []);

    useEffect(() => {
        const actualizarFechaHora = () => {
            const ahora = new Date();
            setFechaActual(ahora.toLocaleDateString());
            setHoraActual(ahora.toLocaleTimeString());
        };
        actualizarFechaHora();
        const intervalo = setInterval(actualizarFechaHora, 1000);
        return () => clearInterval(intervalo);
    }, []);

    const handleChange = (selectedOption) => {
        setProductoSeleccionado(selectedOption);
    };

    const guardarInformacion = async () => {
        try {
            if (!productoSeleccionado) {
                alert("Selecciona un producto");
                return;
            }

            const data = {
                producto_etiqueta_id: productoSeleccionado.id,
                lote,
                orden,
                maquina,
                fecha: fechaActual,
                hora: horaActual,
                formulas_totales: form,
                kg_formula: kilos,
                nombre_operador: "Nombre Operador",
                nom_supervisor: "Nombre Supervisor",
            };

            const res = await axios.post("/reporte-proceso-extrude", data);

            if (res.data.success) {
                const id = res.data.id; // 👈 tomamos el ID del registro recién creado
                alert("Información guardada correctamente");

                // 🔹 Redirigimos a la vista de acciones del proceso
                window.location.href = `/reporte-proceso-extrude/${id}/acciones`;
            }
        } catch (error) {
            console.error(error);
            alert("Error al guardar la información");
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-[1.5rem] items-center">
                {/* Producto */}
                <div className="flex flex-col w-[450px]">
                    <strong>Producto:</strong>
                    <Select
                        value={productoSeleccionado}
                        onChange={handleChange}
                        options={productos}
                        isSearchable
                        placeholder="Nombre y Clave del producto"
                        getOptionLabel={(option) =>
                            `${option.nombre} - ${option.clave}`
                        }
                        getOptionValue={(option) => option.id}
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: "#ffcb1b",
                                borderWidth: "1px",
                                borderRadius: "6px",
                                minHeight: "38px",
                                boxShadow: "none",
                                "&:hover": { borderColor: "#ffcb1b" },
                            }),
                        }}
                    />
                </div>

                {/* Campos adicionales */}
                <div className="flex flex-col">
                    <strong>Clave:</strong>
                    <input
                        name="clave"
                        value={productoSeleccionado?.clave || ""}
                        readOnly
                        className="w-[140px] border p-1 bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Orden:</strong>
                    <input
                        name="orden"
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="w-[130px] border p-1"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Lote:</strong>
                    <input
                        name="lote"
                        value={lote}
                        onChange={(e) => setLote(e.target.value)}
                        className="w-[130px] border p-1"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>No. Form:</strong>
                    <input
                        name="form"
                        value={form}
                        onChange={(e) => setForm(e.target.value)}
                        className="w-[80px] border p-1"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Kilos:</strong>
                    <input
                        name="kilos"
                        value={kilos}
                        onChange={(e) => setKilos(e.target.value)}
                        className="w-[90px] border p-1"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Extrusor:</strong>
                    <input
                        name="maquina"
                        value={maquina}
                        readOnly
                        className="w-[120px] border p-1 bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Fecha:</strong>
                    <input
                        name="fecha"
                        value={fechaActual}
                        readOnly
                        className="w-[120px] border p-1 bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <strong>Hora:</strong>
                    <input
                        name="hora"
                        value={horaActual}
                        readOnly
                        className="w-[120px] border p-1 bg-gray-100"
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <button
                    className="mt-5 bg-yellow-500 px-4 py-2 rounded"
                    onClick={guardarInformacion}
                >
                    Guardar Información
                </button>
            </div>
        </>
    );
}
