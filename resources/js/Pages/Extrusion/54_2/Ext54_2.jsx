import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Info from "@/Components/Extrusores/InfoProducto/Info";
import Card from "@/Components/Extrusores/Card/Card";
import AccionAnterior from "@/Components/Extrusores/Card/AccionAnterior";

export default function Ext54_2() {
    return (
        <AuthenticatedLayout>
            <Head title="Ext 54_2" />

            <div className="component">
                <div className="flex justify-center">
                    <h1>Ext54 II</h1>
                </div>
                <Card />
                <AccionAnterior />
                <Info maquina="EXT54-II" /> {/* Pasamos la prop */}
            </div>
        </AuthenticatedLayout>
    );
}
