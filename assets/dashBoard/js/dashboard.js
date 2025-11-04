/*Primera grafica */

var options = {
    chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false }
    },
    colors: ['#0066ff', '#0e1116'], // Azul y gris oscuro
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    series: [
        {
            name: 'Servicios publicados',
            data: [20, 35, 28, 27, 55, 30, 90, 50, 65, 28, 60, 20]
        },
        {
            name: 'Servicios contratados',
            data: [20, 70, 40, 30, 50, 50, 30, 55, 40, 35, 90, 25]
        }
    ],
    xaxis: {
        categories: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k']
    },
    legend: {
        position: 'bottom',
        markers: { width: 12, height: 12 }
    },
    fill: {
        type: 'solid',
        opacity: 0.6
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

/*segunda grafica */

var optionsUsuarios = {
    chart: {
        type: 'donut',
        height: 250
    },
    series: [34249, 1420], // Clientes activos, Proveedores activos
    labels: ['34249', '1420'],
    labels: ['Clientes activos', 'Proveedores activos'],
    colors: ['#007bff', '#000000'], // Opcional: azul y negro como en el diseño
    dataLabels: {
        enabled: false
    },
    legend: {
        position: 'bottom'
    },
    plotOptions: {
        pie: {
            donut: {
                size: '70%' // Ajusta el grosor del anillo
            }
        }
    }
};

var chartUsuarios = new ApexCharts(document.querySelector("#chart-usuarios"), optionsUsuarios);
chartUsuarios.render();

/*tercera grafica */

var optionsMetricas = {
    chart: {
        type: 'line',
        height: 280,
        toolbar: { show: false }
    },
    series: [
        {
            name: 'Servicios publicados',
            data: [25, 65, 55, 45, 50, 75, 100] // azul
        },
        {
            name: 'Servicios contratados',
            data: [0, 50, 60, 25, 30, 60, 95] // negro
        }
    ],
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    markers: {
        size: 5
    },
    xaxis: {
        categories: ['2015', '2016', '2017', '2018', '2019'],
        labels: {
            style: { fontSize: '12px' }
        }
    },
    yaxis: {
        labels: {
            style: { fontSize: '12px' }
        }
    },
    grid: {
        strokeDashArray: 4
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true,
        position: 'bottom'
    }
};

var chartMetricas = new ApexCharts(
    document.querySelector("#chart-nuevos-servicios"),
    optionsMetricas
);
chartMetricas.render();


document.addEventListener("DOMContentLoaded", () => {
    const btnToggle = document.getElementById("btn-toggle-menu");
    const sidebar = document.querySelector(".sidebar");

    btnToggle.addEventListener("click", () => {
        sidebar.classList.toggle("plegado");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll(".toggle-submenu");

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // evita que el click active el enlace padre
            const parent = btn.closest(".has-submenu");
            parent.classList.toggle("active");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Cargar el JSON de servicios
    fetch("../../../assets/data/usuarios.json")
        .then(res => res.json())
        .then(data => {
            // Generar filas HTML dinámicamente
            const tbody = document.getElementById("tabla-servicios");
            tbody.innerHTML = data.map(usuario => `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefono}</td>
                    <td>${usuario.ubicacion}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-action btn-edit" title="Editar usuario">
                                <i class="bi bi-pencil-square"></i>
                            </button>
                            <button class="btn-action btn-delete" title="Eliminar usuario">
                                <i class="bi bi-trash3"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join("");

            // Inicializar DataTable solo después de tener las filas cargadas
            new DataTable('#tabla-1', {
                responsive: true,
                pageLength: 10,
                lengthMenu: [5, 10, 25, 50],
                layout: {
                    topStart: {
                        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
                    }
                },
                language: {
                    search: "",                 // Oculta el texto "Buscar:"
                    searchPlaceholder: "Buscar", // Agrega placeholder
                    lengthMenu: "Mostrar _MENU_ registros",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                    infoEmpty: "Mostrando 0 a 0 de 0 registros",
                    infoFiltered: "(filtrado de _MAX_ registros totales)",
                    zeroRecords: "No se encontraron resultados",
                    paginate: {
                        first: "<<",
                        previous: "‹",
                        next: "›",
                        last: ">>"
                    },
                    buttons: {
                        copy: "Copiar",
                        csv: "Exportar CSV",
                        excel: "Exportar Excel",
                        pdf: "Exportar PDF",
                        print: "Imprimir"
                    }
                },
                initComplete: function () {
                    // Al terminar la inicialización, personalizamos el buscador
                    const dtSearch = document.querySelector('.dt-search');
                    if (!dtSearch) return;

                    const input = dtSearch.querySelector('input[type="search"]');
                    if (!input) return;

                    // Crear contenedor buscador con ícono
                    const buscadorDiv = document.createElement('div');
                    buscadorDiv.className = 'buscador';
                    buscadorDiv.innerHTML = `<i class="bi bi-search"></i>`;
                    buscadorDiv.appendChild(input);

                    // Limpiar contenido original y poner el nuevo buscador
                    dtSearch.innerHTML = '';
                    dtSearch.appendChild(buscadorDiv);

                    // Ajustar atributos del input para que quede limpio y usable
                    input.setAttribute('placeholder', 'Buscar');
                    input.style.width = "100%";
                    input.style.border = "none";
                    input.style.background = "transparent";
                    input.style.outline = "none";
                }
            });

        })
        .catch(err => console.error("Error al cargar el JSON:", err));
});


