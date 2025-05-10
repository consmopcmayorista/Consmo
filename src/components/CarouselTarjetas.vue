<template>
  <!-- Contenedor principal del carrusel -->
  <div class="carousel-wrapper">
    <h2 class="">
      <STRong>
        Nuestras Marcas Aliadas
      </STRong>
    </h2>
    <!-- Botón izquierdo -->
    <button class="nav-btn prev" @click="prev">‹</button>

    <!-- Botón derecho -->
    <button class="nav-btn next" @click="next">›</button>

    <!-- Carril de tarjetas scrollable -->
    <div class="carousel-track" ref="track">
      <div
        v-for="(card, index) in tarjetas"
        :key="index"
        class="card custom-card"
        :class="{ active: index === activeIndex }"
        ref="tarjeta"
      >
        <!-- Tarjeta doble con enlaces separados -->
        <div
          v-if="card.linkLeft && card.linkRight"
          class="image-container"
          :style="{ backgroundImage: 'url(' + card.imagen + ')' }"
        >
          <a
            :href="card.linkLeft"
            target="_blank"
            rel="noopener"
            class="half left"
          ></a>
          <a
            :href="card.linkRight"
            target="_blank"
            rel="noopener"
            class="half right"
          ></a>
        </div>

        <!-- Tarjeta normal -->
        <a
          v-else-if="card.link"
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
      activeIndex: 0,
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
    next() {
      this.activeIndex = (this.activeIndex + 1) % this.tarjetas.length;
      this.scrollToActive();
    },
    prev() {
      this.activeIndex =
        (this.activeIndex - 1 + this.tarjetas.length) % this.tarjetas.length;
      this.scrollToActive();
    },
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
    this.scrollToActive();
  }
};
</script>

<style scoped>
.carousel-wrapper {
  position: relative;
  width: 100%;           /* antes era 90% */
  max-width: 1400px;     /* antes era 1200px */
  margin: 40px auto;
  overflow: hidden;
  padding: 0 30px;       /* más espacio interno */
}


.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 20px;
  padding: 10px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.carousel-track::-webkit-scrollbar {
  display: none;
}

.custom-card {
  flex: 0 0 30%;
  height: auto;
  transition: transform 0.4s ease;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.custom-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card-body {
  padding: 0;
}

.custom-card.active {
  transform: translateY(-25px);
  overflow: hidden;
}

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

.invisible-card {
  flex: 0 0 30%;
  pointer-events: none;
  background: transparent;
  box-shadow: none;
  visibility: hidden;
}

/* 🔄 Responsive ajustes */
@media (max-width: 1024px) {
  .custom-card {
    flex: 0 0 45%;
  }
}

@media (max-width: 768px) {
  .custom-card {
    flex: 0 0 80%;
  }
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
}

.half {
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
</style>
