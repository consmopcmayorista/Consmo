<script setup>
import { RouterLink, useRouter } from 'vue-router'
import services from '@/components/services.vue'
import ProductQuickview from '@/components/product_indv.vue'
import { ref, onMounted, inject, computed, watch } from 'vue'
import axios from 'axios'

const router = useRouter()

const dominio = 'consmopcmayorista.com'
const id_empresa = '24'

const productos_alea = ref([])
const productos_totales = ref([])
const imagenCargada = ref(false)
const filtro_activo = ref(null)
const selectedIndex = ref(null)
const categorias_alea = inject('categorias_alea', ref([]))
const categorias_alfabetica = inject('categorias_alfabetica', ref([]))
const cargando = ref(true)
const pagina = ref(1)
const cant_maxima_pag = ref(17)
const mostrarCategorias = ref(false)

const cant_pagina = computed(() => {
  return Math.ceil(productos_alea.value.length / cant_maxima_pag.value)
})

const productosPaginados = computed(() => {
  const start = (pagina.value - 1) * cant_maxima_pag.value
  const end = pagina.value * cant_maxima_pag.value
  return productos_alea.value.slice(start, end)
})

function paginar(nuevaPagina) {
  if (nuevaPagina >= 1 && nuevaPagina <= cant_pagina.value) {
    pagina.value = nuevaPagina
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const showAllPages = ref(false)
function togglePagination() {
  showAllPages.value = !showAllPages.value
}

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

function redirigirAVerMas(id) {
  router.push({ name: 'producto', query: { producto: id } })
}

function shuffleArray(array) {
  return array.map(value => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)
}

async function fetchProductos() {
  try {
    const response = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`
    )
    productos_alea.value = shuffleArray(response.data.productos) || []
    productos_totales.value = productos_alea.value
  } catch (error) {
    console.error('Error al obtener productos:', error)
  } finally {
    cargando.value = false
  }
}

function buscar_categoria(categoria, nuevaPagina) {
  const productosFiltrados = productos_totales.value.filter(e => categoria.categoria === e.linea)
  filtro_activo.value = categoria
  productos_alea.value = productosFiltrados
  pagina.value = nuevaPagina
  imagenCargada.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function seleccionarCategoria(dato, index) {
  selectedIndex.value = index
  buscar_categoria(dato, 1)
  mostrarCategorias.value = false
}

onMounted(() => {
  fetchProductos()
})
</script>

<template>
  <div class="container py-4">
    <!-- BOTÓN CATEGORÍAS MOBILE -->
    <div class="d-block d-lg-none mb-3 text-center">
      <button class="btn btn-outline-primary" @click="mostrarCategorias = !mostrarCategorias">
        {{ mostrarCategorias ? 'Ocultar categorías' : 'Ver categorías' }}
      </button>
    </div>

    <div class="row">
      <!-- CATEGORÍAS -->
      <aside class="col-lg-3 mb-4" :class="{ 'd-none d-lg-block': !mostrarCategorias }">
        <div class="bg-white p-3 shadow-sm rounded">
          <h5 class="fw-bold mb-3">Categorías</h5>
          <ul class="list-unstyled">
            <li
              v-for="(dato, index) in categorias_alfabetica"
              :key="index"
              class="py-1 categoria-item"
              :class="{ active: selectedIndex === index }"
              @click="seleccionarCategoria(dato, index)"
            >
              - {{ dato.categoria }}
            </li>
          </ul>
        </div>
      </aside>

      <!-- PRODUCTOS -->
      <main class="col-lg-9">
        <div v-if="cargando" class="text-center">Cargando productos...</div>
        <div v-else class="row g-3">
          <div
            class="col-6 col-md-4 col-lg-3"
            v-for="(dato, index) in productosPaginados"
            :key="index"
          >
            <div class="card producto-card h-100 shadow-sm" @click="redirigirAVerMas(dato.id)">
              <img
                :src="dato.imagen"
                class="card-img-top p-2 pointer"
                :alt="dato.titulo"
                loading="lazy"
              />
              <div class="card-body d-flex flex-column text-center">
                <h6 class="card-title mb-2 text-truncate">{{ dato.titulo }}</h6>
                <small class="text-muted">SKU: {{ dato.idpro }}</small>
                <p class="mt-1 text-success small">Disponible en: {{ dato.existencia }}</p>
                <h5 class="text-primary mt-auto">$
                  {{ Math.round(parseFloat(dato.pt1)).toLocaleString('es-CO') }}
                </h5>
                <RouterLink
                  class="btn btn-sm btn-outline-primary mt-2"
                  :to="{ name: 'producto', query: { producto: dato.id } }"
                  @click.stop
                >Ver más</RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- PAGINACIÓN -->
        <nav class="mt-4 d-flex justify-content-center">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: pagina === 1 }">
              <a class="page-link" href="#" @click.prevent="paginar(pagina - 1)" aria-label="Anterior">&laquo;</a>
            </li>
            <li
              v-for="i in visiblePages"
              :key="i"
              class="page-item"
              :class="{ active: pagina === i }"
            >
              <a class="page-link" href="#" @click.prevent="paginar(i)">{{ i }}</a>
            </li>
            <li class="page-item" :class="{ disabled: pagina === cant_pagina }">
              <a class="page-link" href="#" @click.prevent="paginar(pagina + 1)" aria-label="Siguiente">&raquo;</a>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  </div>
</template>

<style scoped>
.categoria-item {
  cursor: pointer;
  transition: background 0.2s;
}
.categoria-item:hover,
.categoria-item.active {
  background-color: #e7f1ff;
  border-left: 4px solid #0d6efd;
  padding-left: 6px;
}
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}
.page-link {
  color: #0d6efd;
}

.producto-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 0.75rem;
  overflow: hidden;
  background: #fff;
}
.producto-card:hover {
  transform: translateY(-8px) scale(1.015);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}
.producto-card:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.card-img-top {
  height: 150px;
  object-fit: contain;
}
.card-body {
  padding: 0.75rem;
}
.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pointer {
  cursor: pointer;
}

/* NUEVOS ESTILOS */
.card-body p.text-success {
  font-weight: bold;
  color: #198754 !important; /* verde mejorado */
  position: relative;
  padding-left: 1.4em;
}
.card-body p.text-success::before {
  content: "\2714"; /* check icon */
  position: absolute;
  left: 0;
  top: 0.1em;
  color: #198754;
  font-size: 1em;
}

.btn-outline-primary {
  background-color: #01060e !important;
  color: white !important;
  border-color: #0d6efd !important;
}
.btn-outline-primary:hover {
  background-color: #0b5ed7 !important;
  border-color: #0b5ed7 !important;
}
</style>
