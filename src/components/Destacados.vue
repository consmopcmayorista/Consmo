<template>
  <!-- Sección de Destacados -->
  <div class="featured_products section_padding_b">
    <div class="container">
      <h2 class="section_title_3 mb-4">Productos Destacados</h2>

      <div class="row">
        <!-- Banner Principal (Largo) -->
        <div class="col-12 mb-4">
          <div class="featured-banner principal">
            <img src="/images2/destacados/destacadoprincipal.jpg" alt="Producto Destacado Principal" class="img-fluid w-100">
            <div class="banner-content">
               <h3>PRODUCTOS ICONNEX</h3>
              <!--<p>CONTROL BLUETOOTH VR SHINECON 4.0</p>-->
              <a href="/catalogo_cat?categoria=&busqueda=ICONNEX" class="btn btn-primary">Ver Producto</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Carrusel en dispositivos móviles -->
      <div class="row d-block d-md-none">
        <div class="featured-slider">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(producto, index) in productos" :key="index">
              <div class="featured-banner">
                <img :src="producto.imagen" :alt="producto.nombre" class="img-fluid">
                <div class="banner-content">
                  <h3>{{ producto.nombre }}</h3>
                  <p>{{ producto.descripcion }}</p>
                  <a :href="producto.link" class="btn btn-primary">Ver Producto</a>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

      <!-- Cuadrícula en pantallas grandes -->
      <div class="row d-none d-md-flex">
        <div class="col-md-4 mb-4" v-for="(producto, index) in productos" :key="index">
          <div class="featured-banner">
            <img :src="producto.imagen" :alt="producto.nombre" class="img-fluid">
            <div class="banner-content">
              <h3>{{ producto.nombre }}</h3>
              <p>{{ producto.descripcion }}</p>
              <a :href="producto.link" class="btn btn-primary">Ve Producto</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/css";
import "swiper/css/pagination";

export default {
  data() {
    return {
      productos: [
        {
          nombre: "CHASIS GAMER TRIDIMENCIONAL",
          descripcion: "CHASIS PARA PC GAMER TRIDIMENCIONAL RGB NEGRO 7 COOLER ORIGAMI",
          imagen: "/images2/destacados/destacado1.jpg",
          link: "/producto?producto=41567"
        },
        {
          nombre: "MONITOR IPS 27 PULGADAS",
          descripcion: "1920x1080 FULL HD CURVO 180HZ HDMI/VGA TEROS TE-2766G",
          imagen: "/images2/destacados/destacado2.jpg",
          link: "/producto?producto=41558"
        },
        {
          nombre: "TIMON GENIUS SPEEDMASTER",
          descripcion: "TIMON Y PEDAL PARA PC/PS3/PS4 NEGRO ROJO GENIUS SPEEDMASTER",
          imagen: "/images2/destacados/destacado3.jpg",
          link: "/producto?producto=41579"
        }
      ]
    };
  },
  mounted() {
    new Swiper(".featured-slider", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }
};
</script>

<style scoped>
/* Estilos de destacados */
.featured-banner {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.featured-banner:hover {
  transform: translateY(-5px);
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
}

/* Ajustes para móviles */
@media (max-width: 768px) {
  .banner-content {
    padding: 10px;
  }
  .banner-content h3 {
    font-size: 1.4rem;
  }
  .banner-content p {
    font-size: 1rem;
  }
  .featured-banner.principal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .featured-banner.principal img {
    width: 100%;
    height: auto;
  }
}

/* Carrusel */
.featured-slider {
  overflow: hidden;
  position: relative;
  padding: 20px 10px;
  background: linear-gradient(180deg, #f8f9fa, #e0e7ff);
  border-radius: 10px;
}

/* Estilos de las tarjetas en el carrusel */
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Mejora en la paginación */
.swiper-pagination {
  position: relative;
  bottom: -5px;
}

.swiper-pagination-bullet {
  background: #4a90e2 !important;
  width: 10px;
  height: 10px;
  opacity: 0.7;
  transition: transform 0.2s;
}

.swiper-pagination-bullet-active {
  transform: scale(1.3);
  background: #007bff !important;
  opacity: 1;
}
</style>