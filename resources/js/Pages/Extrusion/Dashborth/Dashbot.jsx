import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatCard from "@/Components/Extrusores/Dashbort/StatCard";
import { FaIndustry, FaChartLine, FaBolt, FaBell } from "react-icons/fa";
import ExtruderCard from "@/Components/Extrusores/Dashbort/ExtruderCard";
import ExtruderDialog from "@/Components/Extrusores/Dashbort/ExtruderDialog";

export default function Dashbot() {
    const [selected, setSelected] = useState(null);
    const [open, setOpen] = useState(false);

    // MOCK (después lo conectas a API)
    const extruders = [
        {
            name: "M-01",
            status: "Operando",
            formula: "F-2024-B",
            product: "Polietileno HD",
            production: 56.3,
        },
        {
            name: "M-02",
            status: "Mantenimiento",
            formula: "F-2025-PRO",
            product: "PVC Industrial",
            production: 27.8,
        },
        {
            name: "M-03",
            status: "Operando",
            formula: "F-2024-A",
            product: "ABS Negro",
            production: 62.1,
        },
    ];

    const handleOpen = (item) => {
        setSelected(item);
        setOpen(true);
    };
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Extrude" />

            <div className="component">
                {/* CONTENIDO */}
                <div className="p-6">
                    {/* TITULO SECCION */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Sistema de Producción
                        </h2>
                        <p className="text-sm text-gray-500">
                            Monitoreo en tiempo real
                        </p>
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2rem]">
                        <StatCard
                            title="Molinos Activos"
                            value="9"
                            subtitle="/18"
                            icon={<FaIndustry />}
                            bgColor="bg-green-100"
                            textColor="text-green-900"
                            borderColor="border-green-200"
                            iconColor="text-green-600"
                        />

                        <StatCard
                            title="Producción Total"
                            value="814.7"
                            subtitle="ton"
                            icon={<FaChartLine />}
                            bgColor="bg-blue-100"
                            textColor="text-blue-900"
                            borderColor="border-blue-200"
                            iconColor="text-blue-600"
                        />

                        <StatCard
                            title="Eficiencia"
                            value="87"
                            subtitle="%"
                            icon={<FaBolt />}
                            bgColor="bg-yellow-100"
                            textColor="text-yellow-900"
                            borderColor="border-yellow-200"
                            iconColor="text-yellow-600"
                        />

                        <StatCard
                            title="Alertas Activas"
                            value="8"
                            icon={<FaBell />}
                            bgColor="bg-red-100"
                            textColor="text-red-900"
                            borderColor="border-red-200"
                            iconColor="text-red-600"
                        />
                    </div>
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-2">
                            Estado de Extrusores
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Click en una tarjeta para ver detalle
                        </p>

                        {/* GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {extruders.map((item, i) => (
                                <ExtruderCard
                                    key={i}
                                    extruder={item}
                                    onClick={handleOpen}
                                />
                            ))}
                        </div>

                        {/* DIALOG */}
                        <ExtruderDialog
                            open={open}
                            onClose={() => setOpen(false)}
                            extruder={selected}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
