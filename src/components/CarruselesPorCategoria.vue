<template>
  <div class="section_padding_b bg-blue text-dark" v-if="productosFiltrados.length">
    <!-- Contenedor personalizado para hacer el carrusel más angosto -->
    <div class="carrusel-wrapper px-3 px-sm-4 px-md-5 position-relative pb-5 carrusel-full">
      <!-- Encabezado del carrusel con título y botón "Ver todos" -->
      <div class="d-flex justify-content-between align-items-center mb-4 encabezado-carrusel flex-wrap gap-2">
  <h2 class="section_title_3 mb-0">
     {{ titulo || (categoria.charAt(0).toUpperCase() + categoria.slice(1)) }}
  </h2>

  <RouterLink
    :to="linkVerTodos"
    class="btn btn-outline-primary btn-sm"
  >
    Ver productos relacionados
  </RouterLink>
</div>

      <!-- Carrusel Swiper dinámico -->
      <div class="swiper-wrapper-container">
        <swiper
          :modules="[Navigation]"
          :navigation="showNavigation"  
          :slides-per-view="2"
          :space-between="16"
          :breakpoints="{
            320: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 }
          }"
          class="carrusel-swiper"
        >
          <swiper-slide
            v-for="(producto, index) in productosFiltrados"
            :key="categoria + '-' + index"
          >
            <div class="futuristic-card">
              <div class="card-badge" v-if="producto.descuento">-{{ producto.descuento }}%</div>
              <div class="card-badge new" v-if="producto.nuevo">¡Nuevo!</div>
              <div class="image-container">
                <img :src="producto.imagen" :alt="producto.titulo" loading="lazy" />
              </div>
              <div class="info-container">
                <h6 class="title" :title="producto.titulo">{{ producto.titulo }}</h6>
                <p class="sku">SKU: {{ producto.idpro }}</p>
                <p class="stock">✔ {{ producto.existencia }}</p>
                <div class="price-group">
                  <span class="old-price" v-if="producto.precioAnterior">
                    ${{ Math.round(parseFloat(producto.precioAnterior)).toLocaleString('es-CO') }}
                  </span>
                  <span class="current-price">
                    ${{ Math.round(parseFloat(producto.pt1)).toLocaleString('es-CO') }}
                  </span>
                </div>
              </div>
              <div class="cta-container">
                <button class="cta-button" @click.stop="buscarProducto(producto.id)">Ver más</button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { RouterLink } from 'vue-router'

const props = defineProps({
  productos: {
    type: Array,
    default: () => []
  },
  // 1 sola categoría (modo viejo)
  categoria: {
    type: String,
    default: ''
  },
  // VARIAS categorías (modo Tendencia)
  categorias: {
    type: Array,
    default: () => []
  },
  titulo: {
    type: String,
    default: ''
  },
  buscarProducto: {
    type: Function,
    default: null
  },
  formatLine: {
    type: Function,
    default: null
  },
  // 👇 NUEVA prop opcional por si luego quieres forzar un link distinto
  linkVerTodos: {
    type: String,
    default: ''
  }
})

const normalizar = (str) => {
  if (!str) return ''
  return String(str).trim().toUpperCase()
}

// 🔹 Filtra SOLO por la categoría del producto (linea/categoria)
const productosFiltrados = computed(() => {
  const lista = props.productos || []

  // Si hay varias categorías → usamos esas
  // Si no, usamos la categoría única
  const cats = (props.categorias && props.categorias.length
    ? props.categorias
    : (props.categoria ? [props.categoria] : [])
  ).map(normalizar)

  // Si no hay ninguna categoría, devolvemos todo
  if (!cats.length) return lista

  // Filtramos productos que tengan linea/categoria dentro del grupo
  return lista.filter((p) => {
    const cruda = p.linea || p.categoria || ''
    const linea = normalizar(cruda)
    return cats.includes(linea)
  })
})

const multiCategoriasLink = computed(() => {
  // 1) Si nos pasan linkVerTodos explícito, lo usamos
  if (props.linkVerTodos) {
    return props.linkVerTodos
  }

  // 2) Si hay varias categorías → mandamos todas en un solo parámetro
  if (props.categorias && props.categorias.length) {
    const joined = props.categorias
      .map(c => encodeURIComponent(c))
      .join(',')
    return `/catalogo_cat?categorias=${joined}`
  }

  // 3) Si hay una sola categoría (modo antiguo)
  if (props.categoria) {
    return `/catalogo_cat?categoria=${encodeURIComponent(props.categoria)}`
  }

  // 4) Sin categoría → catálogo general (por si acaso)
  return '/catalogo'
})

const textoBoton = computed(() => {
  // Personalízalo a tu gusto
  return 'Ver todos'
})

// 🔗 Link para el botón "Ver todos"
const linkVerTodos = computed(() => {
  // 1) Caso Tendencia: varias categorías (props.categorias)
  if (Array.isArray(props.categorias) && props.categorias.length > 0) {
    // Normalizamos un poco el texto
    const lista = props.categorias
      .map(c => c.toString().trim().toUpperCase())
      .filter(Boolean)

    return {
      path: '/catalogo_cat',
      query: {
        // ejemplo: "PARLANTES,CABINAS,COMPUTADORES NUEVOS"
        categorias: lista.join(',')
      }
    }
  }

  // 2) Caso normal: una sola categoría (Monitores, Artículos y Accesorios)
  if (props.categoria) {
    const cat = props.categoria.toString().trim().toUpperCase()
    return {
      path: '/catalogo_cat',
      query: {
        categoria: cat
      }
    }
  }

  // 3) Sin nada → catálogo general
  return { path: '/catalogo_cat' }
})

const showNavigation = ref(true)

const handleResize = () => {
  showNavigation.value = window.innerWidth >= 768
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const modules = [Navigation]
</script>

<style scoped>
.carrusel-wrapper {
  max-width: 1540px;
  margin: 0 auto;
}

/* 🔧 Nuevo: fuerza altura uniforme en el carrusel */
.swiper-slide {
  display: flex;
  height: auto !important;
}

/* 🔧 Ajuste principal: tarjeta ocupa toda la altura del slide */
.futuristic-card {
  border-radius: 16px;
  color: #070707;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 20px #000000;
  transition: transform 0.3s ease;
  position: relative;
  height: 100%;
  min-height: 0;
  padding: 1rem;
}

.futuristic-card:hover {
  transform: translateY(-6px);
}

.card-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 2;
}
.card-badge.new {
  left: auto;
  right: 10px;
}

.image-container {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 1rem;
}
.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.info-container {
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/* 🔧 Controla el alto máximo del título y fuerza uniformidad */
.title {
  font-weight: bold;
  font-size: 0.95rem;
  line-height: 1.2;
  min-height: 2.4em;
  max-height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-bottom: 0.5rem;
}

.sku {
  font-size: 0.99rem;
  font-weight: bold;
  color: #02471d;
  margin-bottom: 0.25rem;
}

.stock {
  font-size: 0.89rem;
  color: #060706;
  margin-bottom: 0.5rem;
}

.price-group {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.old-price {
  text-decoration: line-through;
  color: #bbb;
  font-size: 0.85rem;
}

.current-price {
  color: #000708;
  font-weight: bold;
  font-size: 1rem;
}

.cta-container {
  display: flex;
  justify-content: center;
  margin-top: auto;
}

.cta-button {
  background: hsl(224, 99%, 26%);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

</style>
