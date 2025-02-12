<script setup>
import { RouterLink, RouterView } from 'vue-router'
import services from '@/components/services.vue'
import ProductQuickview from '@/components/product_indv.vue' // Importamos el modal

import { ref, onMounted, inject, computed } from 'vue'
import axios from 'axios'

// Configuración
const dominio = 'consmopcmayorista.com'
const id_empresa = '24'

// Variables reactivas
const productos_alea = ref([]) 
const productos_totales = ref([]) 

const imagenCargada = ref(false) // Control de carga de imagen
const filtro_activo = ref(null)
const selectedIndex = ref(null) 
// Lista de productos para "Recomendados"
 const categorias_alea = inject('categorias_alea', ref([])) 
 const categorias_alfabetica = inject('categorias_alfabetica', ref([])) 

console.log(categorias_alfabetica.value)
const cargando = ref(true)

const pagina = ref(1)             // Página actual (1-based)
const cant_maxima_pag = ref(17)   // Cantidad de ítems por página

// Computada para obtener cuántas páginas hay en total
const cant_pagina = computed(() => {
  return Math.ceil(productos_alea.value.length / cant_maxima_pag.value)
})

// Computada para obtener SOLO los productos de la página actual
const productosPaginados = computed(() => {
  const start = (pagina.value - 1) * cant_maxima_pag.value
  const end = pagina.value * cant_maxima_pag.value
  return productos_alea.value.slice(start, end)
})

// Función para cambiar de página
function paginar(nuevaPagina) {
  if (nuevaPagina >= 1 && nuevaPagina <= cant_pagina.value) {
    pagina.value = nuevaPagina
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Hace que la transición sea suave
    });
  }
}

// Función para mostrar todas las páginas
const showAllPages = ref(false)
function togglePagination() {
  showAllPages.value = !showAllPages.value
}

// Computada para obtener las páginas visibles
const visiblePages = computed(() => {
  const isMobile = window.innerWidth <= 768;
  const pagesToShow = isMobile ? 7 : 13;

  if (showAllPages.value) {
    return Array.from({ length: cant_pagina.value }, (_, i) => i + 1)
  } else {
    const start = Math.floor((pagina.value - 1) / pagesToShow) * pagesToShow + 1
    const end = Math.min(start + pagesToShow - 1, cant_pagina.value)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }
})

const mostrarQuickview = ref(false)
const productoSeleccionado = ref(null)

function buscar_productos(id) {
  productoSeleccionado.value = id
  mostrarQuickview.value = true
  console.log('Abriendo modal, id=', id, 'mostrarQuickview=', mostrarQuickview.value)
}

function closeQuickview() {
  document.querySelector('.product_quickview').classList.remove('active');
  document.body.style.overflowY = 'auto'; 
}

// Función para cortar línea de texto
function formatLine(str, start, length) {
  if (!str) return ''
  return str.slice(start, start + length)
}

// Función para barajar el array
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// Carga de productos "recomendados"
async function fetchProductos() {
  try {
    const response = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`
    )
    // Asignamos array barajado
    productos_alea.value = shuffleArray(response.data.productos) || []
    productos_totales.value = productos_alea.value
  } catch (error) {
    console.error('Error al obtener productos:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  fetchProductos()
})

// Scripts de carrusel, etc. (usando jQuery, owl, etc.)
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

function buscar_categoria(categoria, nuevaPagina) {
  console.log('Filtrando por categoría:', categoria)

  // Filtrar los productos que pertenecen a la categoría seleccionada
  let productosFiltrados = productos_totales.value.filter(e => categoria.categoria === e.linea)

  // Actualizar variables reactivas con los productos filtrados
  filtro_activo.value = categoria
  productos_alea.value = productosFiltrados
  cant_pagina.value = Math.ceil(productosFiltrados.length / cant_maxima_pag.value)
  pagina.value = nuevaPagina
  imagenCargada.value = true

  // Hacer scroll hacia arriba para mostrar los resultados
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function seleccionarCategoria(dato, index) {
  selectedIndex.value = index // Actualiza el índice seleccionado
  buscar_categoria(dato, 1) // Llama a la función de filtrado
}
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
                  v-for="(dato, index) in categorias_alfabetica"
                  :key="index"
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
                        <a>
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
                                <span class="text-green">{{ dato.existencia }}</span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="product_list_btns">
                        <RouterLink
                          :to="{ name: 'producto', query: { producto: dato.id } }"
                          class="default_btn me-sm-3 me-2 px-2 px-lg-4"
                          @click="buscar_productos(dato.id)"
                        >
                          <i class="icon-cart me-2"></i> Al Carrito
                        </RouterLink>
                        <a
                          style="cursor: pointer;"
                          class="default_btn second px-3 px-ms-4"
                          @click="cargar_me_gusta(dato.id, dato.titulo, dato.pt1, dato.imagen, 'Agregado_ppl', dato.idpro)"
                        ><i class="icon-heart me-2"></i>Me Gusta</a>
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
            <div class="pagination_wrp" :class="{ expanded: showAllPages }">
              <!-- Botón para retroceder una página -->
              <button 
                class="pagination_button" 
                :disabled="pagina === 1" 
                @click="paginar(pagina - 1)">
                &lt;
              </button>

              <!-- Genera elementos de paginación -->
              <div
                class="single_paginat"
                :class="{ active: i === pagina }"
                v-for="i in visiblePages"
                :key="i"
                @click="paginar(i)"
              >
                {{ i }}
              </div>

              <!-- Botón para avanzar una página -->
              <button 
                class="pagination_button" 
                :disabled="pagina === cant_pagina" 
                @click="paginar(pagina + 1)">
                &gt;
              </button>

              <!-- Botón para ver todas las páginas -->
              <button 
                class="pagination_button" 
                v-if="!showAllPages && cant_pagina > visiblePages.length" 
                @click="showAllPages = true">
                >>
              </button>
            </div>
            
            <!-- Botón para expandir / colapsar la paginación (opcional) -->
            <button class="toggle_button" @click="togglePagination">
              {{ showAllPages ? 'Ver menos' : 'Ver más' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- footer area -->

  <!-- product quick view -->
  <div class="product_quickview">
    <div class="prodquick_wrap position-relative">
      <div class="close_quickview" @click="closeQuickview">
        <i class="las la-times"></i>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <!-- product quick view slider image  -->
          <div class="product_view_slider">
            <div class="single_viewslider">
              <img loading="lazy" :src="imagenMostrada" alt="product" />
            </div>
          </div>
          
          <!-- product quick view nav  -->
          <div class="product_viewslid_nav" style="display: flex;">
            <div class="single_viewslid_nav" v-if="producto_mostrar && producto_mostrar.lista_imagenes" style="display: flex;">
              <img loading="lazy" :src="producto_mostrar.imagen" alt="product" @click="cambiarImagen(producto_mostrar.imagen)" />
              <template v-for="(url, index) in (producto_mostrar.lista_imagenes || '').split(',')" :key="index">
                <img loading="lazy" :src="url.trim()" alt="product" @click="cambiarImagen(url.trim())" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.selected {
  background-color: #f0f0f0;
  border: 1px solid #007bff;
  border-radius: 4px;
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
  max-height: 40px; /* Muestra solo una fila de botones (aproximadamente 13) */
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

.pagination_button {
  padding: 5px 10px;
  margin: 2px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

.pagination_button:disabled {
  cursor: not-allowed;
  color: #ccc;
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