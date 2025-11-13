import HeaderMonitoreo from "@/Components/Extrusores/HeaderMonitoreo";
import Extrusores from "@/Components/Extrusores/Card/maquinas/Extrusores";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dasbhort() {
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen  text-white">
                <HeaderMonitoreo />
                <div className="p-4 component">
                    <Extrusores />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
