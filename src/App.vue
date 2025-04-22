<script setup>
/* ===============================
   IMPORTS
=============================== */
import { ref, onMounted, provide, computed } from 'vue'
import { useRouter } from "vue-router"
import axios from 'axios'
import WhatsAppWidget from "@/components/WhatsAppWidget.vue"


import TopHeader from './components/TopHeader.vue'
import RedesComp from './components/RedesComp.vue'
import FooterInteractivo from "./components/footer.vue"
import MenuMobile from './components/MenuMobile.vue'
import Up from './components/Up.vue'

/* ===============================
   VARIABLES REACTIVAS
=============================== */
const router = useRouter()
const mostrarModal = ref(false)
const toggleButton = ref(null)
const whatsappButtons = ref(null)
const arreglo_carrito = ref([])

const dominio = 'consmopcmayorista.com'
const id_empresa = '24'
const categorias_alea = ref([]) 
const categorias_alfabetica = ref([])
const cargando = ref(true)

// Variables para la lógica de búsqueda:
const categoria = ref("")
const busqueda = ref("")
const producto_buscado = ref([])

/* ===============================
   FUNCIONES DE CARRITO
=============================== */
function imprimir_carro_vacio(){
  let valores = `<ul class="shopping-cart-items">
                    <li class="clearfix">
                      <span class="item-quantity">No hay Productos en tu Carrito!</span>
                      <br/><br/><br/>
                    </li>
                 </ul>`;
  document.getElementById("total_ticket").innerHTML = 0;
  document.getElementById("total_ticket2").innerHTML = 0;
  document.getElementById("muestra").innerHTML = valores;
  document.getElementById("muestra2").innerHTML = valores;
}
function ocultarSugerencias() {
  // Esperamos un micro-tick para ver si el usuario clicó en un resultado
  // con un pequeño setTimeout
  setTimeout(() => {
    producto_buscado.value = []
  }, 200)
}
function imprimir_carrito(arreglo_car, total){
  let valores = '';
  let cantidad_valores = arreglo_car.productos.length;

  // Actualiza el número en el badge (pops2):
  document.querySelector('.pops2').innerHTML = cantidad_valores;

  valores += "<ul class='shopping-cart-items'>";
  arreglo_car.productos.forEach(datos => {
    const codigo1 = datos.id;
    const descripcion1 = `${datos.descripcion} (${codigo1})`;
    let precio1 = datos.precio;
    const cant1 = datos.cant;
    const foto1 = datos.foto;
    let subtotal1 = precio1 * cant1;

    valores += `
      <li class="clearfix">
        <img style="width:75px; height:60px" src='${foto1}' alt="" />
        <span class="item-name">${descripcion1.slice(0, 18)}</span>
        <span class="item-price">$ ${Math.round(parseFloat(precio1))
          .toString()
          .replace(/\./g, ',')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
        <span class="item-quantity">/ Cantidad: ${cant1}</span>
      </li>
    `;
  });
  valores += "</ul>";

  const total_monto = total;
  const formateado = Math.round(parseFloat(total_monto))
    .toString()
    .replace(/\./g, ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  document.getElementById("total_ticket").innerHTML = formateado;
  document.getElementById("total_ticket2").innerHTML = formateado;
  document.getElementById("muestra").innerHTML = valores;
  document.getElementById("muestra2").innerHTML = valores;
}

function mensaje_add_car(descripcion, id , operacion, cant){
  let valores = `<div class='alert alert-primary' role='alert'>
                   Se ha ${operacion} ${cant} ${descripcion} al carrito de compra
                 </div>`;
  document.getElementById("container_success").innerHTML = valores;

  setTimeout(() => {
    document.getElementById("container_success").innerHTML = "";
  }, 3000);
}


function cargar_arreglo_car() {
  if (localStorage.getItem("ticket") != null) {
    const carritoJSON = JSON.parse(localStorage.getItem('ticket'));  
    const total_pedido = carritoJSON.productos.reduce(
      (total, item) => total + parseInt(item.precio * item.cant),
      0
    );
    imprimir_carrito(carritoJSON, total_pedido);
  } else {
    imprimir_carro_vacio();
  }
}

// Prototipo para manejar productos
const prototipoCarrito = {
  productos: [],
  agregarProducto(producto) {
    if (!Array.isArray(this.productos)) {
      this.productos = [];
    }
    this.productos.push(producto);
  }
};

function cargar_carro(id, descripcion, precio, foto, operacion, tags, existencia) {
  let cant;
  if (operacion === 'Agregado_ppl') {
    // Ejemplo: si tienes un elemento con id="cantidades_producto"
    cant = Number(document.querySelector('#cantidades_producto')?.innerHTML) || 1;
    operacion = 'Agregado';
  } else if (operacion === 'Agregado') {
    cant = 1;
  } else {
    // Ejemplo: si es "Quitado"
    cant = -1;
  }

  let arreglo_car = JSON.parse(localStorage.getItem('ticket'));
  const carrito = Object.create(prototipoCarrito);

  if (!arreglo_car) {
    // Carrito vacío => creamos
    const producto = { id, descripcion, precio, foto, cant, tags, existencia };
    carrito.agregarProducto(producto);
  } else {
    const producto = { id, descripcion, precio, foto, cant, tags, existencia };
    let encontrado = false;
    let indice = -1;

    arreglo_car.productos.forEach((datos, index) => {
      if (datos.id === id) {
        encontrado = true;
        indice = index;
      }
    });

    if (encontrado) {
      arreglo_car.productos[indice].cant += parseInt(cant);
    } else {
      arreglo_car.productos.push(producto);
    }

    // Reconstruimos con prototipo
    arreglo_car.productos.forEach(datos => {
      carrito.agregarProducto(datos);
    });
  }
  // Guardar en localStorage
  localStorage.setItem('ticket', JSON.stringify(carrito));
  // Actualizar la vista
  cargar_arreglo_car();
  // Mostrar el mensaje
  mensaje_add_car(descripcion, id, operacion, cant);
}

/* ===============================
   OTRAS FUNCIONES (categorías, etc.)
=============================== */
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// Método para obtener categorías de la API
async function fetchProductos() {
  try {
    const response = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new_categoria.php?dominio=${dominio}&id=${id_empresa}`
    );
    categorias_alea.value = shuffleArray(response.data.categorias) || [];
    categorias_alfabetica.value = response.data.categorias.filter(
      dato => dato.cat_padre === 0
    );

    console.log(categorias_alea.value)
  } catch (error) {
    console.error('Error al obtener productos:', error);
  } finally {
    cargando.value = false;
  }
}


function removeDuplicatesById(list) {
  const seen = new Set()
  return list.filter(item => {
    // Si es el separador especial `{ separator: true }`, déjalo
    if (item.separator) return true

    // Si no tiene `id`, lo dejamos pasar 
    if (!item.id) return true

    if (seen.has(item.id)) {
      return false
    } else {
      seen.add(item.id)
      return true
    }
  })
}

async function filtrarProductos() {
  // Si la búsqueda es de 2 caracteres o menos, vacía y retorna
  if (busqueda.value.length <= 2) {
    producto_buscado.value = []
    return
  }

  try {
    cargando.value = true
    // Armar la URL con la búsqueda y el id_empresa
    const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${busqueda.value}&id=${id_empresa}`
    console.log("Consultando:", url)

    // Petición a la API
    const response = await axios.get(url)
    // Se asume que la API retorna { productos: [...] }
    const productos = response.data.productos || []
    console.log("Productos recibidos:", productos)

    // Convertir la búsqueda a minúsculas
    const busquedaMinus = busqueda.value.toLowerCase()
    // Separar las palabras de la búsqueda (ej: "casa nueva" => ["casa", "nueva"])
    const palabrasClave = busquedaMinus.split(" ").filter(Boolean)

    // Coincidencias EXACTAS: si en título o en idpro se incluye la frase completa
    const coincidenciasExactas = productos.filter(p => {
      const tituloLower = p.titulo ? p.titulo.toLowerCase() : ""
      const idproLower = p.idpro ? p.idpro.toLowerCase() : ""
      return (
        tituloLower.includes(busquedaMinus) ||
        idproLower.includes(busquedaMinus)
      )
    })

    // Coincidencias PARCIALES: cada palabra debe aparecer en alguno de los dos campos,
    // pero NO es coincidencia exacta de la frase completa
    const coincidenciasParciales = productos.filter(p => {
      const tituloLower = p.titulo ? p.titulo.toLowerCase() : ""
      const idproLower = p.idpro ? p.idpro.toLowerCase() : ""
      // Cada palabra debe aparecer en titulo o en idpro
      const todasAparecen = palabrasClave.every(pal =>
        tituloLower.includes(pal) || idproLower.includes(pal)
      )
      // Se excluyen los que ya están en exactas
      return todasAparecen && !coincidenciasExactas.includes(p)
    })

    // Combinar resultados, insertando un separador si hay ambas coincidencias
    let combinado
    if (coincidenciasParciales.length > 0 && coincidenciasExactas.length > 0) {
      combinado = [
        ...coincidenciasExactas,
        { separator: true },
        ...coincidenciasParciales
      ]
    } else {
      combinado = [...coincidenciasExactas, ...coincidenciasParciales]
    }

    // Elimina duplicados por id (función que debes tener implementada)
    producto_buscado.value = removeDuplicatesById(combinado)

  } catch (error) {
    console.error("Error al obtener productos:", error)
  } finally {
    cargando.value = false
  }
}



// Redirigir a la lista de productos
function redirigirAListaDeProductos(termino) {
  router.push({ name: 'catalogo_cat', query: { categoria: categoria.value, busqueda: termino } });
}

// Computed de ejemplo para el badge
const cant_en_carrito = computed(() => {
  // Si no hay ticket guardado, es 0
  if (!arreglo_carrito.value?.productos) return 0;
  return arreglo_carrito.value.productos.reduce((sum, item) => sum + parseInt(item.cant), 0);
});

/* ===============================
   CICLO DE VIDA
=============================== */
onMounted(() => {
  // 1) Obtener categorías
  fetchProductos();

  // 2) Cargar carrito desde localStorage (si existe)
  const storedCart = localStorage.getItem('ticket');
  if (storedCart) {
    try {
      arreglo_carrito.value = JSON.parse(storedCart);
    } catch (error) {
      console.error('Error al parsear los datos del carrito:', error);
      arreglo_carrito.value = [];
    }
  }

  // 3) Imprimir o vaciar carrito en DOM
  cargar_arreglo_car();

  // 4) Opcional: Lógica de botones whatsapp
  toggleButton.value = document.getElementById('toggle-whatsapp-btn');
  whatsappButtons.value = document.getElementById('whatsapp-buttons');
  if (toggleButton.value && whatsappButtons.value) {
    toggleButton.value.addEventListener('click', function() {
      if (
        whatsappButtons.value.style.display === 'none' ||
        whatsappButtons.value.style.display === ''
      ) {
        whatsappButtons.value.style.display = 'block';
      } else {
        whatsappButtons.value.style.display = 'none';
      }
    });
  }
});

// Proveer variables si las necesitas en componentes hijos
provide('categorias_alea', categorias_alea);
provide('categorias_alfabetica', categorias_alfabetica);
</script>

<template>
  <TopHeader />
  <div class="spacer"></div> <!-- Espacio en blanco debajo del header -->
  <header>

    <div class="container">
      <div class="d-flex align-items-center justify-content-sm-between">
        <!-- logo  -->
        <div class="logo">
          <a href="/">
            <img loading="lazy8" src="/assets/images/120x24.png" alt="logo" />
          </a>
        </div>


        
  <!-- search wrapper  -->
  <div class="search_wrap d-none d-lg-block">
    <!-- search input box  -->
    <div class="search d-flex">
      <div class="search_category">
        <select v-model="categoria">
          <option disabled value="">Categorias</option>
          <option
            v-for="dato in categorias_alfabetica"
            :key="dato.categoria"
            :value="dato.categoria"
          >
            {{ dato.categoria }}
          </option>
        </select>
      </div>
      <div class="search_input">
        <input
          type="text"
          placeholder="Buscar"
          id="show_suggest"
          v-model="busqueda"
          @input="filtrarProductos"
          @keydown.enter="redirigirAListaDeProductos(busqueda)"
          autocomplete="off"
          @blur="ocultarSugerencias"
        />
      </div>
      <div class="search_subimt">
        <RouterLink
          :to="{
            name: 'catalogo_cat',
            query: { categoria: categoria, busqueda: busqueda }
          }"
          @click="ocultarSugerencias"
        >
          <button>
            <span class="icon">
              <span class="d-none d-sm-inline-block">Buscar</span>
              <i class="las la-search"></i>
            </span>
          </button>
        </RouterLink>
      </div>

      <!-- search suggest -->
      <div :class="['search_suggest', { active: producto_buscado.length > 0 }]">
        <div class="search_result_product scrollable">
          <template v-for="(dato, index) in producto_buscado" :key="index">
            <div
              v-if="dato.separator"
              class="separator"
              style="font-weight: bold; color: #aaa; text-align: center; margin: 5px 0;"
            ></div>

            <!-- Si es un producto normal -->
            <RouterLink
              v-else
              :to="{ name: 'producto', query: { producto: dato.id } }"
              class="single_sresult_product"
              @click="ocultarSugerencias"
            >
              <div class="sresult_img">
                <img :src="dato.imagen">
              </div>
              <div class="sresult_content">
                <h4>{{ dato.titulo }}</h4>
                <div class="price">
                  <span class="org_price">
                    ${{ Math.round(parseFloat(dato.pt1)).toLocaleString() }}
                  </span>
                </div>
              </div>
            </RouterLink>
          </template>
        </div>
      </div>
      <!-- FIN search_suggest -->
    </div> <!-- FIN .search.d-flex -->
        </div> 
                        <!-- button para pagos con addi -->
                        <!--
                        <div class="cart_sum_pros1">
                            <button onclick="javascript:window.location.href='">CREDITO CON ADDI</button>
                        </div> 
                        -->
                         

                   <!-- shop cart wrapper  -->
                   <div class="shopcart">
                        <a href="carrito" class="icon_wrp text-center d-none d-lg-block">
                            <span class="icon">
                                <i class="icon-cart"></i>
                            </span>
                            <span class="icon_text">Carrito</span>
                            <span class="pops2">{{cant_en_carrito}}</span>
                        </a>
                        <div class="shopcart_dropdown">
                            <div class="cart_droptitle">
                                <h4 class="text_lg">{{cant_en_carrito}} Productos</h4>
                            </div>
                            <div class="cartsdrop_wrap" if="lista_productos">
                                
                                  <div class="muestra" id="muestra"></div>      
                              
                   
                            </div>
                            <div class="total_cartdrop">
                                <h4 class="text_lg text-uppercase mb-0">Sub Total:</h4>
                                <h4 class="text_lg mb-0 ms-2" id="total_ticket"></h4>
                            </div>
                           <!-- mobile cart button  -->
                            <div class="cartdrop_footer d-flex mt-3">
                                <a href="carrito" class="default_btn w-50 text_xs px-1">Ver Carro</a>
                                 <a href="confirmacion" class="default_btn second ms-3 w-50 text_xs px-1">Pagar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

              <!-- Botón de carrito para versión móvil -->
  <div class="mobile-cart-icon d-lg-none" @click="mostrarModal = true">
    <span class="icon">
      <i class="icon-cart"></i>
    </span>
    <span class="pops2">{{cant_en_carrito}}</span>
  </div>

  <!-- Actualiza el evento de clic para redirigir a /carrito -->
<div class="mobile-cart-icon d-lg-none" @click="router.push('/carrito')">
  <span class="icon">
    <i class="icon-cart"></i>
  </span>
  <span class="pops2">{{cant_en_carrito}}</span>
</div>


    <!-- navbar -->
    <nav class="d-none d-lg-block">
      <div class="container">
        <div class="d-flex">
          <div class="all_category">
            <div class="bars text-white d-flex align-items-center justify-content-center">
              <span class="icon"><i class="las la-bars"></i></span>
              <span class="icon_text">Categorias</span>
            </div>
            <!-- sub categories wrapper  -->
            <div class="sub_categories_wrp">
              <div class="sub_categories scrollable-categories">
                <h5 class="d-block position-relative d-lg-none subcats_title">
                  Categorias
                </h5>

                <RouterLink
                  v-for="(dato, index) in categorias_alfabetica"
                  :key="index"
                  :to="{ name: 'catalogo_cat', query: { categoria: dato.categoria } }"
                  class="singlecats"
                >
                  <span class="txt">{{ dato.categoria }}</span>
                </RouterLink>   
              </div>
            </div>
          </div>

          <ul class="nav_bar d-flex list-unstyled mb-0">
            <!-- with sub menu  -->
            <li class="withsubs">
              <RouterLink to="/">Inicio</RouterLink>
            </li>
            <!-- with sub menu  -->
            <li class="withsubs">
              <RouterLink to="/catalogo">Catalogo</RouterLink>
            </li>
            <!-- with sub menu  -->
            <li class="withsubs dropdown">
              <RouterLink to="#" class="dropdown-toggle">
                Nosotros <span></span>
              </RouterLink>
              <div class="dropdown-content">
                <RouterLink to="/conocenos">Conócenos</RouterLink>
                <RouterLink to="/encuentranos">Encuéntranos</RouterLink>
              </div>
            </li>
            <li class="withsubs">
              <RouterLink to="/calificanos">Califícanos</RouterLink>
            </li>
            <li class="withsubs">
              <RouterLink to="/promociones">Promociones</RouterLink>
            </li>
            <li class="withsubs">
              <RouterLink to="/foro">Foro</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>


   

   
    <!--  mobile cart -->
    <div class="mobile_menwrap d-lg-none" id="mobileCart">
      <div class="mobile_cart_wrap d-flex flex-column">
        <h5 class="mobile_title">
          Carrito
          <span class="sidebarclose" id="mobileCartClose">
            <i class="las la-times"></i>
          </span>
        </h5>
        <div class="px-3 py-3 flex-grow-1 d-flex flex-column">
          <div class="cart_droptitle">
            <h4 class="text_lg">Total {{ cant_en_carrito }} Productos</h4>
          </div>
          <div class="cartsdrop_wrap">
            <div class="muestra" id="muestra2"></div>
          </div>
          <div class="mt-auto">
            <div class="total_cartdrop">
              <h4 class="text_lg text-uppercase mb-0">Sub Total:</h4>
              <h4 class="text_lg mb-0 ms-2" id="total_ticket2"></h4>
            </div>
            <!-- mobile cart button  -->
            <div class="cartdrop_footer mt-3 d-flex">
              <a href="/carrito" class="default_btn w-50 text_xs px-1">Ver Carro</a>
              <a href="confirmacion" class="default_btn second ms-3 w-50 text_xs px-1"
                >Pagar</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <Up />
 <MenuMobile />
 


  </header>

  <!-- Vista principal -->
  <RouterView :key="$route.fullPath" />

  <!-- Botón de WhatsApp -->
  <WhatsAppWidget phoneNumber="573015537673" />

  <RedesComp />

  <!-- footer area -->
  <FooterInteractivo />
</template>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}



.search_suggest {
  position: absolute;
  left: 0;
  top: 56px;
  width: 100%;
  background-color: #fff;
  z-index: 9;
  border-radius: 0 0 3px 3px;
  opacity: 0;
  visibility: hidden;
  margin-top: 10px;
}

.search_suggest.active {
  transition: .3s;
  opacity: 1;
  visibility: visible;
  margin-top: 0;
}


/* 🎨 Estilos del botón de WhatsApp */
.whatsapp-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: #25D366;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
  position: relative;
}

.whatsapp-link:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

/* 📱 En celulares, ajustar el tamaño */
@media (max-width: 768px) {
  .whatsapp-button {
    bottom: 15px;
    right: 5px;
  }

  .whatsapp-link {
    width: 55px;
    height: 55px;
    font-size: 30px;
  }
}

/* ✨ Efecto de pulso */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}


.scrollable-categories {
  max-height: 400px; /* Ajusta esta altura según tus necesidades */
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.scrollable-categories::-webkit-scrollbar {
  width: 6px;
}

.scrollable-categories::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.scrollable-categories::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.scrollable-categories::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Asegúrate de que el contenedor padre tenga una posición relativa */
.sub_categories_wrp {
  position: relative;
}


/* Estilo del ícono de carrito para versión móvil */
.mobile-cart-icon {
  position: fixed;
  top: 35px;
  right: 1px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  cursor: pointer;
}

.mobile-cart-icon .icon {
  font-size: 24px;
  color: #333;
}

.mobile-cart-icon .pops2 {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

/* Estilo del modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.modal-header, .modal-footer {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header .close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 15px;
}

.modal-footer {
  border-top: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.spacer {
  height: 50px; /* Ajusta según la altura de tu header */
}

/* Default style for nav links */
.withsubs a {
  display: block;
  color: #e1e1e1;
  text-transform: capitalize;
  margin: 0 10px;
  padding: 15px 10px;
}

/* Style for the dropdown */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-arrow {
  margin-left: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
.search_suggest .search_result_product.scrollable {
  max-height: 300px; /* Ajusta esta altura según tus necesidades */
  overflow-y: auto;
}
</style>