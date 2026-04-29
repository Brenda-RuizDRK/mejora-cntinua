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
            name: "EXT54-II",
            status: "Operando",
            formula: "F-45",
            product: "BODY ARMOR BLACK MINI TEXT CR 25927",
            clave: "ZNT625927",
            production: 56.3,
        },
        {
            name: "EXTBUSS-I",
            status: "Limpieza",
            formula: "F-45",
            product: "RAL 7044 38964",
            clave: "WML338964",
            production: 56.3,
        },
        {
            name: "EXT70-II",
            status: "Mantenimiento",
            formula: "F-2",
            product: "Polietileno HD",
            clave: "POL567890",
            production: 56.3,
        },
        {
            name: "EXT54-IV",
            status: "Mantenimiento",
            formula: "F-2",
            product: "WERNER GLOSS TAN 35550",
            clave: "WML335550",
            production: 56.3,
        },
        {
            name: "EXT54-V",
            status: "Limpieza",
            formula: "Formula-02",
            product: "GRIS ANSI 61/6558",
            clave: "PGL30092",
            production: 56.3,
        },
        {
            name: "EXT54-I",
            status: "Operando",
            formula: "F-5",
            product: "RAL 210 70 35 AZURE II 37261 CC23lietileno HD",
            clave: "ZZL237261",
            production: 56.3,
        },
        {
            name: "EXT-58",
            status: "Operando",
            formula: "F-6",
            product: "RAL 9003 SIGNAL WHITE RPSD",
            clave: "ZBR233612",
            production: 56.3,
        },
        {
            name: "EXT-40",
            status: "Operando",
            formula: "Formula-09",
            product: "GRIS EUROPA TG V 33252",
            clave: "PGM533252",
            production: 56.3,
        },
        {
            name: "EXT54-III",
            status: "Mantenimiento",
            formula: "Formula-11",
            product: "MARTILLADO GRVE 36136",
            clave: "MRT36136",
            production: 56.3,
        },
        {
            name: "EXT54-VII",
            status: "Operando",
            formula: "F-09",
            product: "GRIS F28 38278",
            clave: "PGT538278",
            production: 56.3,
        },
        {
            name: "EXT70-I",
            status: "Operando",
            formula: "F-09",
            product: "B12 WHITE 37477",
            clave: "PBL337477",
            production: 56.3,
        },
        {
            name: "EXTBUSS-II",
            status: "Limpieza",
            formula: "F-2",
            product: "NEGRO MB 40002",
            clave: "NGB40002",
            production: 56.3,
        },
        {
            name: "EXT-26-I",
            status: "Operando",
            formula: "Formula-01",
            product: "HUESO 7960",
            clave: "PML10151",
            production: 56.3,
        },
        {
            name: "EXT54-VI",
            status: "Mantenimiento",
            formula: "Formula-08",
            product: "CHARCOAL CR 34355",
            clave: "CHC34355",
            production: 56.3,
        },
        {
            name: "EXT70-III",
            status: "Mantenimiento",
            formula: "Formula-02",
            product: "MMI BLACK 27418",
            clave: "MMI27418",
            production: 56.3,
        },
        {
            name: "EXT54-VIII",
            status: "Mantenimiento",
            formula: "Formula-03",
            product: "GRIS CONTAINER 39508",
            clave: "PGL239508",
            production: 27.8,
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
                <div className="p-3">
                    {/* TITULO SECCION */}
                    <div className="mb-2">
                        <h2 className="text-[25px] font-bold text-gray-800">
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
