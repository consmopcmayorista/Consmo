<template>
  <div class="carousel-wrapper">
    <!-- Encabezado del carrusel -->
    <div class="carousel-header">
      <h2 class="carousel-title">Nuestras Marcas Aliadas</h2>

      <!-- Puntos indicadores -->
      <div class="dots-wrapper">
        <span 
          v-for="(card, index) in tarjetas"
          :key="index"
          class="dot"
          :class="{ active: index === activeIndex }"
        ></span>
      </div>
    </div>

    <!-- Controles de navegación + pista de tarjetas -->
    <div class="carousel-controls">
      <!-- Botón izquierdo -->
      <button 
        class="nav-arrow left" 
        @click="scrollLeft" 
      >‹</button>

      <!-- Carril de tarjetas -->
      <div class="carousel-track" ref="track">
        <div
          v-for="(card, index) in tarjetas"
          :key="index"
          class="benefit-card"
          :class="{ active: index === activeIndex }"
          :ref="el => tarjetaRefs[index] = el"
        >
          <!-- Tarjeta doble (2 enlaces) -->
          <div v-if="card.linkLeft && card.linkRight" class="benefit-link split">
            <a :href="card.linkLeft" target="_blank" class="half-link left"></a>
            <a :href="card.linkRight" target="_blank" class="half-link right"></a>
            <div class="benefit-image" :style="{ backgroundImage: 'url(' + card.imagen + ')' }"></div>
          </div>

          <!-- Tarjeta simple -->
          <a v-else :href="card.link" target="_blank" rel="noopener" class="benefit-link">
            <div class="benefit-image" :style="{ backgroundImage: 'url(' + card.imagen + ')' }"></div>
          </a>
        </div>
      </div>

      <!-- Botón derecho -->
      <button 
        class="nav-arrow right" 
        @click="scrollRight" 
      >›</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselTarjetas",
  data() {
    return {
      activeIndex: 0,           // Índice actual activo
      tarjetaRefs: [],          // Refs de cada tarjeta
      observer: null,           // Observador para detectar la tarjeta visible
      tarjetas: [               // Lista de tarjetas con sus imágenes y enlaces
        {
          imagen: "/images/img/banner/TENDA.png",
          link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=tenda"
        },
        {
          imagen: "/images/img/banner/GENIUS.png",
          link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=GENIUS"
        },
        {
          imagen: "/images/img/banner/DIGITALPOS.png",
          link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=pos"
        },
        {
          imagen: "/images/img/banner/WATTANA.png",
          link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=WATTANA"
        },
        {
          imagen: "/images/img/banner/LOGITECH.png",
          link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=LOGITECH"
        },
        {
          imagen: "/images/img/banner/TEROSORIGAMI.png",
          linkLeft: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=TEROS",
          linkRight: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=ORIGAMI"
        }
      ]
    };
  },
  methods: {
    // Navega a la tarjeta anterior
    scrollLeft() {
      if (this.activeIndex > 0) {
        this.activeIndex = this.activeIndex - 1;
        this.scrollToActive();
      }
    },

    // Navega a la tarjeta siguiente
    scrollRight() {
      if (this.activeIndex < this.tarjetas.length - 1) {
        this.activeIndex = this.activeIndex + 1;
        this.scrollToActive();
      }
    },

    // Centra visualmente la tarjeta activa
    scrollToActive() {
      this.$nextTick(() => {
        const tarjetaActiva = this.tarjetaRefs[this.activeIndex];
        if (tarjetaActiva) {
          tarjetaActiva.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
      });
    },

    // Detecta qué tarjeta está visible con IntersectionObserver
    setupObserver() {
      if (this.observer) this.observer.disconnect();
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = this.tarjetaRefs.indexOf(entry.target);
              if (index !== -1) this.activeIndex = index;
            }
          });
        },
        { root: this.$refs.track, threshold: 0.6 }
      );
      this.tarjetaRefs.forEach((el) => {
        if (el) this.observer.observe(el);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setupObserver();
    });
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  }
};
</script>
<style scoped>
/* Contenedor principal */
.carousel-wrapper {
  background: #f2f6f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  max-width: 1840px;
  margin: 0 auto;
  padding: 20px;
}

/* Encabezado del carrusel */
.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.carousel-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

/* Puntos indicadores */
.dots-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ccc;
  transition: background 0.3s;
}

.dot.active {
  background: #3483fa;
}

/* Controles del carrusel */
.carousel-controls {
  position: relative;
  display: flex;
  align-items: center;
}

/* Botones de navegación */
.nav-arrow {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 40px;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, opacity 0.3s ease;
  z-index: 2;
}

.nav-arrow:hover {
  background: #9ce3ec;
}

/* Carril de tarjetas */
.carousel-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 10px 0;
  flex: 1;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

/* Tarjeta de marca */
.benefit-card {
  flex: 0 0 380px;
  scroll-snap-align: start;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

/* Elevación cuando está activa */
.benefit-card.active {
  transform: translateY(-20px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

/* Enlace completo o dividido */
.benefit-link,
.benefit-link.split {
  display: block;
  width: 100%;
  height: 400px;
  text-decoration: none;
  color: inherit;
  position: relative;
}

/* Imagen dentro de la tarjeta */
.benefit-image {
  height: 400px;
  background-size: cover;
  background-position: center;
}

/* Enlaces divididos (50/50) */
.half-link {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .benefit-card {
    flex: 0 0 80%;
  }
  .benefit-image {
    height: 180px;
  }
}
</style>
