import React from "react";
import Paro from "@/Components/Acciones/Paro";
import { FaTools } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import Extrusor from "@/Components/Acciones/Extrusor";
import { IoIosTimer } from "react-icons/io";
import { FaGears } from "react-icons/fa6";
import { GiChemicalDrop } from "react-icons/gi";
import { RiTestTubeFill } from "react-icons/ri";

export const operacionesIniciales = [
    {
        id: 1,
        name: "Proceso Extrusión",
        abreviatura: "PRE",
        color: "#145318",
        bgColor: "#BBF7BC",
        icons: <Extrusor />,
    },
    {
        id: 2,
        name: "Procesos",
        abreviatura: "REPE",
        color: "#621679",
        bgColor: "#EBD3FF",
        icons: <IoIosTimer className="text-[70px]" />,
    },
    {
        id: 3,
        name: "Ajustes de Producción",
        abreviatura: "AP",
        color: "#714012",
        bgColor: "#E5D1A3",
        icons: <FaGears className="text-[80px]" />,
    },
    {
        id: 4,
        name: "Limpieza",
        abreviatura: "LIM",
        color: "#194061",
        bgColor: "#C3DFF4",
        icons: <FaDroplet className="text-[70px]" />,
    },
    {
        id: 5,
        name: "Formula en Muestra",
        abreviatura: "FM",
        color: "#C98D05",
        bgColor: "#FEFAC3",
        icons: <RiTestTubeFill className="text-[70px]" />,
    },
    {
        id: 6,
        name: "Mantenimiento",
        abreviatura: "MAN",
        color: "#CC4902",
        bgColor: "#FFC26D",
        icons: <FaTools className="text-[70px]" />,
    },
    {
        id: 7,
        name: "Paro",
        abreviatura: "PARO",
        color: "#D70000",
        bgColor: "#FF9494",
        icons: <Paro />,
    },
    {
        id: 8,
        name: "Muestra",
        abreviatura: "MUE",
        color: "#A70D45",
        bgColor: "#FECCE6",
        icons: <GiChemicalDrop className="text-[70px]" />,
    },
];

export default operacionesIniciales;
