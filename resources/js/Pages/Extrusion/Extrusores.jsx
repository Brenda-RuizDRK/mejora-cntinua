import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Cards from "@/Components/Extrusores/Cards";

export default function Extrusores() {
    return (
        <AuthenticatedLayout>
            <Head title="Extrusores" />
            <div className="p-3 m-3 bg-white shadow-md rounded-lg ">
                <h1>Extusion</h1>
                <Cards />
            </div>
        </AuthenticatedLayout>
    );
}
