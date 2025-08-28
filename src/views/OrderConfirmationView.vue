<template>
  <!-- breadcrumbs -->
  <div class="container">
    <div class="breadcrumbs">
      <a href="index.html"><i class="las la-home"></i></a>
      <a href="shop-list.html">Tienda</a>
      <a class="active">Procesar Pago</a>
    </div>
  </div>

  <!-- cart area -->
  <div class="text-center my-4">
    <h2 class="mb-3">¿Quieres saber el costo de tu envío?</h2>
    <router-link
      to="/envios"
      class="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite"
    >
      <i class="las la-map-marker"></i>
      Descubre el costo de tu domicilio en nuestro mapa interactivo
    </router-link>
  </div>

  <div class="cart_area section_padding_b">
    <div class="container">
      <div class="row">
        <!-- Columna de datos de facturación y envío -->
        <div class="col-xl-8 col-lg-7 col-md-6">
          <h4 class="shop_cart_title mb-4 ps-3">Información Facturación y Envío</h4>

          <div class="mb-4">
            <p>referencia: {{ reference }}</p>
            <div class="row">
              <div class="col-md-6 form-group">
                <label>Tipo de Documento</label>
                <!-- IMPORTANTE: los values son abreviaturas. Por eso el v-model inicia en "CC" -->
                <select class="form-control" v-model="tip_doc_cliente">
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="NIT">NIT</option>
                  <option value="CE">Cédula de extranjería</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="TI">Tarjeta de identidad</option>
                </select>
              </div>

              <div class="col-md-6 form-group">
                <label>Documento Cliente</label>
                <input class="form-control" type="text" placeholder="NIT o Cédula" v-model.trim="rut_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Nombres</label>
                <input class="form-control" type="text" placeholder="Juan" v-model.trim="nombre_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Apellidos</label>
                <input class="form-control" type="text" placeholder="Salas" v-model.trim="apellido_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>E-mail</label>
                <input class="form-control" type="email" placeholder="example@email.com" v-model.trim="email_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Celular</label>
                <input class="form-control" type="text" placeholder="+57 123 456 789" v-model.trim="tel_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Dirección</label>
                <input class="form-control" type="text" placeholder="calle 666 #66-66" v-model.trim="direccion_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Continuación de Dirección (opcional)</label>
                <input class="form-control" type="text" placeholder="Apto, interior..." v-model.trim="direccion_cliente2" />
              </div>

              <div class="col-md-6 form-group">
                <label>Ciudad</label>
                <input class="form-control" type="text" placeholder="Medellín" v-model.trim="ciudad_cliente" />
              </div>

              <div class="col-md-6 form-group">
                <label>Departamento</label>
                <input class="form-control" type="text" placeholder="Antioquia" v-model.trim="departamento_cliente" />
              </div>

              <div class="col-md-12 form-group">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="shipto"
                    v-model="shipToOther"
                  />
                  <label class="custom-control-label" for="shipto">
                    ¿Desea enviar a dirección diferente?
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Dirección de envío adicional -->
          <div class="mb-4" v-show="shipToOther">
            <h4 class="font-weight-semi-bold mb-4">Dirección de Envío</h4>
            <div class="row">
              <div class="col-md-6 form-group">
                <label>Nombres</label>
                <input class="form-control" type="text" placeholder="María" v-model.trim="e_nombre_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>Apellidos</label>
                <input class="form-control" type="text" placeholder="Salas" v-model.trim="e_apellido_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>E-mail</label>
                <input class="form-control" type="email" placeholder="example@email.com" v-model.trim="e_email_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>Celular</label>
                <input class="form-control" type="text" placeholder="+57 123 456 789" v-model.trim="e_tel_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>Dirección</label>
                <input class="form-control" type="text" placeholder="Calle..." v-model.trim="e_direccion_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>Continuación de Dirección (opcional)</label>
                <input class="form-control" type="text" placeholder="Apto, interior..." v-model.trim="e_direccion_cliente2" />
              </div>
              <div class="col-md-6 form-group">
                <label>Ciudad</label>
                <input class="form-control" type="text" placeholder="Medellín" v-model.trim="e_ciudad_cliente" />
              </div>
              <div class="col-md-6 form-group">
                <label>Departamento</label>
                <input class="form-control" type="text" placeholder="Antioquia" v-model.trim="e_departamento_cliente" />
              </div>
            </div>
          </div>
        </div>

        <!-- Columna resumen + métodos de pago -->
        <div class="col-xl-4 col-lg-5 col-md-6">
          <h4 class="shop_cart_title ps-3">Tu orden</h4>
          <div class="checkout_order mt-4">
            <h4>producto</h4>

            <div class="single_check_order" v-for="(dato, index) in ticket" :key="index">
              <div class="checkorder_cont">
                <h5>{{ dato.descripcion }}</h5>
              </div>
              <p class="checkorder_qnty">x{{ dato.cant }}</p>
              <p class="checkorder_price">
                ${{ Math.round(parseFloat(dato.precio)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
              </p>
            </div>

            <!-- Subtotal -->
            <div class="single_check_order subs">
              <div class="checkorder_cont subtotal-h"><h5>Subtotal</h5></div>
              <p class="checkorder_price">
                ${{ Math.round(parseFloat(subtotal)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
              </p>
            </div>

            <!-- IVA -->
            <div class="single_check_order subs">
              <div class="checkorder_cont subtotal-h"><h5>Iva</h5></div>
              <p class="checkorder_price">
                ${{ Math.round(parseFloat(iva)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
              </p>
            </div>

            <!-- Total -->
            <div class="single_check_order total">
              <div class="checkorder_cont"><h5>Total</h5></div>
              <p class="checkorder_price">
                ${{ Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
              </p>
            </div>

            <!-- Opción 1: Pago Contra Entrega -->
            <div class="form-group">
              <div class="payment-info">
                <div class="option-label option-1" @click="toggleCollapse('contraEntrega')">
                  <i class="fas fa-handshake"></i> Opción 1 (Contra Entrega)
                </div>
                <v-collapse :show="showContraEntrega">
                  <ul>
                    <p>Ahora puedes realizar tu pedido con <strong>pago contra entrega</strong>...</p>
                  </ul>
                  <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_contraentrega.png" />
                  <ul>
                    <p><strong>Envíos a Medellín y alrededores:</strong> $13,000</p>
                    <p><strong>Otras ciudades:</strong> Te contactaremos de inmediato</p>
                  </ul>
                  <p><em>¡Tu comodidad es nuestra prioridad!</em></p>
                  <button type="button" class="btn-contra-entrega" @click="pagoContraEntrega">
                    Pago Contra Entrega
                  </button>
                </v-collapse>
              </div>
            </div>

            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />
            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />

            <!-- Opción 2: Pagar con Wompi -->
            <div class="form-group">
              <div class="payment-info">
                <div class="option-label option-2" @click="toggleCollapse('wompi')">
                  <i class="fas fa-credit-card"></i> Opción 2 (Pagar con Wompi)
                </div>
                <v-collapse :show="showWompi">
                  <ul>
                    <p>
                      Paga en línea con <strong>tarjeta, PSE, Nequi</strong> y más, de forma segura con
                      <strong>Wompi</strong>.
                    </p>
                  </ul>

                  <!-- DESGLOSE VISUAL DEL 5% (siempre visible en la sección Wompi) -->
                  <div class="wompi-breakdown">
                    <div class="wompi-row">
                      <span>Total del carrito</span>
                      <strong>{{ formatCOP(amountInCents) }}</strong>
                    </div>
                    <div class="wompi-row">
                      <span>Cargo por pago con Wompi ({{ WOMPI_FEE_PCT }}%)</span>
                      <strong>{{ formatCOP(wompiFeeInCents) }}</strong>
                    </div>
                    <hr class="my-2" />
                    <div class="wompi-row wompi-total">
                      <span>Total a pagar por Wompi</span>
                      <strong>{{ formatCOP(wompiPayableInCents) }}</strong>
                    </div>
                  </div>

                  <img style="width:100%; margin-top:10px" src="https://consmopcmayorista.com/images2/WOMPI.png" />

                  <p></p>
                  <!-- Descomenta para habilitar el pago directo -->
                  
                  <!--<button type="button" class="btn-punto-venta" @click="pagarConWompi">
                    Pagar aquí con Wompi
                  </button>-->
                 
                  <a
                    class="btn-punto-venta"
                    href="https://wa.me/573015537673?text=Hola%20Consmo%20PC,%20quiero%20saber%20sobre%20pagos%20a%20cr%C3%A9dito%20con%20Wompi."
                    target="_blank"
                    rel="noopener"
                  >
                    pregunta por tu pago a crédito con Wompi
                  </a> 
                </v-collapse>
              </div>
            </div>

            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />
            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />

            <!-- Opción 3: Recoger en Punto de Venta -->
            <div class="form-group">
              <div class="payment-info">
                <div class="option-label option-2" @click="toggleCollapse('puntoVenta')">
                  <i class="fas fa-store"></i> Opción 3 (Recoger en Punto de Venta)
                </div>
                <v-collapse :show="showPuntoVenta">
                  <ul>
                    <p>Con nuestra opción <strong>Recoger en Punto de Venta</strong>...</p>
                  </ul>
                  <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_recoger.png" />
                  <ul>
                    <p><strong>Recoge tu pedido en tienda</strong>...</p>
                  </ul>
                  <p>Calle 48C #65A-24 Suramericana, Medellín</p>
                  <button type="button" class="btn-punto-venta" @click="recogerEnPuntoDeVenta">
                    Recoger en Punto de Venta
                  </button>
                </v-collapse>
              </div>
            </div>

            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />
            <hr style="margin: 20px 0; border-top: 3px solid #000000;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

/* ===========================
   CONFIG WOMPI
   - Clave pública desde .env: VITE_WOMPI_PUBLIC_KEY
   - Firmador por proxy: /wompi/sign
   =========================== */
const publicKey = ref(import.meta.env.VITE_WOMPI_PUBLIC_KEY || '')
const SIGN_URL = import.meta.env.VITE_WOMPI_SIGN_URL || '/wompi/sign'

// % de recargo solo para Wompi
const WOMPI_FEE_PCT = 5

// Refs para desglose (opcionales en UI)
const wompiFeeInCents = ref(0)        // recargo en centavos
const wompiPayableInCents = ref(0)    // total a cobrar por Wompi en centavos

/* ===========================
   STATE
   =========================== */
const datos_ticket = ref([])
const ticket = ref([])
const producto_imprimir = ref([])

const tip_doc_cliente = ref('CC') // coincide con los values del select
const rut_cliente = ref('')

const nombre_cliente = ref('')
const apellido_cliente = ref('')
const email_cliente = ref('')
const tel_cliente = ref('')
const direccion_cliente = ref('')
const direccion_cliente2 = ref('')
const ciudad_cliente = ref('')
const departamento_cliente = ref('')

const shipToOther = ref(false)
const e_nombre_cliente = ref('')
const e_apellido_cliente = ref('')
const e_email_cliente = ref('')
const e_tel_cliente = ref('')
const e_direccion_cliente = ref('')
const e_direccion_cliente2 = ref('')
const e_ciudad_cliente = ref('')
const e_departamento_cliente = ref('')

let subtotal = ref(0)
let iva = ref(0)
let total = ref(0)
let amountInCents = ref(0)
let vatInCents = ref(0)
const fechaHoy = ref('')

const reference = ref('')

/* Collapses */
const showContraEntrega = ref(false)
const showPuntoVenta = ref(false)
const showWompi = ref(false)
const showTransferenciaBancaria = ref(false)

function toggleCollapse(which) {
  if (which === 'contraEntrega') {
    showContraEntrega.value = !showContraEntrega.value
    showPuntoVenta.value = false
    showWompi.value = false
    showTransferenciaBancaria.value = false
  } else if (which === 'puntoVenta') {
    showPuntoVenta.value = !showPuntoVenta.value
    showContraEntrega.value = false
    showWompi.value = false
    showTransferenciaBancaria.value = false
  } else if (which === 'wompi') {
    showWompi.value = !showWompi.value
    showContraEntrega.value = false
    showPuntoVenta.value = false
    showTransferenciaBancaria.value = false
  } else if (which === 'transferenciaBancaria') {
    showTransferenciaBancaria.value = !showTransferenciaBancaria.value
    showContraEntrega.value = false
    showPuntoVenta.value = false
    showWompi.value = false
  }
}

/* ===========================
   FACTURA (estructura que guardas en localStorage)
   =========================== */
const infoFactura = reactive({
  reference: '',
  cliente: [],
  productos: [],
  info_cliente_envio: [],
  descuento: 0,
  sub_total_factura_bruto: 0,
  total_descuento: 0,
  sub_total_factura: 0,
  imp_iva_factura: 0,
  total_factura: 0,
  form_pago: '1',
  nota: '',
  fecha_fac: '',
  fecha_vencimiento: ''
})

const info_cliente_envio = ref([])
const info_cliente = ref([])

/* ===========================
   HELPERS
   =========================== */
function generateRef(length = 30) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map(n => chars[n % chars.length]).join('')
}

function validateFormBasic() {
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_cliente.value || '')
  const phoneDigits = (tel_cliente.value || '').replace(/\D/g, '')
  if (!rut_cliente.value || rut_cliente.value.length < 5) return alert('Documento inválido'), false
  if (!nombre_cliente.value || nombre_cliente.value.length < 2) return alert('Nombre inválido'), false
  if (!apellido_cliente.value || apellido_cliente.value.length < 2) return alert('Apellido inválido'), false
  if (!emailOk) return alert('Correo inválido'), false
  if (phoneDigits.length < 7) return alert('Celular inválido'), false
  if (!direccion_cliente.value || direccion_cliente.value.length < 4) return alert('Dirección inválida'), false
  if (!ciudad_cliente.value) return alert('Ciudad requerida'), false
  if (!departamento_cliente.value) return alert('Departamento requerido'), false
  if (total.value <= 0) return alert('Tu carrito está vacío'), false

  if (shipToOther.value) {
    const emailOk2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e_email_cliente.value || '')
    const phoneDigits2 = (e_tel_cliente.value || '').replace(/\D/g, '')
    if (!e_nombre_cliente.value) return alert('Nombre de envío requerido'), false
    if (!e_apellido_cliente.value) return alert('Apellido de envío requerido'), false
    if (!emailOk2) return alert('Correo de envío inválido'), false
    if (phoneDigits2.length < 7) return alert('Celular de envío inválido'), false
    if (!e_direccion_cliente.value) return alert('Dirección de envío requerida'), false
    if (!e_ciudad_cliente.value) return alert('Ciudad de envío requerida'), false
    if (!e_departamento_cliente.value) return alert('Departamento de envío requerido'), false
  }
  return true
}

function buildClienteArrays() {
  const principal = {
    nombres: nombre_cliente.value,
    apellidos: apellido_cliente.value,
    email: email_cliente.value,
    tel: tel_cliente.value,
    direccion: `${direccion_cliente.value} ${direccion_cliente2.value || ''}`.trim(),
    ciudad: ciudad_cliente.value,
    departamento: departamento_cliente.value,
    tip_doc_cliente: tip_doc_cliente.value,
    rut_cliente: rut_cliente.value
  }

  const envio = shipToOther.value
    ? {
        nombres: e_nombre_cliente.value,
        apellidos: e_apellido_cliente.value,
        email: e_email_cliente.value,
        tel: e_tel_cliente.value,
        direccion: `${e_direccion_cliente.value} ${e_direccion_cliente2.value || ''}`.trim(),
        ciudad: e_ciudad_cliente.value,
        departamento: e_departamento_cliente.value
      }
    : { ...principal }

  return { principal, envio }
}

// Calcula recargo en centavos
function calcWompiFeeCents(baseAmountInCents, pct = WOMPI_FEE_PCT) {
  return Math.round((baseAmountInCents * pct) / 100)
}

// Formatea COP desde centavos
function formatCOP(cents) {
  return (cents / 100).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
}

// Llama al backend firmador (usa proxy /wompi/sign)
async function getIntegritySignature({ reference, amountInCents, currency = 'COP' }) {
  const { data } = await axios.post(SIGN_URL, {
    reference,
    amount_in_cents: amountInCents,
    currency
  })
  if (!data?.integrity) throw new Error('No se pudo obtener la firma de integridad')
  return data.integrity
}

// Persiste factura; permite inyectar líneas extra (ej. recargo Wompi)
function persistFactura(form_pago, nota, extraItems = []) {
  const { principal, envio } = buildClienteArrays()
  infoFactura.reference = reference.value
  infoFactura.cliente = [principal]
  infoFactura.info_cliente_envio = [envio]

  // ⚠️ No alteramos producto_imprimir original para no afectar otros métodos
  infoFactura.productos = [...producto_imprimir.value, ...extraItems]

  infoFactura.sub_total_factura_bruto = subtotal.value
  infoFactura.total_descuento = 0
  infoFactura.sub_total_factura = subtotal.value
  infoFactura.imp_iva_factura = iva.value
  infoFactura.total_factura = total.value
  infoFactura.form_pago = form_pago
  infoFactura.nota = nota
  infoFactura.fecha_fac = fechaHoy.value
  infoFactura.fecha_vencimiento = fechaHoy.value

  localStorage.setItem('facturacion_web', JSON.stringify(infoFactura))
}

/* ===========================
   WOMPI (widget)
   =========================== */
function ensureWompiScript() {
  return new Promise((resolve, reject) => {
    if (window.WidgetCheckout) return resolve()
    const s = document.createElement('script')
    s.src = 'https://checkout.wompi.co/widget.js'
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('No se pudo cargar el widget de Wompi'))
    document.head.appendChild(s)
  })
}

// Abre el widget de Wompi cobrando el total + 5%
async function pagarConWompi() {
  if (!validateFormBasic()) return
  if (!publicKey.value) {
    alert('Falta configurar VITE_WOMPI_PUBLIC_KEY')
    return
  }

  try {
    // Recalcula por si cambió el carrito
    actualizarTotales()

    const currency = 'COP'
    const base = Math.max(1, Math.floor(amountInCents.value)) // entero centavos
    const fee = calcWompiFeeCents(base, WOMPI_FEE_PCT)
    const totalForWompi = base + fee

    // Guarda en refs (para mostrar en UI)
    wompiFeeInCents.value = fee
    wompiPayableInCents.value = totalForWompi

    // Línea extra para la factura (no altera los productos originales)
    const feeItemPesos = fee / 100 // a pesos
    const extraItems = [
      {
        id: 'WOMPI-FEE',
        idpro: 'WOMPI_FEE_5',
        titulo: `Cargo pasarela Wompi (${WOMPI_FEE_PCT}%)`,
        cant: 1,
        valor: parseFloat(feeItemPesos.toFixed(2)), // sin IVA (tratado como exento)
        desc: 0,
        tot_desc: 0,
        valor_desc: parseFloat(feeItemPesos.toFixed(2)),
        iva: 0,
        impuesto: 0,
        precio: parseFloat(feeItemPesos.toFixed(2)),
        total: parseFloat(feeItemPesos.toFixed(2)),
        lista_precio: []
      }
    ]

    // Persistimos factura con la línea de recargo (form_pago = '2' Wompi)
    persistFactura('2', 'Compra ejecutada por página web, facturada para pago en línea (Wompi).', extraItems)

    // Firma el MONTO FINAL que se enviará a Wompi
    const integrity = await getIntegritySignature({
      reference: reference.value,
      amountInCents: totalForWompi,
      currency
    })

    // Carga script y abre widget
    await ensureWompiScript()
    const checkout = new window.WidgetCheckout({
      currency,
      amountInCents: totalForWompi, // 👈 total con recargo
      reference: reference.value,
      publicKey: publicKey.value,
      signature: { integrity },     // 👈 obligatorio
      redirectUrl: `${window.location.origin}/confirmacion`
    })

    checkout.open((result) => {
      console.log('Wompi result:', result)
    })
  } catch (e) {
    console.error(e)
    alert('No se pudo abrir Wompi. ' + (e?.message || 'Intenta de nuevo.'))
  }
}

/* ===========================
   OTRAS OPCIONES
   =========================== */
async function recogerEnPuntoDeVenta() {
  if (!validateFormBasic()) return
  persistFactura('3', 'Compra ejecutada por página web, facturada para recogida en punto de venta.')
  window.location.href = '/compra-exitosa'
}

async function pagoContraEntrega() {
  if (!validateFormBasic()) return
  persistFactura('1', 'Compra ejecutada por página web, facturada para contra entrega.')
  window.location.href = '/compra-exitosa'
}

/* ===========================
   TOTALES / CARGA CARRITO
   =========================== */
function cargar_detalles() {
  producto_imprimir.value = []
  if (ticket.value && ticket.value.length > 0) {
    ticket.value.forEach((element) => {
      const valor2 = element.precio / 1.19
      const iva2 = element.precio - valor2
      const total2 = element.precio * element.cant

      producto_imprimir.value.push({
        id: element.id,
        idpro: element.tags,
        titulo: element.descripcion,
        cant: element.cant,
        valor: parseFloat(valor2.toFixed(2)),
        desc: 0,
        tot_desc: 0,
        valor_desc: parseFloat(valor2.toFixed(2)),
        iva: 19,
        impuesto: parseFloat(iva2.toFixed(2)),
        precio: parseFloat(element.precio),
        total: parseFloat(total2.toFixed(2)),
        lista_precio: []
      })
    })
  }
}

function actualizarTotales() {
  total.value = ticket.value.reduce((acc, it) => acc + (Number(it.cant) * parseFloat(it.precio)), 0)
  subtotal.value = Math.floor(total.value / 1.19)
  iva.value = Math.round(total.value - subtotal.value)
  amountInCents.value = Math.round(total.value * 100) // entero exacto

  // 👉 Actualiza el desglose Wompi en tiempo real
  wompiFeeInCents.value = calcWompiFeeCents(amountInCents.value, WOMPI_FEE_PCT)
  wompiPayableInCents.value = amountInCents.value + wompiFeeInCents.value
}

onMounted(() => {
  // fecha actual
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  fechaHoy.value = `${yyyy}-${mm}-${dd}`

  // ticket
  const raw = localStorage.getItem('ticket')
  const parsed = raw ? JSON.parse(raw) : null
  ticket.value = Array.isArray(parsed?.productos) ? parsed.productos : []

  actualizarTotales()
  cargar_detalles()
  reference.value = generateRef()
})

/* ===========================
   (Opcional) utilidades legacy
   =========================== */
function openBancolombiaPopup() {
  alert(`Por favor realiza una transferencia bancaria a la siguiente cuenta:
Banco: Bancolombia
Cuenta: 123456789
Titular: Consmo PC Mayorista

Total a transferir: $${Math.round(parseFloat(total.value)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`)
}
</script>

<style scoped>
/* Estilos generales */
.container { margin-top: 20px; }
.breadcrumbs { display: flex; gap: 5px; margin-bottom: 20px; }
.breadcrumbs a { color: #333; text-decoration: none; }
.breadcrumbs a.active { font-weight: bold; }

.cart_area { background: #f9f9f9; padding: 20px 0; }
.shop_cart_title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }

.form-group { margin-bottom: 15px; }
.form-group label { font-weight: bold; margin-bottom: 5px; display: block; }
.form-group input, .form-group select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }

.payment-info { margin-top: 20px; }
.payment-info .option-label { font-size: 18px; font-weight: bold; margin-bottom: 10px; cursor: pointer; }

.single_check_order { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #ddd; }
.single_check_order.subs { font-weight: bold; }
.single_check_order.total { font-size: 20px; font-weight: bold; }
.checkorder_cont h5 { margin: 0; }
.checkorder_qnty, .checkorder_price { margin: 0; }

/* Opción 1: Contra Entrega */
.option-1 { background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; }
.btn-contra-entrega { background-color: #dc3545; color: #fff; }
.btn-contra-entrega:hover { background-color: #c82333; }

/* Opción 2: Wompi y Opción 3: Punto de Venta reutilizan estos estilos */
.option-2 { background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; }
.btn-punto-venta { background-color: #28a745; color: #fff; }
.btn-punto-venta:hover { background-color: #218838; }

/* Opción 3: Transferencia Bancaria (si la reactivas) */
.option-3 { background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 5px; }
.btn-bancolombia { background-color: #dc3545; color: #fff; }
.btn-bancolombia:hover { background-color: #138496; }

/* Desglose Wompi */
.wompi-breakdown {
  background: #ffffff;
  border: 1px dashed #bcd5c0;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 10px 0;
}
.wompi-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}
.wompi-total {
  font-weight: 700;
  font-size: 1.05rem;
}
</style>
