<template>
  <section class="product-page py-5">
    <div class="container">
      <!-- ✅ MENSAJE flotante tras agregar al carrito -->
      <transition name="fade">
        <div v-show="mensajeVisible" class="mensaje-flotante alert alert-success shadow">
          ✅ {{ mensajeTexto }}
        </div>
      </transition>

      <!-- 🧩 Vista principal del producto -->
      <div class="row g-5">
        <!-- 🖼️ Galería + Zoom -->
        <div class="col-lg-6 position-relative">
          <div class="zoom-container">
            <img
              :src="imagenMostrada"
              alt="Producto"
              class="img-fluid rounded shadow zoomable-image w-100"
              @click="mostrarModal = true"
              @load="imagenCargada = true"
              @error="imagenCargada = false"
            />
            <div class="zoom-result"></div>
          </div>

          <!-- Miniaturas -->
          <div class="d-flex gap-2 mt-3 flex-wrap">
            <img
              v-if="producto_mostrar?.imagen"
              :src="producto_mostrar.imagen"
              @click="cambiarImagen(producto_mostrar.imagen)"
              class="img-thumbnail thumb-img"
            />
            <img
              v-for="(url, i) in producto_mostrar?.lista_imagenes?.split(',')"
              :key="i"
              :src="url.trim()"
              @click="cambiarImagen(url.trim())"
              class="img-thumbnail thumb-img"
            />
          </div>
        </div>

        <!-- 📝 Info + precio + agregar -->
        <div class="col-lg-6">
          <h2 class="fw-bold mb-3">{{ producto_mostrar?.titulo }}</h2>
          <BarraPopularidad class="mb-3" />

          <ul class="list-unstyled mb-4 text-muted">
            <li>
              <strong>Disponibilidad:</strong>
              <!-- Mostramos lo que llega crudo desde API (string de sedes o número), para transparencia -->
              <span class="text-success fw-bold">✔ {{ mostrarDisponibilidad }}</span>
            </li>
            <li><strong>Marca:</strong> {{ producto_mostrar?.marca }}</li>
            <li><strong>Categoría:</strong> {{ producto_mostrar?.linea }}</li>
            <li><strong>SKU:</strong> {{ producto_mostrar?.idpro }}</li>
          </ul>

          <h3 class="text-primary fw-bold display-6 mb-3">
            ${{ Math.round(parseFloat(producto_mostrar?.pt1 || 0)).toLocaleString('es-CO') }}
          </h3>

          <!-- Cantidad (misma UI) -->
          <div class="d-flex align-items-center mb-4">
            <button class="btn btn-outline-secondary" @click="decrementar">-</button>
            <div id="cantidades_producto" class="px-3 fs-5" :value="cantidades">{{ cantidades }}</div>
            <button
              class="btn btn-outline-secondary"
              @click="incrementar"
              :title="maximo > 0 ? ('Máximo ' + maximo) : 'Sin stock'"
            >+</button>
          </div>

          <!-- Agregar al carrito (mantengo tu onclick global) -->
          <button class="btn btn-primary px-4 py-2 mb-4" onclick="agregar_producto_car();">
            <i class="icon-cart me-2"></i> Agregar al carrito
          </button>

          <!-- Hidden inputs (tu lógica original) -->
          <input type="hidden" id="item_producto" :value="producto_mostrar?.id">
          <input type="hidden" id="detalle" :value="producto_mostrar?.titulo">
          <input type="hidden" id="precio" :value="producto_mostrar?.pt1">
          <input type="hidden" id="foto" :value="producto_mostrar?.imagen">
          <input type="hidden" id="tags" :value="producto_mostrar?.idpro">

          <!-- 🔑 Enviamos el tope real al main.js (para otras vistas que lean #cantidadesx) -->
          <input type="hidden" id="cantidadesx" :value="maximo">

          <!-- Descripción -->
          <div class="mt-4">
            <h5 class="fw-bold">Descripción del producto</h5>
            <p class="text-muted">{{ producto_mostrar?.detalle }}</p>
          </div>
        </div>
      </div>

      <!-- 🔁 Relacionados -->
      <div v-if="relacionados.length" class="mt-5">
        <h4 class="fw-bold mb-3">También te puede interesar</h4>
        <div class="related-carousel d-flex gap-3 overflow-auto">
          <div
            v-for="prod in relacionados"
            :key="prod.id"
            class="related-card flex-shrink-0"
            @click="navegarAProducto(prod.id)"
          >
            <img :src="prod.imagen" :alt="prod.titulo" class="related-img" />
            <div class="pt-2 text-center">
              <h6 class="fw-semibold small mb-1">{{ prod.titulo }}</h6>
              <p class="text-muted small mb-1">{{ prod.linea }}</p>
              <span class="text-primary fw-bold small">
                ${{ Math.round(parseFloat(prod.pt1 || 0)).toLocaleString('es-CO') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import BarraPopularidad from '@/components/BarraPopularidad.vue'

const router = useRouter()
const route = useRoute()

// === Estado original ===
const producto_mostrar = ref(null)
const imagenMostrada = ref('')
const cargando = ref(false)
const cantidades = ref(1)
const imagenCargada = ref(false)
const relacionados = ref([])
const mensajeVisible = ref(false)
const mensajeTexto = ref('')
const mostrarModal = ref(false)

// 🔒 Tope real que controla el “+”
const maximo = ref(0)

/* ==========================
   Helpers de existencia/stock
   ========================== */

/** Suma "Sede:2,Otra:3" -> 5 (ignora segmentos sin número) */
function sumarExistencias(str) {
  if (!str || typeof str !== 'string') return 0
  return str.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .reduce((acc, tok) => {
      const n = parseInt((tok.split(':')[1] || ''), 10)
      return acc + (Number.isFinite(n) ? n : 0)
    }, 0)
}

/** Extrae un número válido desde distintos formatos (string con sedes, texto con números, o número directo) */
function parseExistenciaValue(val) {
  if (val == null) return 0
  if (typeof val === 'number') return val > 0 ? val : 0
  if (typeof val === 'string' && val.includes(':')) {
    const t = sumarExistencias(val)
    if (t > 0) return t
  }
  if (typeof val === 'string') {
    const nums = val.match(/\d+/g)
    if (nums && nums.length) {
      const total = nums
        .map(n => parseInt(n, 10))
        .filter(n => Number.isFinite(n))
        .reduce((a, b) => a + b, 0)
      if (total > 0) return total
    }
  }
  return 0
}

/** Calcula el tope priorizando existencia2, luego existencia */
function calcularTope(prod) {
  const candidatos = [prod?.existencia2, prod?.existencia]
  for (const c of candidatos) {
    const t = parseExistenciaValue(c)
    if (t > 0) return t
  }
  return 0
}

/* ========= Fallback: si el detalle NO trae stock usable, lo buscamos en el catálogo general ========= */
async function fallbackTopeDesdeCatalogo(idProducto) {
  try {
    const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=consmopcmayorista.com&id=24`
    const { data } = await axios.get(url)
    const lista = Array.isArray(data?.productos) ? data.productos : []
    const found = lista.find(p => String(p.id) === String(idProducto))
    if (!found) return 0
    // del catálogo general hemos visto que sí trae bien existencia2 / existencia
    const tope = calcularTope(found)
    return tope
  } catch (e) {
    console.error('Fallback stock error:', e)
    return 0
  }
}

/* ==========================
   UI cantidad (misma visual)
   ========================== */
function incrementar() {
  const tope = Number(maximo.value) || 0
  if (tope <= 0) return // sin stock -> no sube
  if (cantidades.value < tope) cantidades.value++
}
function decrementar() {
  if (cantidades.value > 1) cantidades.value--
}

/* ==========================
   Galería
   ========================== */
function cambiarImagen(url) { imagenMostrada.value = url }

/* ==========================
   API: producto y relacionados
   ========================== */
async function fetchProducto() {
  try {
    cargando.value = true
    const id = route.query.producto
    if (!id) return

    const { data } = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_inv.php?id=${id}`
    )

    if (data.producto?.length > 0) {
      const p = data.producto[0]
      producto_mostrar.value = p
      imagenMostrada.value = p.imagen || ''

      // 1) Intento principal: tope desde el detalle
      let tope = calcularTope(p)

      // 2) Fallback: si no hay números útiles, tomamos del catálogo general (que sí trae bien)
      if (!tope || tope < 1) {
        tope = await fallbackTopeDesdeCatalogo(p.id)
      }

      maximo.value = Number(tope) || 0

      // Aseguramos que la cantidad visible no supere el tope
      const t = Number(maximo.value) || 0
      cantidades.value = Math.min(cantidades.value, Math.max(1, t || 1))

      // DEBUG: mira en consola qué llega y qué tope calculó
      console.log('[STOCK DEBUG] det.existencia2:', p.existencia2, ' det.existencia:', p.existencia, ' => tope:', maximo.value)

      fetchRelacionados(p.linea, p.id)
    } else {
      maximo.value = 0
      cantidades.value = 1
    }
  } catch (error) {
    console.error('Error al obtener producto:', error)
    maximo.value = 0
    cantidades.value = 1
  } finally {
    cargando.value = false
  }
}

async function fetchRelacionados(categoria, idExcluido) {
  try {
    const res = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=consmopcmayorista.com&id=24`
    )
    relacionados.value = (res.data.productos || [])
      .filter(p => p.linea === categoria && p.id !== idExcluido)
      .slice(0, 10)
  } catch (e) {
    console.error('Error al obtener relacionados:', e)
  }
}

/* ==========================
   Navegación y mensaje
   ========================== */
function navegarAProducto(id) {
  router.push({ name: 'producto', query: { producto: id } })
}

window.mensaje_add_car = (descripcion, id, operacion, cant) => {
  mensajeTexto.value = `Se ha ${operacion} ${cant} ${descripcion} al carrito.`
  mensajeVisible.value = true
  setTimeout(() => (mensajeVisible.value = false), 3000)
}

/* ==========================
   Derivado para mostrar disponibilidad tal cual llega
   ========================== */
const mostrarDisponibilidad = computed(() => {
  const p = producto_mostrar.value || {}
  return p.existencia2 || p.existencia || '0'
})

/* ==========================
   Lifecycle
   ========================== */
watch(() => route.query.producto, async (nuevo, viejo) => {
  if (nuevo && nuevo !== viejo) {
    cantidades.value = 1
    await fetchProducto()
    window.scrollTo({ top: 0 })
  }
})

onMounted(async () => {
  await fetchProducto()

  // (opcional) zoom simple
  const zoomContainer = document.querySelector('.zoom-container')
  const zoomResult = document.querySelector('.zoom-result')
  if (!zoomContainer || !zoomResult) return
  const zoomImage = document.createElement('img')
  zoomImage.style.position = 'absolute'
  zoomImage.style.width = '1000px'
  zoomImage.style.height = 'auto'
  zoomImage.style.pointerEvents = 'none'
  zoomImage.style.userSelect = 'none'
  zoomResult.innerHTML = ''
  zoomResult.appendChild(zoomImage)
  zoomContainer.addEventListener('mouseenter', () => {
    const mainImg = zoomContainer.querySelector('img.zoomable-image')
    if (!mainImg?.src) return
    zoomImage.src = mainImg.src
    zoomResult.style.display = 'block'
  })
  zoomContainer.addEventListener('mousemove', (e) => {
    const rect = zoomContainer.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPercent = (x / rect.width) * 150
    const yPercent = (y / rect.height) * 170
    zoomImage.style.transformOrigin = `${xPercent}% ${yPercent}%`
    zoomImage.style.transform = 'scale(2)'
  })
  zoomContainer.addEventListener('mouseleave', () => {
    zoomResult.style.display = 'none'
    zoomImage.style.transform = 'none'
  })
})
</script>

<style scoped>
.mensaje-flotante {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.thumb-img { width: 80px; height: 80px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s ease-in-out; }
.thumb-img:hover { border-color: #0d6efd; }
.zoomable-image { max-height: 500px; object-fit: contain; border-radius: 10px; transition: transform 0.3s ease; cursor: zoom-in; }
.zoom-container { position: relative; display: inline-block; cursor: zoom-in; }
.zoom-result { position: absolute; top: 0; left: 105%; width: 800px; height: 600px; overflow: hidden; border: 2px solid #ccc; background: white; display: none; z-index: 999; }
.related-carousel { padding-bottom: 1rem; scrollbar-width: none; -ms-overflow-style: none; display: flex; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.related-carousel::-webkit-scrollbar { display: none; }
.related-card { width: 140px; flex-shrink: 0; background-color: white; border-radius: 10px; padding: 10px; transition: transform 0.2s ease; cursor: pointer; }
.related-card:hover { transform: scale(1.05); }
.related-img { width: 100%; height: 90px; object-fit: contain; border-radius: 6px; background-color: #f9f9f9; }
@media (min-width: 576px){ .related-card{width:160px}.related-img{height:100px} }
@media (min-width: 768px){ .related-card{width:180px}.related-img{height:110px} }
@media (min-width: 992px){ .related-card{width:200px}.related-img{height:120px} }
</style>
