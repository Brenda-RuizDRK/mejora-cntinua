import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatCard from "@/Components/Extrusores/Dashbort/StatCard";
import { FaIndustry, FaChartLine, FaBolt, FaBell } from "react-icons/fa";
import ExtruderCard from "@/Components/Extrusores/Dashbort/ExtruderCard";
import ExtruderDialog from "@/Components/Extrusores/Dashbort/ExtruderDialog";
import { X, Activity } from "lucide-react";

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

                {/* TITULO SECCION */}
                <div className="flex justify-between items-center ">
                    <div className="mb-2">
                        <h1 className="text-[25px] font-bold text-gray-800 flex items-center gap-2">
                            <Activity size={18} className="text-[#145578]" />
                            Dashboard de Monitoreo - Extrusores
                        </h1>
                        <p className="text-sm text-gray-500">
                            Monitoreo en tiempo real
                        </p>
                    </div>

                    <div className="flex gap-4 items-stretch">
                        <StatCard
                            title="Producción Total"
                            value="814.7"
                            subtitle="Kilos"
                            icon={<FaChartLine />}
                            bgColor="bg-blue-100"
                            textColor="text-blue-900"
                            borderColor="border-blue-200"
                            iconColor="text-blue-600"
                        />

                        <div className="bg-white rounded-2xl border p-2 flex-1">
                            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                <Activity
                                    size={18}
                                    className="text-[#145578]"
                                />
                                Nomenglatura
                            </h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-700">
                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-lime-600 rounded-full"></div>
                                    Proceso extrusión
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#c5b9f9] rounded-full"></div>
                                    Procesos
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#e1cfa7] rounded-full"></div>
                                    Ajustes Producción
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#96c8fa] rounded-full"></div>
                                    Limpieza
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#f8ee90] rounded-full"></div>
                                    Formula Muestra
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#fec073] rounded-full"></div>
                                    Mantenimiento
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#ff1f1f] rounded-full"></div>
                                    Paro
                                </p>

                                <p className="flex gap-1 items-center text-xs">
                                    <div className="w-3 h-3 bg-[#f7d3e0] rounded-full"></div>
                                    Muestra
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CARDS */}

                <div>
                    <p className="text-sm text-gray-500 mb-2">
                        Click en una tarjeta para ver detalle
                    </p>

                    {/* GRID */}
                    <div className="flex gap-2 flex-wrap">
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
        </AuthenticatedLayout>
    );
}
