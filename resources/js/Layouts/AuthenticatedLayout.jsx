import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { FaRegUserCircle } from "react-icons/fa";

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;

    useEffect(() => {
        console.log("👤 Usuario logueado:", auth?.user);
    }, []); // ✅ solo una vez

    return (
        <>
            <div>
                <div className="min-h-screen bg-gray-100">
                    <nav className="bg-[#f8c009] border-b border-gray-100">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-8 lg:h-16 items-center">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex ">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                        className="text-black"
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        href={route("extrusion.index")}
                                        active={route().current(
                                            "extrusion.index"
                                        )}
                                        className="text-black"
                                    >
                                        Tiempos Extruson
                                    </NavLink>

                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 "
                                                >
                                                    Usuarios
                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content
                                            align="left"
                                            width="48"
                                        >
                                            <Dropdown.Link
                                            /*   href={route(
                                                            "admin.usuario"
                                                        )} */
                                            >
                                                Usuarios
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                            /*   href={route(
                                                            "usuarios.crear"
                                                        )} */
                                            >
                                                Crear Usuarios
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                                <div className="hidden sm:flex sm:items-center sm:ml-6  h-4 lg:h-16">
                                    <div className="ml-3 relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-md">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-600 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150 gap-1"
                                                    >
                                                        <FaRegUserCircle />
                                                        {auth.user.nombre}
                                                        {auth.user.apellido}
                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link>
                                                    Perfil
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Cerrar sesión
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>{" "}
                    <main>{children}</main>
                </div>
            </div>
        </>
    );
}
