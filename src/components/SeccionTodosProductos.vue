<template>
  <section class="todos-productos">
    <div class="contenedor">
      <header class="titulo-bloque">
        <h2>Todos nuestros productos</h2>
        <p>Explora el catálogo completo de Consmo PC Mayorista.</p>
      </header>

      <!-- GRID DE PRODUCTOS -->
      <div class="grid-productos">
        <article
          v-for="producto in productosVisibles"
          :key="producto.id || producto.ID || producto.sku"
          class="card-producto"
        >
          <img
            :src="producto.imagen || producto.foto || producto.image"
            :alt="producto.descripcion || producto.titulo"
          />
<div class="card-body">
  <h3>{{ producto.descripcion || producto.titulo }}</h3>

  <!-- SKU -->
  <p v-if="producto.sku" class="sku">
    SKU: {{ producto.sku }}
  </p>

  <!-- Sedes donde está disponible -->
  <p v-if="producto.sedes" class="sedes">
  <span class="sedes-icon">✓</span>
  <span class="sedes-text">{{ producto.sedes }}</span>
</p>

  <p class="precio">
    $ {{ formatearPrecio(producto.precio || producto.price) }}
  </p>

  <a
    class="btn-ver"
    :href="
      producto.link ||
      producto.url ||
      ('/producto?producto=' + (producto.ID || producto.id))
    "
  >
    Ver producto
  </a>
</div>

        </article>
      </div>

      <!-- BOTÓN VER MÁS -->
      <div class="acciones" v-if="itemsToShow < productos.length">
        <button class="btn-ver-mas" @click="verMas">
          Ver más productos
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  productos: {
    type: Array,
    required: true
  }
})

const itemsToShow = ref(20) // mostramos 20 al inicio

// Solo mostramos los primeros "itemsToShow"
const productosVisibles = computed(() =>
  props.productos.slice(0, itemsToShow.value)
)

function verMas () {
  const paso = 20
  if (itemsToShow.value + paso >= props.productos.length) {
    itemsToShow.value = props.productos.length
  } else {
    itemsToShow.value += paso
  }
}

function formatearPrecio (valor) {
  if (!valor && valor !== 0) return ''
  return new Intl.NumberFormat('es-CO').format(Number(valor))
}
</script>

<style scoped>
.todos-productos {
  padding: 3rem 0 4rem;
  background: #f7f9fc;
}

.contenedor {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem 3rem;
}

.titulo-bloque {
  text-align: center;
  margin-bottom: 2rem;
}

.titulo-bloque h2 {
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.titulo-bloque p {
  color: #555;
}

/* 🧱 GRID: 5 columnas en escritorio, responsive hacia abajo */
.grid-productos {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr)); /* 5 columnas */
  gap: 1.5rem;
}

/* 4 columnas en pantallas grandes pero no tan anchas */
@media (max-width: 1200px) {
  .grid-productos {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* 3 columnas en tablets */
@media (max-width: 992px) {
  .grid-productos {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

/* 2 columnas en móviles grandes */
@media (max-width: 768px) {
  .grid-productos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* 1 columna en móviles pequeños */
@media (max-width: 480px) {
  .grid-productos {
    grid-template-columns: 1fr;
  }
}

/* 🎴 Tarjetas de producto */
.card-producto {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card-producto:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.15);
}

.card-producto img {
  width: 100%;
  height: 240px;        /* 🔹 antes 210px */
  object-fit: contain;
  background: #f5f7fb;
  padding: 14px;
}

/* Ajuste para que en pantallas más pequeñas no quede tan alta */
@media (max-width: 1200px) {
  .card-producto img {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .card-producto img {
    height: 200px;
  }
}

.card-body {
  padding: 0.8rem 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;        /* antes era más grande */
  flex: 1;
}


.card-body h3 {
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.3;
  min-height: 3.4em;   /* un poco más alto para alinear las filas */
  margin-bottom: 0.1rem;
}

.sku {
  font-size: 0.78rem;
  font-weight: 700;
  color: #16a34a;
  margin: 0;           /* sin extra espacio */
}

.sedes {
  font-size: 0.78rem;
  color: #111827;
  margin: 0;           /* sin extra espacio */
}

/* 👇 NUEVO: el chulo va aquí */
.sedes::before {
  content: " ";
  font-weight: 700;
}

.precio {
  font-weight: 700;
  font-size: 0.98rem;
  color: #0052ff;
  margin-top: 0.2rem;  /* pegadita al bloque superior */
}

/* Botón dentro de la tarjeta */
.btn-ver {
  margin-top: auto;
  align-self: flex-start;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.8rem;
  text-decoration: none;
  border: none;
  background: linear-gradient(135deg, #000cff, #002694);
  color: #fff;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.btn-ver:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

/* Contenedor del botón "Ver más productos" */
.acciones {
  margin-top: 2.5rem;
  text-align: center;
}

.btn-ver-mas {
  padding: 0.75rem 2.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: #111827;
  color: #ffffff;
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
}

.btn-ver-mas:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.5);
}
</style>
