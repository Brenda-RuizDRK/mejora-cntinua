import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg ">
                        <div className="flex flex-col items-center">
                            <h1 className="text-[25px] text-[#136591] font-bold">
                                Bienvenido a Mejora Continua
                            </h1>
                            <p className="text-[20px] text-[#0f2e42] font-bold uppercase">
                                {auth?.user?.nombre}
                            </p>
                        </div>
                        <hr className="border-2 border-[#49b5e4]" />

                        <div className="p-6 text-gray-900">
                            {/* contenid */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
