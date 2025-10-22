import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-br from-[#ffda05] to-[#0962aa]">
            {/* SECCIÓN IZQUIERDA: Ilustración */}
            <div className="relative flex flex-col justify-center items-center w-full sm:w-1/2 bg-[url(/img/Login.jpg)] bg-no-repeat bg-cover bg-center rounded-br-[80px] sm:rounded-br-[200px] overflow-hidden"></div>

            {/* SECCIÓN DERECHA: Formulario */}
            <div className="flex flex-col justify-center items-center w-full sm:w-1/2 text-white px-6 sm:px-12 py-12">
                <div className="absolute top-[130px] ">
                    <Link href="/">
                        <ApplicationLogo className="h-16 w-16 text-[#ebcb41]" />
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-white">
                        Bienvenido
                    </h2>
                    {children}
                </div>

                <div className="mt-6 text-sm text-gray-300">
                    ¿No tienes una cuenta?{" "}
                    <Link className="text-teal-300 hover:underline">
                        Solicita el acceso
                    </Link>
                </div>
            </div>
        </div>
    );
}
