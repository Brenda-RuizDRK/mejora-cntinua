import { usePage } from "@inertiajs/react";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    console.log("👤 Usuario logueado:", auth?.user);

    return (
        <div>
            <nav>Bienvenido {auth?.user?.nombre}</nav>
            <main>{children}</main>
        </div>
    );
}
