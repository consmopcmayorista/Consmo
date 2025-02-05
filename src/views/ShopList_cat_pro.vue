
<script setup>
/* ===============================
   IMPORTS
=============================== */
import { RouterLink, RouterView } from 'vue-router'
import services from '@/components/services.vue'
import ProductQuickview from '@/components/product_indv.vue'
import { ref, onMounted, inject, computed, defineProps } from 'vue'
import axios from 'axios'

// Configuración
const dominio = 'consmopcmayorista.com'
const id_empresa = '24'

// Variables reactivas
const productos_alea = ref([])           // Lista de productos (posiblemente filtrados)
const productos_totales = ref([]) 
const todas_las_categorias = ref([]) 

const categorias_hijo = ref([])// Lista completa de productos (sin filtrar)

const imagenCargada = ref(false)           // Control de carga de imagen
const filtro_activo = ref(null)            // Categoría actualmente filtrada
const selectedIndex = ref(null)            // Índice de la categoría seleccionada


// Props (por ejemplo, si la vista recibe una categoría desde la ruta)
const props = defineProps({
  categoria: String,
});



// Estado de carga
const cargando = ref(true)

// Variables de paginación
const pagina = ref(1)             // Página actual (1-based)
const cant_maxima_pag = ref(10)   // Cantidad de ítems por página

// Computada para calcular la cantidad total de páginas
const cant_pagina = computed(() => {
  return Math.ceil(productos_alea.value.length / cant_maxima_pag.value)
})

// Computada para obtener sólo los productos de la página actual
const productosPaginados = computed(() => {
  const start = (pagina.value - 1) * cant_maxima_pag.value
  const end = pagina.value * cant_maxima_pag.value
  return productos_alea.value.slice(start, end)
})

// Función para cambiar de página (y hacer scroll al inicio)
function paginar(nuevaPagina) {
  pagina.value = nuevaPagina
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Variables y funciones para el modal Quickview
const mostrarQuickview = ref(false)
const productoSeleccionado = ref(null)

function buscar_productos(id) {
  productoSeleccionado.value = id
  mostrarQuickview.value = true
  console.log('Abriendo modal, id=', id, 'mostrarQuickview=', mostrarQuickview.value)
}

function cerrarQuickview() {
  mostrarQuickview.value = false
}

// Función para cortar línea de texto (para títulos, etc.)
function formatLine(str, start, length) {
  if (!str) return ''
  return str.slice(start, start + length)
}

// Función para barajar el array (shuffle)
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// Carga de productos "recomendados" desde la API
async function fetchProductos() {
  try {
    const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`
    console.log("Consultando API:", url)
    const response = await axios.get(url)
    todas_las_categorias.value =response.data.categorias


console.log("Todas las categorías:", todas_las_categorias.value);

// Buscar la categoría padre por nombre
const categoria_padre = todas_las_categorias.value.filter(e => {
  return e.categoria?.trim().toLowerCase() === props.categoria?.trim().toLowerCase();
});
let idPadre =''
if (!categoria_padre.length) {
  console.warn("No se encontró una categoría padre con el nombre:", props.categoria);
} else {
  console.log("Categoría padre encontrada:", categoria_padre[0]);
  console.log("ID de la categoría padre (debería ser numérico):", categoria_padre[0].id);

  // Aseguramos que `idPadre` sea una cadena para la comparación
   idPadre = categoria_padre[0].id.toString();

  console.log("Filtrando categorías hijo...");

  // Iteramos todas las categorías para ver qué contiene `cat_padre`
  

  // Aplicamos el filtro asegurando que `cat_padre` sea tratado como string
  categorias_hijo.value = todas_las_categorias.value.filter(e => {
    const catPadreNormalizado = e.cat_padre?.toString(); // Normalizamos el dato
   
    return catPadreNormalizado === idPadre;
  });

  
}


 // Obtener las subcategorías de la categoría seleccionada
const lista_hijas = todas_las_categorias.value
  .filter(e => e.cat_padre?.toString() === idPadre.toString())
  .map(e => e.categoria);

console.log("Lista de subcategorías encontradas:", lista_hijas);

// Verificar que la API devuelve un array de productos
if (!response.data || !Array.isArray(response.data.productos)) {
  console.warn("La API no devolvió productos válidos:", response.data);
  productos_alea.value = [];
  return;
}

console.log("Productos obtenidos:", response.data.productos);

// Guardar el total de productos para futuros filtros
productos_totales.value = response.data.productos;

// Si hay una categoría en props, filtrar tanto por ella como por sus subcategorías
if (props.categoria) {
  console.log("Filtrando por categoría y sus subcategorías:", props.categoria, lista_hijas);

  productos_alea.value = response.data.productos.filter(producto => {
    return (
      producto.linea?.trim().toLowerCase() === props.categoria.trim().toLowerCase() ||
      lista_hijas.includes(producto.linea?.trim())
    );
  });
} else {
  productos_alea.value = response.data.productos;
}

console.log("Productos filtrados:", productos_alea.value);

    
  } catch (error) {
    console.error('Error al obtener productos:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  fetchProductos()
})

// Scripts de carrusel y otros (jQuery, Owl, Swiper, etc.)
$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  })

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    observer: true,
    observeParents: true
  })

  setInterval(() => {
    const paginationBullet = document.getElementById('button-next')
    if (paginationBullet) {
      paginationBullet.click()
      console.log('Clic simulado en el botón Next')
    } else {
      console.log('No se encontró el botón con id "button-next"')
    }
  }, 5000)
})

// Función para buscar productos por categoría
function buscar_categoria(categoria, nuevaPagina) {
  console.log('Filtrando por categoría:', categoria)

  // Filtrar los productos que pertenecen a la categoría seleccionada
  let productosFiltrados = productos_totales.value.filter(e => {
    return e.linea?.trim().toLowerCase() === categoria.categoria.trim().toLowerCase()
  })

  // Actualizar variables reactivas con los productos filtrados
  filtro_activo.value = categoria
  productos_alea.value = productosFiltrados
  cant_pagina.value = Math.ceil(productosFiltrados.length / cant_maxima_pag.value)
  pagina.value = nuevaPagina
  imagenCargada.value = true

  // Hacer scroll hacia arriba para mostrar los resultados
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Función para seleccionar una categoría (desde el listado de categorías)
function seleccionarCategoria(dato, index) {
  selectedIndex.value = index // Actualiza el índice seleccionado
  buscar_categoria(dato, 1) // Llama a la función de filtrado
}

// Función de búsqueda de productos para sugerencias (filtrado local)
// Se modificará si se desea hacer una consulta a la API en lugar de filtrar localmente
async function filtrarProductos() {
  if (busqueda.value.length <= 2) {
    producto_buscado.value = [] // No buscar si hay menos de 3 caracteres
    return
  }

  try {
    cargando.value = true
    const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${busqueda.value}&id=${id_empresa}`
    console.log("Consultando:", url)
    const response = await axios.get(url)
    const productos = response.data.productos || []
    console.log("Productos recibidos:", productos)

    const busquedaMinus = busqueda.value.toLowerCase()
    const palabrasClave = busquedaMinus.split(" ").filter(Boolean)
    // Coincidencias EXACTAS: el título contiene toda la frase
    const coincidenciasExactas = productos.filter(p =>
      p.titulo?.toLowerCase().includes(busquedaMinus)
    )
    // Coincidencias PARCIALES: cada palabra aparece en el título, pero no la frase completa
    const coincidenciasParciales = productos.filter(p => {
      const tituloLower = p.titulo?.toLowerCase() || ""
      const todasAparecen = palabrasClave.every(pal => tituloLower.includes(pal))
      return todasAparecen && !coincidenciasExactas.includes(p)
    })

    let combinado = []
    if (coincidenciasExactas.length > 0 && coincidenciasParciales.length > 0) {
      combinado = [...coincidenciasExactas, { separator: true }, ...coincidenciasParciales]
    } else {
      combinado = [...coincidenciasExactas, ...coincidenciasParciales]
    }

    // Eliminar duplicados por id
    function removeDuplicatesById(list) {
      const seen = new Set();
      return list.filter(item => {
        if (item.separator) return true;
        if (!item.id) return true;
        if (seen.has(item.id)) {
          return false;
        } else {
          seen.add(item.id);
          return true;
        }
      });
    }

    producto_buscado.value = removeDuplicatesById(combinado)
    
  } catch (error) {
    console.error("Error al obtener productos:", error)
  } finally {
    cargando.value = false
  }
}

// Otras funciones: redirigir a la lista de productos, etc.
function redirigirAListaDeProductos(termino) {
  window.location.href = `/shop-list.html?Pag=${termino}`;
}


// Listas de categorías (inyectadas desde el padre)
const categorias_alea = inject('categorias_alea', ref([]))
const categorias_alfabetica = inject('categorias_alfabetica', ref([]))




</script>



<template>
    <!-- breadcrumbs -->
    <div class="container">
      <div class="breadcrumbs">
        <a href="/"><i class="las la-home"></i></a>
        <a href="#" class="active">Catalogo</a>
      </div>
    </div>
  
    <!-- shop list view -->
    <div class="shop_wrap section_padding_b">
      <div class="container">
        <div class="row">
          <!-- Columna de filtros -->
          <div class="col-xl-3 col-lg-4 position-relative">
            <div class="filter_box py-3 px-3 shadow_sm">
              <div class="close_filter d-block d-lg-none"><i class="las la-times"></i></div>
              
              <!-- Subcategorías (ejemplo) -->
              <div id="columna_categorias" class="shop_filter">
                <h4 class="filter_list">Categorias</h4>
                <div class="filter_list">
                  <!-- Ejemplo de v-for si manejas un array “categorias_hijo” -->
                  <div
                    class="d-flex align-items-center"
                    v-for="(dato, index) in categorias_hijo"
                   
                   
                  >
                    <label
                      style="cursor: pointer;"
                      class="p-2"
                      :class="{ 'selected': selectedIndex === index }"
                      @click="seleccionarCategoria(dato, index)"
                    >
                      - {{ dato.categoria }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Columna principal donde se listan los productos -->
          <div class="col-xl-9 col-lg-8">
            <div class="d-flex align-items-center">
              <div class="view_filter d-flex align-items-center ms-auto">
                <a href="shop-list.html">
                  <div class="view_icon active"><i class="las la-list-ul"></i></div>
                </a>
              </div>
            </div>
  
            <div class="shop_products">
              <div class="list_view_products">
                <!-- Itera SOLO los productosPaginados -->
                <div
                  class="single_list_product"
                  v-for="(dato, index) in productosPaginados"
                  :key="index"
                >
                  <div class="row">
                    <div class="col-md-4">
                      <div class="list_product_img">
                        <div class="lp_img">
                          <a >
                            <img loading="lazy" :src="dato.imagen" alt="product" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-8">
                      <div class="product_content">
                        <RouterLink 
                          :to="{ name: 'producto', query: { producto: dato.id } }" 
                          class="format_titulo"
                          >
                          <h5>{{ dato.titulo }}</h5>
                          </RouterLink>
                        <div class="ratprice">
                          <div class="price">
                            <span class="org_price">
                              $ {{
                                Math.round(parseFloat(dato.pt1))
                                  .toString()
                                  .replace(/\./g, ',')
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                              }}
                            </span>
                          </div>
                          <!-- rating  -->
                          <div class="rating">
                            <div class="d-flex align-items-center justify-content-start">
                              <p>
                                <span class="text-semibold">SKU:</span> {{ dato.idpro }}
                              </p>
                            </div>
                          </div>
                          <div class="rating">
                            <div class="d-flex align-items-center justify-content-start">
                              <p>
                                <span class="text-semibold">
                                  Disponibilidad en:
                                 
                                    <span class="text-green" > {{ dato.existencia }} </span>
                                
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
  
                        <div class="product_list_btns">
                          <a
                            style="cursor: pointer;"
                            class="default_btn me-sm-3 me-2 px-2 px-lg-4"
                            @click="buscar_productos(dato.id)"
                            ><i class="icon-cart me-2"></i> Al Carrito
                          </a>
                          <a
                            style="cursor: pointer;"
                            class="default_btn second px-3 px-ms-4"
                            @click="cargar_me_gusta(dato.id, dato.titulo, dato.pt1, dato.imagen, 'Agregado_ppl', dato.idpro)"
                            ><i class="icon-heart me-2"></i>Me Gusta
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- fin v-for de productosPaginados -->
              </div>
            </div>
  
            <!-- Paginación -->
            <div class="pagination_container">
              <div class="pagination_wrp collapsed">
                <!-- Genera elementos de paginación desde 1 hasta cant_pagina -->
                <div
                  class="single_paginat"
                  :class="{ active: i === pagina }"
                  v-for="i in cant_pagina"
                  :key="i"
                  @click="paginar(i)"
                >
                  {{ i }}
                </div>
              </div>
              <!-- Botón para expandir / colapsar la paginación (opcional) -->
              <button class="toggle_button" onclick="togglePagination()">Ver más</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- footer area -->

        <!-- product quick view -->
        <div class="product_quickview">
        <div class="prodquick_wrap position-relative">
            <div class="close_quickview">
                <i class="las la-times"></i>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <!-- product quick view slider image  -->
                     <div class="product_view_slider">
                       <div class="single_viewslider">
                            <img loading="lazy"  :src=imagenMostrada   alt="product">
                        </div>
                       
                    </div>
                    
                    
                     <!-- product quick view nav  -->
                    <div class="product_viewslid_nav" style="display: flex;">
                
                         <div class="single_viewslid_nav" v-if="producto_mostrar && producto_mostrar.lista_imagenes" style="display: flex;">
                              <img loading="lazy" :src="producto_mostrar.imagen" alt="product"   @click="cambiarImagen(producto_mostrar.imagen)"> 
                          <template v-for="(url, index) in (producto_mostrar.lista_imagenes || '').split(',')" :key="index">
                            <img loading="lazy" :src="url.trim()" alt="product"  @click="cambiarImagen(url.trim())">
                          </template>
                          
                         
                  </div>
                        
                   
                </div>
                </div>

                
            </div>
            </div>
        </div>

        
     
</template>




<style>
.selected {
background-color: #f0f0f0;
border: 1px solid #007bff;
border-radius: 4px;
}
   .tiktok {
content: url('/assets/tik-tok_6422207.svg');
display: inline-block;
width: 4px;
height: 4px;
cursor:pointer;
}
.pagination_container {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;
}

.pagination_wrp {
display: flex;
flex-wrap: wrap;
justify-content: center;
overflow: hidden;
max-height: 40px; /* Muestra solo una fila de botones (aproximadamente 10) */
transition: max-height 0.3s ease-in-out;
}

.pagination_wrp.collapsed {
max-height: 40px; /* Altura inicial para la primera fila */
}

.pagination_wrp.expanded {
max-height: 500px; /* Ajusta este valor según la cantidad de botones que quieres mostrar */
}

.single_paginat {
margin: 5px;
padding: 5px 10px;
border: 1px solid #000000;
border-radius: 3px;
cursor: pointer;
text-align: center;
background-color: #f8f9fa;
transition: background-color 0.3s;
}

.single_paginat:hover {
background-color: #c4daff;
color: white;
}

.toggle_button {
margin-top: 10px;
padding: 5px 15px;
background-color: #000b74;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.toggle_button:hover {
background-color: #c4daff;
}


</style>
