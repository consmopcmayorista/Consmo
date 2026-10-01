<template>
  <section class="promo" aria-label="Promoción de combos para punto de venta">
    <!-- LADO IZQUIERDO: textos, reloj y botones -->
    <div class="promo__info">
      <span class="promo__badge">Oportunidad del mes</span>
      <h2 class="promo__title">Equipa tu negocio.</h2>
      <p class="promo__text">{{ comboActual.descripcion }}</p>

      <ul class="promo__chips">
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></svg>
          Envios a toda Colombia (Aplica TyC)
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
          Garantía y respaldo
        </li>
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14v-2a8 8 0 0116 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>
          Instalación asesorada
        </li>
      </ul>

      <div class="promo__bottom">
      <div v-if="!terminado" class="promo__countdown">
        <p class="promo__label">Termina en</p>
        <div class="promo__boxes">
          <div v-for="u in unidades" :key="u.nombre" class="promo__box">
            <Transition name="tick" mode="out-in">
              <span :key="u.valor" class="promo__num">{{ u.valor }}</span>
            </Transition>
            <span class="promo__unit">{{ u.nombre }}</span>
          </div>
        </div>
      </div>
      <p v-else class="promo__ended">
        Esta promoción terminó. Escríbenos y te contamos las nuevas ofertas.
      </p>

      <div class="promo__actions">
        <a class="promo__btn promo__btn--light" :href="enlaceWhatsapp" target="_blank" rel="noopener">
          Comprar ahora
        </a>
        <a class="promo__btn promo__btn--ghost" :href="comboActual.enlaceDetalles">
          Ver detalles →
        </a>
      </div>
      </div>
    </div>

    <!-- LADO DERECHO: imagen de los combos -->
    <div class="promo__visual">
      <div class="promo__tabs" role="tablist" aria-label="Elige un combo">
        <button
          v-for="(combo, i) in combos"
          :key="combo.nombre"
          type="button"
          role="tab"
          :aria-selected="i === indice"
          :class="['promo__tab', { 'promo__tab--activo': i === indice }]"
          @click="elegirCombo(i)"
        >
          {{ combo.nombre }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="indice" class="promo__product">
          <img
            v-if="!imagenFallida[indice]"
            :src="comboActual.imagen"
            :alt="comboActual.nombre"
            @error="marcarImagenFallida(indice)"
          />
          <!-- Dibujo de respaldo si la foto aún no existe -->
          <svg v-else class="promo__placeholder" viewBox="0 0 320 220" aria-hidden="true">
            <rect x="40" y="165" width="240" height="40" rx="6" />
            <line x1="140" y1="185" x2="180" y2="185" />
            <rect x="92" y="35" width="136" height="96" rx="8" />
            <rect x="102" y="45" width="116" height="74" rx="4" />
            <path d="M150 131l-4 34M170 131l4 34" />
            <rect x="238" y="118" width="58" height="47" rx="6" />
            <path d="M250 118V98h34v20M250 140h34" />
            <path d="M24 125l30-18 10 16-16 10 6 32H40z" />
          </svg>
        </div>
      </Transition>

      <div v-if="comboActual.precio" class="promo__price">
        <span class="promo__combo-price">
          <small class="promo__price-tag">Precio especial</small>
          {{ comboActual.precio }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/* =========================================================
   ✏️ AQUÍ CAMBIAS TUS DATOS (solo lo que está entre comillas)
   ========================================================= */

// Fecha y hora en que termina la promoción (hora de Colombia)
const FECHA_FIN = '2026-10-31T13:00:00-05:00'

// Tu número de WhatsApp: 57 + número, sin espacios ni símbolos
const NUMERO_WHATSAPP = '573015681832'

// Cada cuántos segundos cambia de combo solo
const SEGUNDOS_POR_COMBO = 4

// Tus combos
const combos = [
  {
    nombre: 'Combo Emprendedor',
    descripcion:
      'Kit de punto de venta listo para operar: computador, impresora térmica, lector y cajón monedero.',
    precio: '$ 1.647.000', // ejemplo: '$ 1.290.000' (si lo dejas vacío, no se muestra)
    imagen: '/images2/promos/combo1.png',
    enlaceDetalles: '#'
  },
  {
    nombre: 'Combo Profesional',
    descripcion:
      'Kit de punto de venta completo para negocios con más movimiento: equipo más potente y accesorios profesionales.',
    precio: '$ 1.736.000',
    imagen: '/images2/promos/combo2.png',
    enlaceDetalles: '#'
  }
]

/* ========= De aquí para abajo no necesitas tocar nada ========= */

const indice = ref(0)
const imagenFallida = ref(combos.map(() => false))
const ahora = ref(Date.now())
let relojId = null
let rotacionId = null

const comboActual = computed(() => combos[indice.value])

const restante = computed(() => Math.max(0, new Date(FECHA_FIN).getTime() - ahora.value))
const terminado = computed(() => restante.value <= 0)

const dosDigitos = (n) => String(n).padStart(2, '0')

const unidades = computed(() => {
  const s = Math.floor(restante.value / 1000)
  return [
    { nombre: 'días', valor: dosDigitos(Math.floor(s / 86400)) },
    { nombre: 'horas', valor: dosDigitos(Math.floor((s % 86400) / 3600)) },
    { nombre: 'min', valor: dosDigitos(Math.floor((s % 3600) / 60)) },
    { nombre: 'seg', valor: dosDigitos(s % 60) }
  ]
})

const enlaceWhatsapp = computed(() => {
  const mensaje = `Hola, me interesa el ${comboActual.value.nombre} para punto de venta.`
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`
})

function marcarImagenFallida(i) {
  imagenFallida.value[i] = true
}

function iniciarRotacion() {
  clearInterval(rotacionId)
  rotacionId = setInterval(() => {
    indice.value = (indice.value + 1) % combos.length
  }, SEGUNDOS_POR_COMBO * 1000)
}

function elegirCombo(i) {
  indice.value = i
  iniciarRotacion() // vuelve a contar desde cero para que no cambie de golpe
}

onMounted(() => {
  relojId = setInterval(() => {
    ahora.value = Date.now()
  }, 1000)
  iniciarRotacion()
})

onBeforeUnmount(() => {
  clearInterval(relojId)
  clearInterval(rotacionId)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

.promo {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  align-items: center;
  max-width: 1100px;
  margin: 24px auto;
  border-radius: 22px;
  overflow: hidden;
  color: #fff;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #061a4f 0%, #0a2a8a 55%, #1233d6 100%);
  box-shadow: 0 24px 50px -25px rgba(10, 42, 138, 0.55);
}

/* ---------- Lado izquierdo ---------- */
.promo__info {
  padding: 26px 36px;
}

.promo__badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #ffd400;
  color: #1a1a1a;
  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
}

.promo__title {
  margin: 8px 0 6px;
  font-family: inherit;
  font-size: clamp(26px, 2.8vw, 32px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #fff;
}

.promo__text {
  max-width: 460px;
  margin: 0;
  min-height: 2.9em;
  font-size: 14px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.75);
}

.promo__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.promo__chips li {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
}

.promo__chips svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Reloj y botones en la misma fila */
.promo__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px 20px;
  margin-top: 14px;
}

.promo__label {
  margin: 0 0 6px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
}

.promo__boxes {
  display: flex;
  gap: 6px;
}

.promo__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.promo__num {
  font-size: 19px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  line-height: 1.1;
}

.promo__unit {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.promo__ended {
  margin: 0;
  font-size: 13px;
  color: #ffd400;
}

.promo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.promo__btn {
  padding: 10px 16px;
  border-radius: 10px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.promo__btn:focus-visible,
.promo__tab:focus-visible {
  outline: 2px solid #ffd400;
  outline-offset: 3px;
}

.promo__btn--light {
  background: #fff;
  color: #0a2a6b;
}

.promo__btn--light:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.45);
}

.promo__btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
}

.promo__btn--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ---------- Lado derecho ---------- */
.promo__visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  background: radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.16), transparent 62%);
}

.promo__tabs {
  display: flex;
  gap: 4px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
}

.promo__tab {
  padding: 6px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.promo__tab--activo {
  background: #fff;
  color: #0a2a6b;
}

.promo__product {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 245px;
  margin-top: 4px;
}

.promo__product img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.35));
  animation: flotar 6s ease-in-out infinite;
}

.promo__placeholder {
  width: 75%;
  max-width: 260px;
  fill: none;
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.promo__price {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}

/* Precio resaltado: píldora amarilla que late y tiene un brillo que pasa */
.promo__combo-price {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 18px;
  border-radius: 999px;
  background: #ffd400;
  color: #0a1a4a;
  font-size: 21px;
  font-weight: 800;
  letter-spacing: -0.02em;
  animation: latido 2.4s ease-in-out infinite;
}

.promo__combo-price::after {
  content: '';
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  transform: skewX(-20deg);
  animation: brillo 3s ease-in-out infinite;
}

.promo__price-tag {
  padding: 3px 8px;
  border-radius: 999px;
  background: #0a1a4a;
  color: #ffd400;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

@keyframes latido {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 212, 0, 0.55); }
  50% { transform: scale(1.06); box-shadow: 0 0 0 12px rgba(255, 212, 0, 0); }
}

@keyframes brillo {
  0% { left: -60%; }
  60%, 100% { left: 130%; }
}

/* ---------- Animaciones ---------- */
@keyframes flotar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.tick-enter-active,
.tick-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.tick-enter-from { opacity: 0; transform: translateY(-10px); }
.tick-leave-to { opacity: 0; transform: translateY(10px); }

/* Cambio de combo bien visible: sale hacia la izquierda, entra desde la derecha */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.fade-enter-from { opacity: 0; transform: translateX(40px); }
.fade-leave-to { opacity: 0; transform: translateX(-40px); }

@media (prefers-reduced-motion: reduce) {
  .promo__product img,
  .promo__combo-price,
  .promo__combo-price::after { animation: none; }
  .tick-enter-active, .tick-leave-active,
  .fade-enter-active, .fade-leave-active { transition: none; }
}

/* ---------- Celular y tablet ---------- */
@media (max-width: 860px) {
  .promo {
    grid-template-columns: 1fr 0.8fr;
    margin: 16px 12px;
    border-radius: 18px;
  }
  .promo__info { padding: 18px 8px 18px 18px; }
  .promo__title { font-size: 22px; }
  .promo__text,
  .promo__chips,
  .promo__label { display: none; }
  .promo__bottom { margin-top: 10px; gap: 10px; }
  .promo__visual { padding: 12px 12px 12px 0; background: none; }
  .promo__tab { padding: 5px 10px; font-size: 11px; }
  .promo__product { height: 130px; }
  .promo__combo-price { padding: 6px 12px; font-size: 15px; }
  .promo__price-tag { display: none; }
}

@media (max-width: 480px) {
  .promo__box { width: 40px; height: 44px; border-radius: 8px; }
  .promo__num { font-size: 16px; }
  .promo__unit { font-size: 9px; }
  .promo__actions { width: 100%; }
  .promo__btn { flex: 1; padding: 9px 10px; font-size: 12px; text-align: center; }
  .promo__btn--ghost { display: none; }
}
</style>
