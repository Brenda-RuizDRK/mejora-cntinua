import React from "react";

export default function Usuarios({ usuarios }) {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">Nombre</th>
                        <th className="border px-2 py-1">Apellido</th>
                        <th className="border px-2 py-1">Usuario</th>
                        <th className="border px-2 py-1">Rol</th>
                        <th className="border px-2 py-1">Permisos</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id}>
                            <td className="border px-2 py-1">{u.id}</td>
                            <td className="border px-2 py-1">{u.nombre}</td>
                            <td className="border px-2 py-1">{u.apellido}</td>
                            <td className="border px-2 py-1">{u.username}</td>
                            <td className="border px-2 py-1">
                                {u.rol?.name || "Sin rol"}
                            </td>
                            {/*  <td className="border px-2 py-1">
                                {u.rol?.permissions}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
