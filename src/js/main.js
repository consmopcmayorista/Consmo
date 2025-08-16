// ==================== MAIN.JS (integrado con existencia2) ====================

// --- UI y navegación (TU CÓDIGO ORIGINAL, sin cambios funcionales) ---
$(window).on('load', function() {
  cargar_arreglo_car();
  $('#js-preloader').addClass('loaded');

  const btnDepartamentos = document.getElementById('btn-departamentos'),
        btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
        contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav'),
        esDispositivoMovil = () => window.innerWidth <= 800;

  if (btnDepartamentos){
    btnDepartamentos.addEventListener('mouseover', () => {
      if(!esDispositivoMovil()){
        grid.classList.add('activo');
      }
    });
  }

  grid.addEventListener('mouseleave', () => {
    if(!esDispositivoMovil()){
      grid.classList.remove('activo');
    }
  });

  document.querySelector('#menu .contenedor-botones-menu .btn-menu-cerrar').addEventListener('click', (e) => {
    e.preventDefault();
    grid.classList.remove('activo');
    btnCerrarMenu.classList.remove('activo');
  });

  document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
    elemento.addEventListener('mouseenter', (e) => {
      if(!esDispositivoMovil()){
        document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
          categoria.classList.remove('activo');
          if(categoria.dataset.categoria == e.target.dataset.categoria){
            categoria.classList.add('activo');
          }
        });
      };
    });
  });

  // EventListeners para dispositivo móvil.
  document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
    e.preventDefault();
    if(contenedorEnlacesNav.classList.contains('activo')){
      contenedorEnlacesNav.classList.remove('activo');
      document.querySelector('body').style.overflow = 'visible';
    } else {
      contenedorEnlacesNav.classList.add('activo');
      document.querySelector('body').style.overflow = 'hidden';
    }
  });

  // Click en botón de todos los departamentos (móvil).
  btnDepartamentos.addEventListener('click', (e) => {
    e.preventDefault();
    grid.classList.add('activo');
    btnCerrarMenu.classList.add('activo');
  });

  // Botón de regresar en el menú de categorías
  document.querySelector('#btn-regresar').addEventListener('click', (e) => {
    e.preventDefault();
    grid.classList.remove('activo');
    btnCerrarMenu.classList.remove('activo');
  });

  document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
    elemento.addEventListener('click', (e) => {
      if(esDispositivoMovil()){
        document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
          categoria.classList.remove('activo');
          if(categoria.dataset.categoria == e.target.dataset.categoria){
            categoria.classList.add('activo');
          }
        });
      }
    });
  });

  // Botón de regresar en el menú de categorías
  document.querySelectorAll('#btn-regresar').forEach((boton) => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      //contenedorSubCategorias.classList.remove('activo');
    });
  });

  btnCerrarMenu.addEventListener('click', (e)=> {
    e.preventDefault();
    document.querySelectorAll('#menu .activo').forEach((elemento) => {
      elemento.classList.remove('activo');
    });
    document.querySelector('body').style.overflow = 'visible';
  });
});
//fin del load window

(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($('#spinner').length > 0) {
        $('#spinner').removeClass('show');
      }
    }, 1);
  };
  spinner();

  // WOW
  new WOW().init();

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 45) {
        $('.fixed-top').addClass('bg-white shadow');
      } else {
        $('.fixed-top').removeClass('bg-white shadow');
      }
    } else {
      if ($(this).scrollTop() > 45) {
        $('.fixed-top').addClass('bg-white shadow').css('top', -45);
      } else {
        $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
      }
    }
  });

  // Back to top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
    return false;
  });

  // Carrusel
  $(".project-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText : [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>'
    ],
    responsive: {
      0:{ items:1 },
      576:{ items:1 },
      768:{ items:2 },
      992:{ items:3 }
    }
  });
})(jQuery);

// ==================== Carrito base (TU PROTOTIPO) ====================
const prototipoCarrito = {
  agregarProducto: function(producto){
    if(!this.productos){
      this.productos = [producto]
    } else {
      this.productos.push(producto);
    }
  },
  obtenerPrecioTotal: function(){
    return this.productos.reduce((total, p) => total + p.precio, 0);
  }
};

// ====================================================================
// ===================== HELPERS (NUEVO) ===============================
// ====================================================================

/**
 * Suma cantidades desde un string "Sede:2,Otra:1" -> 3.
 * Si no hay números ("Sede,Otra"), retorna 0 (comportamiento seguro).
 */
function sumarExistencia2(str) {
  if (!str || typeof str !== 'string') return 0;
  return str.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .reduce((acc, tok) => {
      const n = parseInt((tok.split(':')[1] || ''), 10);
      return acc + (Number.isFinite(n) ? n : 0);
    }, 0);
}

/** Extrae entero de cualquier string ("1.234", "x2") -> 1234 / 2 */
function leerEntero(valor) {
  return parseInt(String(valor || '').replace(/\D+/g, ''), 10) || 0;
}

/** La API nueva trae 'id' e 'idpro'. Usamos el que coincida con item.id del carrito. */
function pickId(prod) {
  return prod.idpro ?? prod.id ?? null;
}

/** Selecciona precio de la API: por defecto pt1 (ajusta si usas otra lista). */
function pickPrecio(prod) {
  const cand = [prod.pt1, prod.pt2, prod.pt3, prod.pt4, prod.pt5, prod.pt6];
  const primero = cand.find(v => v != null);
  return Number(primero) || 0;
}

// ====================================================================
// =================== LÓGICA DEL CARRITO (AJUSTADO) ==================
// ====================================================================

function agregar_producto_car(){
  // (A) Cantidad solicitada por el usuario
  const qtyEl = document.getElementById('cantidades_producto');
  const cantSolicitada = leerEntero(qtyEl?.innerHTML || qtyEl?.innerText || '1');

  // (B) Intentamos leer existencia2 cruda desde el DOM (si la tienes como input oculto)
  //    Opciones soportadas: <input id="existencia2" value="Sede:2,Otra:1">
  //                         o data-existencia2 en #item_producto
  let existencia2Raw = document.getElementById('existencia2')?.value || '';
  if (!existencia2Raw) {
    const itemEl = document.getElementById('item_producto');
    existencia2Raw = itemEl?.dataset?.existencia2 || '';
  }

  // (C) Calcular stock total desde existencia2. Si no hay, usamos fallback.
  let stockTotal = sumarExistencia2(existencia2Raw);

  // Fallback #1: Si ya agregaste este producto y luego corriste actualizar_precios2(),
  //              el carrito puede tener la existencia calculada y la preferimos.
  const idTemporal = document.getElementById('item_producto')?.value;
  const ticketTmp = JSON.parse(localStorage.getItem('ticket') || '{"productos": []}');
  const enCarrito = ticketTmp.productos?.find(p => String(p.id) === String(idTemporal));
  if (enCarrito && Number.isFinite(enCarrito.existencia) && enCarrito.existencia > 0) {
    stockTotal = enCarrito.existencia;
  }

  // Fallback #2: último recurso, el stock_disponible del DOM (compatibilidad con tu flujo viejo)
  if (!stockTotal) {
    stockTotal = Number(document.getElementById('stock_disponible')?.value || 0);
  }

  // (D) Validaciones UX
  if (cantSolicitada < 1) {
    alert('Indica una cantidad válida (mínimo 1).');
    return;
  }
  if (stockTotal <= 0) {
    alert('⚠️ Sin inventario disponible.');
    return;
  }
  if (cantSolicitada > stockTotal) {
    alert(`⚠️ Solo hay ${stockTotal} unidad(es) disponible(s). Ajustamos tu solicitud.`);
    qtyEl.innerHTML = String(stockTotal);
  }

  // (E) Datos del producto (como tu flujo original)
  const id       = document.getElementById('item_producto').value;
  const detalle  = document.getElementById('detalle').value;
  const precio   = document.getElementById('precio').value;
  const foto     = document.getElementById('foto').value;
  const tags     = document.getElementById('tags').value;

  // (F) Cargar al carrito, pasando como "existencia" el total desde existencia2 (o fallback)
  cargar_carro(id, detalle, precio, foto, "Agregado_ppl", tags, stockTotal);

  // Limpieza visual
  document.getElementById('cantidades_producto').innerHTML = '1';
  $('#myModal3').modal('hide');
}

function mod_cantidades(cant1, cant2){
  let maximo = false;
  if(parseInt(cant1)>parseInt(cant2)){
    document.getElementById("cantidades_producto").value = cant2;
    alert('La cantidad solicitada de este Producto, es superior a la cantidad  disponible de mismo. Se modificó su solicitud, a la cantidad disponible');
    maximo=true;
  }
  return maximo;
}

function imprimir_carro_vacio(){
  let valores=`<ul classs=hopping-cart-items">
    <li class="clearfix">
      <span class="item-quantity">No hay Productos en tu Carrito!</span>
      <br/><br/><br/>
    </li>
  </ul>`;
  document.getElementById("total_ticket").innerHTML=0;
  document.getElementById("muestra").innerHTML=valores;
}

function imprimir_carrito(arreglo_car, total){
  var valores='';
  var cantidad_valores= arreglo_car.productos.length;

  valores+="<ul class='shopping-cart-items'>";
  arreglo_car.productos.forEach((datos)=>{
    var codigo1 = datos.id;
    var descripcion1 = datos.descripcion+ " ("+codigo1+")";
    var precio1 = datos.precio;
    var cant1 = datos.cant;
    var foto1 = datos.foto;
    var subtotal1=precio1*cant1;

    precio1=new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 3 }).format(datos.precio);
    subtotal1=new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 3 }).format(subtotal1);

    valores+= `
      <li class="clearfix">
        <img src='${foto1}' alt="" />
        <span class="item-name">${descripcion1}</span>
        <span class="item-price">$ ${precio1}</span>
        <span class="item-quantity">/ Cantidad: ${cant1}</span>
      </li>
    `;
  });
  total_monto=new Intl.NumberFormat().format(total);
  valores+="</ul>";

  document.getElementById("total_ticket").innerHTML=total_monto;
  document.getElementById("muestra").innerHTML=valores;
}

function mensaje_add_car(descripcion, id , operacion, cant){
  let valores ="";
  valores +="<div class='alert alert-primary' role='alert'>Se ha "+operacion+" "+cant+" "+descripcion+" al carrito de compra </div>";
  document.getElementById("container_success").innerHTML=valores;
  setTimeout(function(){ document.getElementById("container_success").innerHTML=""; }, 3000);
}

function cargar_arreglo_car() {
  //const  arreglo_cliente=JSON.parse(localStorage.getItem('cliente'));
  const  arreglo_usuario=JSON.parse(localStorage.getItem('usuario'));
  if (localStorage.getItem("ticket") != null) {
    const  arreglo_car=JSON.parse(localStorage.getItem('ticket'));
    const total_pedido =arreglo_car.productos.reduce((total, item)=>total + parseInt(item.precio * item.cant), 0);
    imprimir_carrito(arreglo_car,  total_pedido);
  } else {
    imprimir_carro_vacio();
  }
}

/**
 * Agrega/actualiza producto en el carrito.
 * 👇 CAMBIO IMPORTANTE: ahora respetamos el tope 'existencia' (que viene de existencia2 o fallback).
 */
function cargar_carro(id, descripcion, precio, foto, operacion, tags, existencia) {
  // Normalizar entradas
  precio = parseFloat(parseFloat(precio || 0).toFixed(2));
  // 'tags' debe ser texto (antes lo forzabas a number y podía romper si no lo era)
  tags = String(tags ?? '');

  // Determinar cantidad a aplicar según operación
  let cant;
  if (operacion=='Agregado_ppl') {
    cant = Number($('#cantidades_producto').html());
    operacion="Agregado ";
  } else if (operacion=='Agregado') {
    cant = 1;
  } else {
    cant = -1;
  }

  const arreglo_car=JSON.parse(localStorage.getItem('ticket'));
  const carrito = Object.create(prototipoCarrito);
  const existenciaTope = Number(existencia) || 0;

  if (!arreglo_car) {
    // Carrito vacío: creamos primer producto respetando el tope
    const producto={
      id, descripcion, precio, foto,
      cant: Math.max(0, Math.min(cant, existenciaTope)),
      tags,
      existencia: existenciaTope        // guardamos el tope para controles posteriores (botones +/-)
    };
    carrito.agregarProducto(producto);
  } else {
    // Carrito con items
    let cantidadActual=0, indice, encontrado=false;
    arreglo_car.productos.forEach((datos, index)=>{
      if (String(datos.id)===String(id)) {
        cantidadActual= Number(datos.cant) || 0;
        indice=index;
        encontrado=true;
      }
    });

    if (encontrado) {
      // Sumamos y capamos por existencia
      const nueva = Math.max(0, Math.min(cantidadActual + cant, existenciaTope || (arreglo_car.productos[indice].existencia || Infinity)));
      arreglo_car.productos[indice].cant = nueva;

      // Actualizamos existencia por si vino un valor más reciente
      if (existenciaTope) {
        arreglo_car.productos[indice].existencia = existenciaTope;
      }
      // Actualizamos precio/tags por si cambiaron
      arreglo_car.productos[indice].precio = precio;
      arreglo_car.productos[indice].tags = tags;
    } else {
      // Nuevo item: respetar tope
      const producto={
        id, descripcion, precio, foto,
        cant: Math.max(0, Math.min(cant, existenciaTope || cant)), // si no hay tope, deja pasar
        tags,
        existencia: existenciaTope
      };
      arreglo_car.productos.push(producto);
    }

    // Rehidratar al prototipo
    arreglo_car.productos.forEach((datos)=> carrito.agregarProducto(datos));
  }

  localStorage.setItem('ticket', JSON.stringify(carrito));
  cargar_arreglo_car();
  mensaje_add_car(descripcion, id , operacion, cant);
}

function cargar_me_gusta( id, descripcion, precio,  foto, operacion, tags, existencia) {
  let cant;
  if (operacion=='Agregado_ppl') {
    cant = 1; operacion="Agregado ";
  } else if (operacion=='Agregado') {
    cant =1;
  } else {
    cant =-1;
  }

  const arreglo_car=JSON.parse(localStorage.getItem('me_gusta'));
  const me_gusta = Object.create(prototipomegusta);
  const producto={ id, descripcion, precio, foto, cant, tags };

  if (!arreglo_car) {
    me_gusta.agregar_me_gusta(producto);
  } else {
    let cantidad=0, indice, encontrado=false;
    arreglo_car.productos.forEach((datos, index)=>{
      if (datos.id==id) {
        cantidad= datos.cant;
        indice=index;
        encontrado=true;
      }
    });

    if (encontrado) {
      arreglo_car.productos[indice].cant=parseInt(cant) + parseInt(cantidad);
    } else {
      arreglo_car.productos.push(producto);
    }

    arreglo_car.productos.forEach((datos)=> me_gusta.agregar_me_gusta(datos));
  }

  console.log(arreglo_car);
  localStorage.setItem('ticket', JSON.stringify('me_gusta'));
}

function imprimir_carrito_checkout(arreglo_car, total){
  var valores='';
  var cant_productos = 0;

  arreglo_car.productos.forEach((datos)=>{
    var descripcion1 = datos.descripcion;
    var precio1 = datos.precio;
    var cant1 = datos.cant;
    var foto1 = datos.foto;
    var subtotal1=precio1*cant1;
    precio1=new Intl.NumberFormat().format(datos.precio);
    subtotal1=new Intl.NumberFormat().format(subtotal1);

    valores+=`<div class="single_shop_cart d-flex align-items-center flex-wrap">
      <div class="cart_img mb-4 mb-md-0">
        <img loading="lazy" src='${foto1}'  alt="product">
      </div>
      <div class="cart_cont">
        <a href="product-view.html">
          <h5>${descripcion1}</h5>
        </a>
        <p class="price">${precio1}</p>
      </div>
      <div class="cart_qnty d-flex align-items-center ms-md-auto">
        <div class="cart_qnty_btn"><i class="las la-minus"></i></div>
        <div class="cart_count">${cant1}</div>
        <div class="cart_qnty_btn"><i class="las la-plus"></i></div>
      </div>
      <div class="cart_price ms-auto"><p>${subtotal1}</p></div>
      <div class="cart_remove ms-auto"><i class="icon-trash"></i></div>
    </div>`;
    cant_productos++;
  });

  total_monto=new Intl.NumberFormat().format(total);
  document.getElementById("lista_productos").innerHTML=valores;
  document.getElementById("casilla_monto").innerHTML="$"+total_monto;
  document.getElementById("monto_total").innerHTML="$"+total_monto;
}

// ====================================================================
// === ACTUALIZA PRECIOS + EXISTENCIA2 desde la API nueva (NUEVO) =====
// ====================================================================

/**
 * Llama a la API:
 *   https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=consmopcmayorista.com&id=24
 * y para cada producto del carrito:
 *  - actualiza item.precio (pt1 por defecto)
 *  - calcula el total desde item.existencia2_raw y lo guarda en item.existencia
 *  - respeta cantidades ya agregadas, pero deja listo el tope para controles (+/-)
 */
async function actualizar_precios2(){
  const raw = localStorage.getItem('ticket');
  if (!raw) { console.warn('[API] No hay ticket.'); return; }
  const carrito = JSON.parse(raw);
  if (!carrito?.productos?.length) { console.warn('[API] Ticket sin productos.'); return; }

  const URL = 'https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php';
  const PARAMS = { dominio: 'consmopcmayorista.com', id: 24 };

  try {
    const response = await axios.get(URL, { params: PARAMS, timeout: 10000, validateStatus: () => true });

    if (response.status !== 200 || typeof response.data !== 'object') {
      console.warn('[API] Respuesta no OK o no JSON:', response.status, response.statusText);
      return;
    }

    // La API devuelve array con campos: id, idpro, existencia2, pt1..pt6, iva, ...
    const productosApi = Array.isArray(response.data)
      ? response.data
      : (response.data.productos || response.data.items || response.data.data || []);

    if (!Array.isArray(productosApi) || productosApi.length === 0) {
      console.warn('[API] No se detectó arreglo de productos.');
      return;
    }

    // Indexar por id/idpro
    const mapa = new Map();
    for (const p of productosApi) {
      const pid = pickId(p);
      if (pid != null) mapa.set(String(pid), p);
    }

    // Actualizar cada item
    carrito.productos.forEach(item => {
      const p = mapa.get(String(item.id));
      if (!p) return;

      // Precio desde pt1..pt6
      item.precio = pickPrecio(p);

      // Existencias por sede -> total
      const rawEx2 = p.existencia2 || '';       // ej. "Suramericana:2,Minorista:1"
      const total  = sumarExistencia2(rawEx2);  // ej. 3
      item.existencia2_raw = rawEx2;
      item.existencia      = Number.isFinite(total) ? total : 0;

      // (Opcional) si la cantidad en carrito supera el nuevo tope, la recortamos
      if (item.existencia && item.cant > item.existencia) {
        item.cant = item.existencia;
      }
    });

    localStorage.setItem('ticket', JSON.stringify(carrito));

    // Diagnóstico
    console.table(carrito.productos.map(p => ({
      id: p.id, cant: p.cant, precio: p.precio, existencia: p.existencia, existencia2_raw: p.existencia2_raw
    })));

    // Recalcular y repintar si estás en checkout
    const total_pedido = carrito.productos.reduce((t, it) => t + parseInt(it.precio * it.cant), 0);
    imprimir_carrito_checkout(carrito, total_pedido);

  } catch (error) {
    console.error('[API] Error llamando endpoint:', error?.message || error);
  }
}

// ==================== FIN MAIN.JS ====================
