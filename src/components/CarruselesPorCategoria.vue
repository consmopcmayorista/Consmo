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
          :slides-per-view="1.2"
          :space-between="0"
          :breakpoints="{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 }
          }"
          class="carrusel-swiper"
        >
          <!-- Tarjetas de producto dentro del carrusel -->
          <swiper-slide
            v-for="(producto, index) in productosFiltrados"
            :key="categoria + '-' + index"
          >
            <div class="card-product-clean shadow-sm fixed-card">
              <div class="card-img-clean">
                <img :src="producto.imagen" :alt="producto.titulo" loading="lazy" />
                <div class="overlay-clean">
                  <button @click="buscarProducto(producto.id)" class="btn-outline-dark btn-sm">👁 Ver</button>
                </div>
              </div>
              <div class="card-body px-3 py-3 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <RouterLink
                    :to="{ name: 'producto', query: { producto: producto.id } }"
                    class="text-decoration-none text-dark"
                  >
                    <p class="titulo-truncado fw-semibold mb-1">
                      {{ producto.titulo }}
                    </p>
                  </RouterLink>
                  <small class="text-muted d-block">SKU: {{ producto.idpro }}</small>
                </div>
                <div class="mt-2 fw-bold fs-5 text-primary">
                  $ {{ Math.round(parseFloat(producto.pt1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
                </div>
              </div>
              <div class="card-footer border-top px-3 pb-3">
                <button @click="buscarProducto(producto.id)" class="btn btn-dark w-100 fw-semibold">
                  <i class="icon-cart me-2"></i> Añadir al carrito
                </button>
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
  padding: 0 50px; /* deja espacio para las flechas */
}

.card-product-clean {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.fixed-card {
  height: 100%;
  max-height: 500px;
  width: 80%;
  display: flex;
  flex-direction: column;
}

.card-product-clean:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* .card-img-clean {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
} */

.card-img-clean img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-bottom: 1px solid #eee;
}

.card-product-clean:hover img {
  transform: scale(1.05);
}

.overlay-clean {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-img-clean:hover .overlay-clean {
  opacity: 1;
}

.titulo-truncado {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.2em;
  line-height: 1.6em;
}

::v-deep(.swiper-button-prev),
::v-deep(.swiper-button-next) {
  top: 40%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  color: #000;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

::v-deep(.swiper-button-prev) {
  left: -24px;
}

::v-deep(.swiper-button-next) {
  right: -24px;
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
