<template>
  <!-- breadcrumbs -->
  <div class="container">
    <div class="breadcrumbs">
      <a href="index.html"><i class="las la-home"></i></a>
      <a href="#" class="active">Carrito de Compras</a>
    </div>
  </div>

  <!-- shopping cart -->
  <div class="cart_area section_padding_b">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <h4 class="shop_cart_title sopcart_ttl d-none d-lg-flex">
            <span>Producto</span>
            <span>Cant</span>
            <span>Total Precio</span>
          </h4>

          <div class="shop_cart_wrap">
            <div
              class="single_shop_cart d-flex align-items-center flex-wrap"
              v-for="(dato, index) in ticket"
              :key="`${dato.id}-${index}`"
            >
              <!-- imagen -->
              <div class="cart_img mb-4 mb-md-0">
                <img loading="lazy" :src="dato.foto" alt="product">
              </div>

              <!-- info -->
              <div class="cart_cont">
                <a><h5>{{ dato.descripcion }}</h5></a>
                <p class="price">${{ formatMoney(dato.precio) }}</p>

                <!-- Info de stock (útil para UX / debug) -->
                <small class="text-muted d-block">
                  Stock disponible: <strong>{{ computeTope(dato) }}</strong>
                  <span v-if="!hasTope(dato)">(sin tope informado)</span>
                </small>
                <small v-if="dato.existencia2_raw" class="d-block">
                  <em>sedes:</em> {{ dato.existencia2_raw }}
                </small>
              </div>

              <!-- cantidad -->
              <div class="cart_qnty ms-md-auto">
                <p>Cantidad</p>
                <div class="d-flex align-items-center">
                  <!-- menos -->
                  <div class="cart_qnty_btn" id="menos" @click="decrementar2(dato.id)">
                    <i class="las la-minus"></i>
                  </div>

                  <div class="cart_count" id="cantidades_producto2">
                    {{ obtenerCantidad(dato.id) }}
                  </div>

                  <!-- más (respeta tope) -->
                  <div
                    class="cart_qnty_btn"
                    id="mas"
                    :class="{
                      'opacity-50 pointer-events-none':
                        hasTope(dato) && obtenerCantidad(dato.id) >= computeTope(dato)
                    }"
                    :title="hasTope(dato) ? `Máximo ${computeTope(dato)}` : 'Sin tope informado'"
                    :aria-disabled="hasTope(dato) && obtenerCantidad(dato.id) >= computeTope(dato)"
                    @click="incrementar2(dato.id)"
                  >
                    <i class="las la-plus"></i>
                  </div>
                </div>
              </div>

              <!-- subtotal -->
              <div class="cart_price ms-auto">
                <p>${{ formatMoney(Number(dato.precio) * Number(dato.cant || 0)) }}</p>
              </div>

              <!-- quitar -->
              <div class="cart_remove ms-auto">
                <i class="icon-trash" @click="quitar_item_Carrito(dato.id)"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- resumen -->
        <div class="col-lg-3 mt-4 mt-lg-0">
          <div class="cart_summary">
            <h4>Total a Pagar</h4>

            <div class="cartsum_text d-flex justify-content-between">
              <p class="text-semibold">Subtotal</p>
              <p class="text-semibold">${{ formatMoney(subtotal) }}</p>
            </div>

            <div class="cartsum_text d-flex justify-content-between">
              <p>IVA</p>
              <p>{{ formatMoney(iva) }}</p>
            </div>

            <div class="cart_sum_total d-flex justify-content-between">
              <p>Total</p>
              <p>${{ formatMoney(total) }}</p>
            </div>

            <div class="cart_sum_pros">
              <button onclick="javascript:window.location.href='./confirmacion'">
                Procesar Pago
              </button>
            </div>
          </div>
        </div>

      </div> <!-- row -->
    </div> <!-- container -->
  </div> <!-- cart_area -->
</template>

<script setup>
// =====================================================
// Carrito con control de stock real:
// - Si el item tiene "existencia" (número) se usa como tope.
// - Si no, se calcula desde "existencia2_raw" (p.ej. "Sede:2,Otra:1").
// - Al montar: se refresca stock desde la API y se clampa el carrito.
// =====================================================
import { ref, onMounted } from 'vue'
import axios from 'axios'

// ---------- Config API (tu backend real) ----------
const API_URL = 'https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=consmopcmayorista.com&id=24'

// ---------- Estado ----------
const ticket   = ref([])  // [{ id, descripcion, precio, cant, existencia, existencia2_raw, foto, ... }]
const total    = ref(0)
const subtotal = ref(0)
const iva      = ref(0)

// ---------- Helpers de formato ----------
function formatMoney(val) {
  const n = Number(val) || 0
  return Math.round(n).toString()
    .replace(/\./g, ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

// ---------- Lógica de stock ----------
/** Suma cantidades desde "Sede:2,Otra:1" => 3 (seguro contra vacíos/errores) */
function sumarExistencia2(str) {
  if (!str || typeof str !== 'string') return 0
  return str.split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .reduce((acc, tok) => {
      const n = parseInt((tok.split(':')[1] || ''), 10)
      return acc + (Number.isFinite(n) ? n : 0)
    }, 0)
}

/** Tope usable:
 *  1) si item.existencia > 0, úsalo
 *  2) si no, suma item.existencia2_raw
 *  3) si nada aplica, Infinity (sin tope -> no bloquea +)
 */
function computeTope(item) {
  const byField = Number(item?.existencia)
  if (Number.isFinite(byField) && byField > 0) return byField

  const byRaw = sumarExistencia2(item?.existencia2_raw || '')
  if (byRaw > 0) return byRaw

  return Infinity
}
function hasTope(item) {
  return Number.isFinite(computeTope(item))
}

/** Carga carrito desde localStorage */
function loadTicketFromStorage() {
  try {
    const raw = localStorage.getItem('ticket')
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed?.productos) ? parsed.productos : []
  } catch (e) {
    console.warn('ticket corrupto en localStorage', e)
    return []
  }
}

/** Guarda carrito en localStorage */
function saveTicketToStorage() {
  localStorage.setItem('ticket', JSON.stringify({ productos: ticket.value }))
}

/** Totales (IVA 19%) */
function actualizarTotales() {
  const tot = ticket.value.reduce((acc, it) => {
    const precio = Number(it.precio) || 0
    const cant   = Number(it.cant)   || 0
    return acc + (precio * cant)
  }, 0)
  total.value    = tot
  subtotal.value = tot / 1.19
  iva.value      = tot - subtotal.value
}

/** Usa el producto del API para hidratar existencias del ítem del carrito */
function normalizeStockFromProduct(apiProduct) {
  // El API trae: { id, existencia, existencia2, ... }
  const raw = apiProduct?.existencia2 || ''
  const totalRaw = sumarExistencia2(raw)
  const totalField = Number(apiProduct?.existencia) || 0
  const total = totalField > 0 ? totalField : totalRaw
  return {
    existencia: total,
    existencia2_raw: raw
  }
}

/** Refresca existencias del carrito desde la API oficial */
async function hydrateExistenciasFromAPI() {
  if (!ticket.value.length) return
  try {
    const { data } = await axios.get(API_URL)
    const productos = Array.isArray(data?.productos) ? data.productos : []

    // Mapa por id (el API trae 'id' para cada producto)
    const mapById = new Map(productos.map(p => [String(p.id), p]))

    // Actualiza cada ítem del carrito con existencias “reales”
    let changed = false
    ticket.value = ticket.value.map(item => {
      const apiP = mapById.get(String(item.id))
      if (!apiP) return item
      const { existencia, existencia2_raw } = normalizeStockFromProduct(apiP)
      // Solo muta si hay cambios
      if (existencia !== item.existencia || existencia2_raw !== item.existencia2_raw) {
        changed = true
        return { ...item, existencia, existencia2_raw }
      }
      return item
    })

    if (changed) saveTicketToStorage()
  } catch (err) {
    console.warn('No se pudo refrescar existencias desde API:', err)
  }
}

/** Ajusta todas las cantidades según el tope actual */
function sanearCarritoContraStock() {
  let ajustado = false
  ticket.value = ticket.value.map(p => {
    const tope = computeTope(p)
    let cant = Number(p.cant) || 0

    if (!Number.isFinite(tope)) {
      // Sin tope: mínimo 1
      if (cant < 1) { cant = 1; ajustado = true }
      return { ...p, cant }
    }

    if (tope <= 0) {
      // Sin stock: fuerza a 0 (si prefieres 1 + bloquear, cámbialo)
      if (cant !== 0) { cant = 0; ajustado = true }
      return { ...p, cant }
    }

    // Hay tope: clamp [1, tope]
    const clamped = Math.max(1, Math.min(cant, tope))
    if (clamped !== cant) ajustado = true
    return { ...p, cant: clamped }
  })

  if (ajustado) saveTicketToStorage()
}

// ---------- Ciclo de vida ----------
onMounted(async () => {
  ticket.value = loadTicketFromStorage()

  // 1) Refrescar stock real de la API (clave para que no “pase derecho”)
  await hydrateExistenciasFromAPI()

  // 2) Clampear cantidades con el stock ya actualizado
  sanearCarritoContraStock()
  actualizarTotales()

  // (Opcional) diagnóstico
  try {
    console.table(ticket.value.map(p => ({
      id: p.id,
      cant: p.cant,
      existencia: p.existencia,
      existencia2_raw: p.existencia2_raw,
      tope: computeTope(p)
    })))
  } catch (_) {}
})

// ---------- Getters UI ----------
function obtenerCantidad(id) {
  const producto = ticket.value.find(item => String(item.id) === String(id))
  return producto ? (Number(producto.cant) || 0) : 0
}

// ---------- Acciones (+ / - / eliminar) ----------
function decrementar2(id) {
  const producto = ticket.value.find(item => String(item.id) === String(id))
  if (!producto) return

  const tope = computeTope(producto)
  const minPermitido = Number.isFinite(tope) && tope <= 0 ? 0 : 1
  const current = Number(producto.cant) || 0

  if (current > minPermitido) {
    producto.cant = current - 1
    saveTicketToStorage()
    actualizarTotales()
  } else {
    console.log(`No se puede disminuir más. Mínimo permitido: ${minPermitido}.`)
  }
}

function incrementar2(id) {
  const producto = ticket.value.find(item => String(item.id) === String(id))
  if (!producto) return

  const tope = computeTope(producto)
  const current = Number(producto.cant) || 0

  if (!Number.isFinite(tope)) {
    // Sin tope (no llegó stock): incrementa pero también intenta hidratar de nuevo
    producto.cant = current + 1
    saveTicketToStorage()
    actualizarTotales()
    // intento de refresco “best effort” (no bloqueante)
    hydrateExistenciasFromAPI().then(() => {
      sanearCarritoContraStock()
      actualizarTotales()
    })
    return
  }

  if (tope <= 0) {
    console.log('Producto sin stock. No se puede incrementar.')
    return
  }

  if (current < tope) {
    producto.cant = current + 1
    saveTicketToStorage()
    actualizarTotales()
  } else {
    // Clamp defensivo por si llegan clicks muy rápidos
    producto.cant = tope
    saveTicketToStorage()
    actualizarTotales()
    console.log(`Máximo permitido alcanzado: ${tope}.`)
  }
}

function quitar_item_Carrito(id) {
  ticket.value = ticket.value.filter(item => String(item.id) !== String(id))
  saveTicketToStorage()
  actualizarTotales()
}

// ---------- (legacy) Render externo opcional ----------
function imprimir_carrito_checkout(arreglo_car, totalNumero) {
  const formato = (v) => Math.round(Number(v) || 0).toString()
    .replace(/\./g, ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  let valores = ''
  ;(arreglo_car.productos || []).forEach((datos) => {
    const precio1  = Number(datos.precio) || 0
    const cant1    = Number(datos.cant)   || 0
    const subtotal = precio1 * cant1
    valores += `
      <div class="single_shop_cart d-flex align-items-center flex-wrap">
        <div class="cart_img mb-4 mb-md-0">
          <img loading="lazy" src='${datos.foto}' alt="product">
        </div>
        <div class="cart_cont">
          <a href="#"><h5>${datos.descripcion}</h5></a>
          <p class="price">${formato(precio1)}</p>
        </div>
        <div class="cart_qnty d-flex align-items-center ms-md-auto">
          <div class="cart_qnty_btn"><i class="las la-minus"></i></div>
          <div class="cart_count">${cant1}</div>
          <div class="cart_qnty_btn"><i class="las la-plus"></i></div>
        </div>
        <div class="cart_price ms-auto"><p>${formato(subtotal)}</p></div>
        <div class="cart_remove ms-auto"><i class="icon-trash"></i></div>
      </div>`
  })
  const total_monto = formato(totalNumero)
  // document.getElementById("lista_productos").innerHTML = valores
  // document.getElementById("casilla_monto").innerHTML   = "$" + total_monto
  // document.getElementById("monto_total").innerHTML     = "$" + total_monto
}
</script>
