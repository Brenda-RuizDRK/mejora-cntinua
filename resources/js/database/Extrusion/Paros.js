export const ParosExtrucion = [
    {
        id: "1",
        num: "37",
        description: "NO HAY PERSONAL PARA OPERAR EL EQUIPO",
    },
    { id: "2", num: "38", description: "PROBLEMA CON EL PROCESO" },
    { id: "3", num: "39", description: "FALTA DE MONTACARGAS" },
    {
        id: "4",
        num: "41",
        description: "OTROO DE EXTRUSIÓN (DEFINIR)",
        tipo_paro: [
            { id: "1", num: "G", description: "APAGN ELECTRICO" },
            { id: "2", num: "H", description: "INVENTARIO" },
            { id: "3", num: "I", description: "SISMO" },
            { id: "4", num: "J", description: "NO HAY BASCULAS" },
            { id: "5", num: "K", description: "NO HAY AGUA" },
            { id: "6", num: "L", description: "NO HAY FLECHAS LIMPIAS" },
        ],
    },
    { id: "5", num: "65", description: "ACONDICIONAMIENTO PARA ARRANQUE" },
    { id: "6", num: "66", description: "NO HAY CONTENEDORES" },
    { id: "7", num: "67", description: "CALENTAMIENTO DE MAQUINA" },
    { id: "8", num: "68", description: "PURGA DE CAÑON" },
    { id: "9", num: "69", description: "APAGAN MAQUINA" },
    { id: "10", num: "70", description: "MUESTRA INTRAPROCESO" },
    { id: "11", num: "75", description: "FALTA HOJA DE PROCESO" },
    { id: "12", num: "76", description: "SE DESPEGA EQUIPO" },
    { id: "13", num: "77", description: "ESPERANDO OTRA OLLA CARGADA" },
    { id: "14", num: "A", description: "SIN PREMUESTRA LIBERADA" },
    { id: "15", num: "B", description: "NO HAY OLLA CARGADA" },
    { id: "16", num: "C", description: "ESPERANDO RESULTADOS DE CALIDAD" },
    { id: "17", num: "D", description: "SIN ASIGNACIÓN DE MATERIAL" },
    { id: "18", num: "E", description: "NO HAY POLVOS FINOS" },
    { id: "19", num: "F", description: "ESPERANDO FORMULA" },
];

export default ParosExtrucion;
