document.addEventListener("DOMContentLoaded", () => {
    const breadcrumb = document.getElementById("breadcrumb");
    if (!breadcrumb) return;

    breadcrumb.innerHTML = ""; // limpiar

    // Obtener la ruta actual
    const path = window.location.pathname
        .split("/")
        .filter(segment => segment !== "");

    // 🔍 Para verificar qué ruta está leyendo
    console.log("Ruta detectada:", path);

    // Agregar el enlace a Inicio
    const homeItem = document.createElement("li");
    homeItem.className = "breadcrumb-item";
    const homeLink = document.createElement("a");
    homeLink.href = "/";
    homeLink.textContent = "Inicio";
    homeItem.appendChild(homeLink);
    breadcrumb.appendChild(homeItem);

    // Si no hay más segmentos, terminamos
    if (path.length === 0) return;

    // Crear los demás elementos
    let rutaAcumulada = "";
    path.forEach((segmento, index) => {
        rutaAcumulada += `/${segmento}`;
        const item = document.createElement("li");
        item.classList.add("breadcrumb-item");

        // Formatear texto
        const texto = decodeURIComponent(segmento)
            .replace(/-/g, " ")
            .replace(/\b\w/g, l => l.toUpperCase());

        if (index < path.length - 1) {
            const link = document.createElement("a");
            link.href = rutaAcumulada;
            link.textContent = texto;
            item.appendChild(link);
        } else {
            item.textContent = texto;
            item.classList.add("active");
            item.setAttribute("aria-current", "page");
        }

        breadcrumb.appendChild(item);
    });
});

