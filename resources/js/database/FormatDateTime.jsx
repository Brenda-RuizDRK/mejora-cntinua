export default function formatDateTime(fecha = new Date(), formato = "visual") {
    const pad = (num) => num.toString().padStart(2, "0");

    const dia = pad(fecha.getDate());
    const mes = pad(fecha.getMonth() + 1);
    const anio = fecha.getFullYear();
    const horas = pad(fecha.getHours());
    const minutos = pad(fecha.getMinutes());
    const segundos = pad(fecha.getSeconds());

    if (formato === "visual") {
        // Formato bonito para mostrar en UI
        return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    } else {
        // Formato compatible con Laravel/MySQL
        return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    }
}
