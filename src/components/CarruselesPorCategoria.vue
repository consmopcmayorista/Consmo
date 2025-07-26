<template>
  <div class="section_padding_b bg-white text-dark" v-if="productosFiltrados.length">
    <div class="container-fluid px-3 px-sm-4 px-md-5 position-relative pb-5 carrusel-full">
      <!-- Encabezado del carrusel con título y botón "Ver todos" -->
      <div class="d-flex justify-content-between align-items-center mb-4 encabezado-carrusel flex-wrap gap-2">
        <h2 class="section_title_3 mb-0">
          🧩 {{ titulo || (categoria.charAt(0).toUpperCase() + categoria.slice(1)) }}
        </h2>
        <RouterLink
          :to="`/catalogo_cat?categoria=${encodeURIComponent(categoria)}`"
          class="btn btn-outline-primary btn-sm"
        >
          Ver todos los {{ categoria.charAt(0).toUpperCase() + categoria.slice(1) }}
        </RouterLink>
      </div>

      <!-- Carrusel Swiper dinámico por categoría -->
      <div class="swiper-wrapper-container">
        <swiper
          :modules="[Navigation]"
          navigation
          :slides-per-view="2"
          :space-between="12"
          :breakpoints="{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1600: { slidesPerView: 6 }
          }"
          class="carrusel-swiper"
        >
          <swiper-slide
            v-for="(producto, index) in productosFiltrados"
            :key="categoria + '-' + index"
          >
            <div class="card producto-card shadow-sm">
              <div class="imagen-wrapper">
                <img
                  :src="producto.imagen"
                  class="card-img-top pointer"
                  :alt="producto.titulo"
                  loading="lazy"
                />
              </div>
              <div class="card-body d-flex flex-column text-center">
                <h6 class="card-title mb-2 card-title-expandable titulo-clamp" :title="producto.titulo">
                  {{ producto.titulo }}
                </h6>
                <small class="text-muted">SKU: {{ producto.idpro }}</small>
                <p class="mt-1 text-success small">Disponible en: {{ producto.existencia }}</p>
                <h5 class="text-primary mt-auto">
                  $ {{ Math.round(parseFloat(producto.pt1)).toLocaleString('es-CO') }}
                </h5>
                <button
                  @click.stop="buscarProducto(producto.id)"
                  class="btn btn-sm btn-outline-primary mt-2"
                >Ver más</button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { RouterLink } from 'vue-router'

const props = defineProps({
  productos: Array,
  categoria: String,
  titulo: {
    type: String,
    default: ''
  },
  buscarProducto: Function,
  formatLine: Function
})

const productosFiltrados = computed(() => {
  return props.productos.filter(p => p.linea?.toLowerCase().includes(props.categoria.toLowerCase()))
})
</script>

<style scoped>
.section_title_3 {
  font-size: 1.6rem;
  font-weight: bold;
}

.swiper-wrapper-container {
  position: relative;
  padding: 0 60px; /* Más espacio para flechas */
}

.producto-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;
  background: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  height: 450px;
  max-width: 100%;
}
.producto-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.imagen-wrapper {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
}
.card-img-top {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-body {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-body p.text-success {
  font-weight: bold;
  color: #198754 !important;
  position: relative;
  padding-left: 1.4em;
  min-height: 1.5em;
}
.card-body p.text-success::before {
  content: "\2714";
  position: absolute;
  left: 0;
  top: 0.1em;
  color: #198754;
  font-size: 1em;
}

.titulo-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.8em;
  line-height: 1.4em;
}

.pointer {
  cursor: pointer;
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

::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 42px;
  height: 42px;
  color: #000;

  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}
::v-deep(.swiper-button-prev) {
  left: 10px !important;
}
::v-deep(.swiper-button-next) {
  right: 10px !important;
}
::v-deep(.swiper-button-prev:hover),
::v-deep(.swiper-button-next:hover) {
  background-color: #0d6efd;
  color: #fff;
}

.carrusel-full {
  max-width: 100%;
}
@media (min-width: 1400px) {
  .carrusel-full {
    max-width: 1840px;
    margin: 0 auto;
  }
}
</style>
