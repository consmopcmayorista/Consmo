<template>
  <section class="brands-section">
    <!-- Encabezado elegante -->
    <div class="brands-header">
      <h2 class="brands-title">
        <span>🌟</span> Marcas Aliadas <span>🌟</span>
      </h2>
      <p class="brands-subtitle">Las marcas que potencian tu negocio</p>
    </div>

    <!-- Tarjetas fijas -->
    <div class="brands-grid">
      <div
        v-for="(card, index) in tarjetas"
        :key="card.imagen"
        class="brand-card"
      >
        <a
          v-if="card.link"
          :href="card.link"
          target="_blank"
          class="brand-card-link"
        >
          <img :src="card.imagen" :alt="'Marca ' + index" class="brand-card-img" />
        </a>
        <div v-else class="brand-card-split">
          <a :href="card.linkLeft" target="_blank" class="split half left"></a>
          <a :href="card.linkRight" target="_blank" class="split half right"></a>
          <img :src="card.imagen" class="brand-card-img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NuevoCarouselMarcasAliadas",
  data() {
    return {
      tarjetas: [
        { imagen: "/images/img/banner/TENDA.png", link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=tenda" },
        { imagen: "/images/img/banner/GENIUS.png", link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=GENIUS" },
        { imagen: "/images/img/banner/DIGITALPOS.png", link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=pos" },
        { imagen: "/images/img/banner/WATTANA.png", link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=WATTANA" },
        { imagen: "/images/img/banner/LOGITECH.png", link: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=LOGITECH" },
        { imagen: "/images/img/banner/TEROSORIGAMI.png", linkLeft: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=TEROS", linkRight: "https://www.consmopcmayorista.com/catalogo_cat?categoria=&busqueda=ORIGAMI" }
      ]
    };
  }
};
</script>

<style scoped>
.brands-section {
  padding: 32px 16px;
  background: linear-gradient(to right, #f9fbfc, #eef4f8);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  max-width: 1800px;
  margin: 0 auto;
}

.brands-header {
  margin-bottom: 24px;
}

.brands-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #222;
}

.brands-subtitle {
  font-size: 1rem;
  color: #555;
  margin-top: 4px;
}

.brands-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
}

.brand-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  width: 280px;
  transition: transform 0.3s;
  position: relative;
}

.brand-card:hover {
  transform: translateY(-6px);
}

.brand-card-img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

.brand-card-split {
  position: relative;
}

.split.half {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 2;
}

.left { left: 0; }
.right { right: 0; }

@media (max-width: 768px) {
  .brands-grid {
    gap: 16px;
  }

  .brand-card {
    width: 90%;
    max-width: 320px;
  }
}
</style>
