<template>
    <!-- Contenedor principal del carrusel -->
    <div class="carousel-wrapper">
      <!-- Botón izquierdo -->
      <button class="nav-btn prev" @click="prev">‹</button>
  
      <!-- Botón derecho -->
      <button class="nav-btn next" @click="next">›</button>
  
      <!-- Carril de tarjetas scrollable -->
    <div class="carousel-track" ref="track">
        <!-- Recorremos cada tarjeta -->
        <div
          v-for="(card, index) in tarjetas"
          :key="index"
          class="card custom-card"
          :class="{ active: index === activeIndex }"
          ref="tarjeta"
          >
          <!-- Enlace externo en toda la imagen -->
          <a
              v-if="card.link"
              :href="card.link"
              target="_blank"
              rel="noopener"
              class="card-link"
          >
              <img :src="card.imagen" alt="Imagen tarjeta" />
          </a>
          </div>  
        </div>    
    </div>      
  </template>
  
  <script>
  export default {
    name: "CarouselTarjetas",
    data() {
      return {
        // Índice de la tarjeta actualmente levantada
        activeIndex: 0,
  
        // Tarjetas definidas manualmente con imágenes locales
        tarjetas: [
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
            link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=DIGITAL+POS"
          },
          {
            imagen: "/images/img/banner/WATTANA.png",
            link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=WATTANA"
          },
          {
            imagen: "/images/img/banner/LOGITECH.png",
            link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=LOGITECH"
          },
        ]
      };
    },

    methods: {
      // Mover al siguiente índice
      next() {
        this.activeIndex = (this.activeIndex + 1) % this.tarjetas.length;
        this.scrollToActive();
      },
  
      // Mover al índice anterior
      prev() {
        this.activeIndex =
          (this.activeIndex - 1 + this.tarjetas.length) % this.tarjetas.length;
        this.scrollToActive();
      },
  
      // Llevar la tarjeta activa al centro visible y levantarla
      scrollToActive() {
        this.$nextTick(() => {
          const tarjetaActiva = this.$refs.tarjeta[this.activeIndex];
          if (tarjetaActiva) {
            tarjetaActiva.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest"
            });
          }
        });
      }
    },
    mounted() {
      // Al cargar, asegurarse de enfocar la primera tarjeta
      this.scrollToActive();
    }
  };
  </script>
  
  <style scoped>
  /* Estilo general del contenedor */
  .carousel-wrapper {
    position: relative;
    width: 90%; /* ahora ocupa todo el ancho */
    margin: 40px auto;
    overflow: hidden;
    padding: 0 20px; /* menos padding lateral */
}
  
  /* Carril horizontal de tarjetas */
  .carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 20px;
    padding: 10px;
    scrollbar-width: none;
  }
  .carousel-track::-webkit-scrollbar {
    display: none;
  }
  
  /* Estilo general de cada tarjeta */
  .custom-card {
    min-width: 30%;
    height: auto; /* altura automática basada en contenido */
    transition: transform 0.4s ease;
    background: #fff;
    /*border: 2px solid #007bff; /* borde azul */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    overflow: hidden; /* para que la imagen no se salga */
    display: flex;
    flex-direction: column;
    
}
  
  /* Imagen dentro de la tarjeta */
  .custom-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  /* Contenido dentro de la tarjeta */
  .card-body {
    padding: 0;
  }
  
  /* Tarjeta activa se "levanta" */
  .custom-card.active {
    transform: translateY(-25px);
    overflow: hidden;
  }
  
  /* Botones de navegación */
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: #007bff;
    border: none;
    color: #fff;
    font-size: 24px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
  }
  .nav-btn.prev {
    left: 0;
  }
  .nav-btn.next {
    right: 0;
  }
  
  /* Espaciador invisible al final */
  .invisible-card {
    min-width: 30%;
    pointer-events: none;
    background: transparent;
    box-shadow: none;
    visibility: hidden;
  }
  
  /* Adaptar para móviles */
  @media (max-width: 768px) {
    .custom-card {
      min-width: 90%;
    }
  }
  </style>
  
  