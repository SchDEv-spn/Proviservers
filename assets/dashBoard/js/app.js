const tabla = document.querySelector("#tabla-1 tbody");

let servicios = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("../../../assets/data/servicios.json")

        .then(response => response.json())

        .then(data => {
            servicios = data;

            // Funciones futuras
            mostrarServicios(servicios)
        })

        .catch(error => {
            console.error("Error al cargar el JSON:", error);
        })
})

function mostrarServicios(servicios) {

    if (!tabla) return;

    // Limpiar tabla actual
    tabla.innerHTML = "";

    const estadoClase = {
        "Completado": "completed",
        "En proceso": "in-progress",
        "Pendiente": "pending"
    }

    // Recorrer los servicios y crear filas dinámicamente
    servicios.forEach(servicio => {
        const claseEstado = estadoClase[servicio.estado] || "pending";
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${servicio.id}</td>
            <td>${servicio.usuario}</td>
            <td>${servicio.direccion}</td>
            <td>${servicio.fecha}</td>
            <td>${servicio.servicio}</td>
            <td><span class="status-badge status-${claseEstado}">${servicio.estado}</span></td>
        `;
        tabla.appendChild(fila);
    });
}