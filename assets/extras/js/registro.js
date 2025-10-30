// === Variables ===
const form = document.getElementById('form-registro');
const carrusel = document.getElementById('carouselRegistro');
let usuarios = [];

// === Cargar usuarios.json si existe ===
document.addEventListener('DOMContentLoaded', () => {
  fetch('usuarios.json')
    .then(res => res.json())
    .then(data => {
      usuarios = data;
      console.log('Usuarios cargados:', usuarios);
    })
    .catch(() => {
      console.log('No se encontró usuarios.json, se creará al registrar.');
    });
});

// === Evento de registro ===
form.addEventListener('submit', e => {
  e.preventDefault();

  // Aquí sí tomamos los valores actualizados del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const ubicacion = document.getElementById('ubicacion').value.trim();
  const rol = document.getElementById('rol').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();
  const confirmar = document.getElementById('confirmar').value.trim();

  // Validaciones
  if (!nombre || !email || !telefono || !ubicacion || !rol || !contrasena || !confirmar) {
    alert('Por favor completa todos los campos.');
    return;
  }

  if (contrasena !== confirmar) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    nombre,
    email,
    telefono,
    ubicacion,
    rol,
    contrasena
  };

  usuarios.push(nuevoUsuario);

  // Guardar localmente
  guardarLocalmente(usuarios);

  // Mostrar confirmación
  alert('Usuario registrado con éxito');

  // Limpiar formulario
  form.reset();
});

// === Guardar usuarios en localStorage (simulación) ===
function guardarLocalmente(data) {
  localStorage.setItem('usuariosRegistrados', JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function() {
  var myCarousel = document.querySelector('#carouselRegistro');
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000,
    ride: 'carousel',
    pause: false,
    wrap: true
  });
});
