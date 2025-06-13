<template>
  <section class="futuristic-featured py-5">
    <div class="container">

      <!-- 🎯 Banner principal (solo en escritorio) -->
      <div class="futuristic-card mb-4 d-none d-md-block">
        <img src="/images2/destacados/destacadoprincipal.jpg" alt="Banner ICONNEX" class="card-img" />
        <div class="card-overlay">
          <h3>ICONNEX: energía y conectividad</h3>
          <p>UPS, powerbanks, auriculares, cargadores y más.</p>
          <a href="/catalogo_cat?categoria=&busqueda=ICONNEX" class="futuristic-btn">🔍 Ver Producto</a>
        </div>
      </div>

      <!-- 🏷️ Título -->
      <h2 class="futuristic-title text-center mb-4">🚀 Productos Destacados</h2>

      <!-- 🖥️ Carrusel en escritorio -->
      <Swiper
        v-if="!isMobile"
        :slides-per-view="3"
        :space-between="28"
        :pagination="{ clickable: true }"
        class="futuristic-swiper"
      >
        <SwiperSlide v-for="(producto, index) in productos" :key="index">
          <div class="futuristic-card">
            <img :src="producto.imagen" :alt="producto.nombre" class="card-img" />
            <div class="card-overlay">
              <h3>{{ producto.nombre }}</h3>
              <p>{{ producto.descripcion }}</p>
              <a :href="producto.link" class="futuristic-btn">Ver más</a>
            </div>
          </div>
        </SwiperSlide>
        <template #pagination></template>
      </Swiper>

      <!-- 📱 Carrusel combinado (banner + productos) en móviles -->
      <Swiper
        v-else
        :slides-per-view="1.1"
        :space-between="16"
        :pagination="{ clickable: true }"
        class="futuristic-swiper"
      >
        <!-- Banner como slide -->
        <SwiperSlide>
          <div class="futuristic-card">
            <img src="/images2/destacados/destacadoprincipal.jpg" alt="Banner ICONNEX" class="card-img" />
            <div class="card-overlay">
              <a href="/catalogo_cat?categoria=&busqueda=ICONNEX" class="futuristic-btn">🔍 Ver Producto</a>
            </div>
          </div>
        </SwiperSlide>

        <!-- Productos -->
        <SwiperSlide v-for="(producto, index) in productos" :key="index">
          <div class="futuristic-card">
            <img :src="producto.imagen" :alt="producto.nombre" class="card-img" />
            <div class="card-overlay">
              <a :href="producto.link" class="futuristic-btn">Ver más</a>
            </div>
          </div>
        </SwiperSlide>
        <template #pagination></template>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
// 📦 Swiper y breakpoints
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

// 📋 Productos destacados
const productos = [
  {
    nombre: 'CHASIS GAMER TRIDIMENSIONAL',
    descripcion: 'PC GAMER ORIGAMI RGB, 7 COOLER, NEGRO, GLASS',
    imagen: '/images2/destacados/destacado1.jpg',
    link: '/producto?producto=41567'
  },
  {
    nombre: 'MONITOR IPS 27” CURVO',
    descripcion: 'Full HD 180HZ HDMI/VGA TEROS TE-2766G',
    imagen: '/images2/destacados/destacado2.jpg',
    link: '/producto?producto=41558'
  },
  {
    nombre: 'SILLA GAMER HAVIT',
    descripcion: 'Silla gamer negro con rojo havit GC-933',
    imagen: '/images2/destacados/destacado4.jpg',
    link: '/producto?producto=42246'
  }
]

// 🧠 Detectar móvil
const isMobile = ref(window.innerWidth < 768)
const handleResize = () => isMobile.value = window.innerWidth < 768
onMounted(() => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

/* 🎯 Título futurista */
.futuristic-title {
  font-family: 'Orbitron', 'Poppins', sans-serif;
  font-size: 2.4rem;
  font-weight: 900;
  color: #4dfbff;
  text-shadow: 0 2px 20px #0efcf8aa;
}

/* 🎠 Swiper carrusel */
.futuristic-swiper {
  margin-bottom: 2rem;
}

/* 🧊 Tarjetas de productos + banner */
.futuristic-card {
  position: relative;
    max-height: 460px;
  min-height: 300px;
  border-radius: 1.6rem;
  overflow: hidden;
  background: #0e223a;
  box-shadow: 0 8px 28px #00e8ff33;
  transition: transform 0.3s ease;
}
.futuristic-card:hover {
  transform: scale(1.02);
}

/* 🖼️ Imagen nítida y ajustada */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.6rem;
  display: block;
}

/* 🎛️ Overlay con info (hover en desktop) */
.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.88));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  color: white;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.futuristic-card:hover .card-overlay {
  opacity: 1;
  pointer-events: auto;
}

/* 🎨 Texto */
.card-overlay h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #31f8fa;
  margin-bottom: 0.5rem;
}
.card-overlay p {
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

/* 🌐 Botón futurista */
.futuristic-btn {
  background: linear-gradient(90deg, #09c9ff 0%, #25f8ff 60%, #27f9d2 100%);
  color: #000;
  font-family: 'Orbitron', sans-serif;
  font-weight: 800;
  padding: 10px 22px;
  border-radius: 100px;
  font-size: 1rem;
  box-shadow: 0 2px 12px #27f9d266;
  text-decoration: none;
  transition: all 0.3s ease;
}
.futuristic-btn:hover {
  background: linear-gradient(90deg, #1fffff 0%, #007bff 100%);
  color: white;
  transform: scale(1.05);
}

/* 📱 Estilo móvil: imagen y botón solamente */
@media (max-width: 767px) {
  .futuristic-card {
    height: 260px;
  }

  .card-overlay {
    opacity: 1 !important;
    pointer-events: auto !important;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
    padding: 12px;
  }

  .card-overlay h3,
  .card-overlay p {
    display: none;
  }

  .card-img {
    height: 100%;
  }
}
</style>
