


function togglePagination() {
  const paginationWrapper = document.querySelector(".pagination_wrp");
  const toggleButton = document.querySelector(".toggle_button");

  // Alternar entre mostrar más o menos
  if (paginationWrapper.classList.contains("collapsed")) {
    paginationWrapper.classList.remove("collapsed");
    paginationWrapper.classList.add("expanded");
    toggleButton.textContent = "Ver menos";
  } else {
    paginationWrapper.classList.remove("expanded");
    paginationWrapper.classList.add("collapsed");
    toggleButton.textContent = "Ver más";
  }
};

const carruselInner = document.querySelector('.carrusel-inner');
const marcaWidth = document.querySelector('.marca').offsetWidth;
const marcaCount = document.querySelectorAll('.marca').length;

// Calcula el ancho total del carrusel
const carruselWidth = marcaWidth * marcaCount + (marcaCount - 1) * 20;

// Agrega un evento de animación para reiniciar el carrusel
carruselInner.addEventListener('animationend', () => {
  carruselInner.style.transform = 'translateX(0)';
});

// Agregar al final del archivo

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
  // Crear el elemento de notificación
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos para la notificación
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.padding = '15px';
  notification.style.borderRadius = '5px';
  notification.style.zIndex = '1000';
  notification.style.opacity = '0';
  notification.style.transition = 'opacity 0.3s ease-in-out';

  // Establecer color según el tipo
  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50';
    notification.style.color = 'white';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#f44336';
    notification.style.color = 'white';
  }

  // Agregar la notificación al body
  document.body.appendChild(notification);

  // Mostrar la notificación
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);

  // Ocultar y remover la notificación después de 3 segundos
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Ejemplo de uso:
// showNotification('Producto agregado al carrito', 'success');
// showNotification('Error al agregar el producto', 'error');
;
function agregarAlCarritoConAnimacion(button) {
  // Llamar a las funciones existentes
  agregar_producto_car();
  showNotification('Producto añadido al carrito');
  
  // Añadir la animación
  button.classList.add('pop-animation');
  setTimeout(() => {
      button.classList.remove('pop-animation');
  }, 300);
};

function agregarAlCarritoConAnimacion(button) {
  // Llamar a las funciones existentes
  agregar_producto_car();
  showNotification('Producto añadido al carrito');
  
  // Añadir la animación
  button.classList.add('pop-animation');
  setTimeout(() => {
      button.classList.remove('pop-animation');
  }, 1000); // Aumentamos el tiempo a 1 segundo para que se vea toda la animación
}