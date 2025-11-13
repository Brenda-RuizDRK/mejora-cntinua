import { useEffect, useState, useRef } from "react";
import axios from "axios";

/**
 * Hook personalizado para obtener y gestionar las acciones
 * (última y pasada) de un extrusor en base a su reporte ID.
 */
export default function useAccionesExtrusor(reporteId) {
    const [ultimaAccion, setUltimaAccion] = useState(null);
    const [accionPasada, setAccionPasada] = useState(null);
    const cargadoRef = useRef(false);

    // 🔄 Obtener las acciones
    const fetchAcciones = async () => {
        if (!reporteId) return;
        try {
            const [ultima, pasada] = await Promise.all([
                axios.get(
                    `/reporte-proceso-extrude/${reporteId}/ultima-accion`
                ),
                axios.get(
                    `/reporte-proceso-extrude/${reporteId}/accion-pasada`
                ),
            ]);
            setUltimaAccion(ultima.data?.accion || null);
            setAccionPasada(pasada.data?.accion_pasada || null);
        } catch (error) {
            console.error("Error al obtener acciones:", error);
        }
    };

    // 🧠 Ejecutar solo una vez al montar
    useEffect(() => {
        if (!cargadoRef.current) {
            cargadoRef.current = true;
            fetchAcciones();
        }
    }, [reporteId]);

    // 🗑️ Eliminar acción actual
    const eliminarAccion = async () => {
        if (!ultimaAccion) return;
        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar esta acción?"
        );
        if (!confirmar) return;

        try {
            await axios.delete(
                `/reporte-proceso-extrude/accion/${ultimaAccion.id}`
            );
            setUltimaAccion(null);
            await fetchAcciones();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar la acción.");
        }
    };

    return {
        ultimaAccion,
        accionPasada,
        setUltimaAccion,
        setAccionPasada,
        fetchAcciones,
        eliminarAccion,
    };
}
