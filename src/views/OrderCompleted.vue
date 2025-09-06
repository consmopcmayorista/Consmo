<template>
  <div class="container">
    <div class="breadcrumbs">
      <a href="/"><i class="las la-home"></i></a>
      <a href="#" class="active">Compra Exitosa</a>
    </div>
  </div>

  <div class="cart_area section_padding_b">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="order_complete">
            <div class="order_complete_icon"><i class="las la-check-circle"></i></div>
            <div class="order_complete_content">
              <h4>¡Gracias por tu compra! 🎉</h4>

              <div v-if="ui.error" class="alert alert-danger mt-2">{{ ui.error }}</div>
              <div v-if="ui.info" class="alert alert-warning mt-2">{{ ui.info }}</div>

              <ul class="list-group my-3" v-if="valores_factura">
                <li class="list-group-item">Referencia: {{ referencia_pago }}</li>
                <li class="list-group-item">
                  Total:
                  {{
                    new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0})
                      .format(total_factura)
                  }}
                </li>
                <li class="list-group-item">Fecha: {{ fechaHoy }}</li>
                <li class="list-group-item" v-if="wompi.status">Estado Wompi: {{ wompi.status }}</li>
              </ul>

              <div class="order_complete_btn">
                <a @click="verCompra" class="default_btn second rounded">Ver compra (PDF)</a>
                <router-link to="/" class="default_btn rounded ms-2">Seguir comprando</router-link>
              </div>
            </div>
          </div>

          <details class="mt-3">
            <summary class="text-muted">Detalles técnicos</summary>
            <pre class="small bg-light p-2 border rounded">{{ debugInfo }}</pre>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

/* ====== CONFIG ====== */
const WOMPI_FEE_PCT = 6            // Comisión Wompi
const ORDER_PREFIX = 'FACT '         // Prefijo de referencia
const ORDER_MIN_START = 1000     // Mínimo para el consecutivo
const FEE_ITEM_ID = 999001           // 👈 Código numérico para que el back no lo descarte

/* ====== STATE ====== */
const referencia_pago = ref('')
const valores_factura = ref({})
const total_factura = ref(0)
const fechaHoy = ref(new Date().toISOString().slice(0,10))
const ui = ref({ error: '', info: '' })
const wompi = ref({ id: '', status: '' })
const route = useRoute()

/* ====== Helpers: referencia corta ====== */
function extractLastDigits(s) {
  const matches = String(s || '').match(/\d+/g)
  if (!matches || !matches.length) return null
  return parseInt(matches[matches.length - 1], 10)
}
async function obtenerUltimoPedido() {
  try {
    const r = await axios.get('https://whatsapp-nube.com/api_web/api_ultimo_pedido.php?id_empresa=24')
    return r.data?.nrofactura || null
  } catch { return null }
}
async function getNextOrderRef() {
  const ultimo = await obtenerUltimoPedido()
  const lastDigits = extractLastDigits(ultimo)
  const next = Number.isFinite(lastDigits) ? Math.max(lastDigits + 1, ORDER_MIN_START) : ORDER_MIN_START
  return `${ORDER_PREFIX}${next}`
}

/* ====== Snapshot / productos ====== */
function getSnapshotProducts() {
  try {
    const snap = JSON.parse(localStorage.getItem('checkout_snapshot'))
    return Array.isArray(snap?.products) ? snap.products : []
  } catch { return [] }
}
function mapSnapshotItemToFactura(p) {
  const precio = Number(p.precio || 0)        // unitario con IVA
  const cant   = Number(p.cant || 0)
  const valor  = +(precio / 1.19).toFixed(2)  // base sin IVA
  const imp    = +(precio - valor).toFixed(2) // IVA unitario
  const total  = +(precio * cant).toFixed(2)
  return {
    id: p.id,
    idpro: p.id,
    titulo: p.titulo,
    cant,
    valor,
    desc: 0,
    tot_desc: 0,
    valor_desc: valor,
    iva: 19,
    impuesto: imp,
    precio,
    total,
    lista_precio: []
  }
}
function calcWompiFeePesos(fromSnap) {
  const totalConIVA = fromSnap.reduce((a, it) => a + Number(it.precio || 0) * Number(it.cant || 0), 0)
  return Math.round((totalConIVA * WOMPI_FEE_PCT) / 100)
}

/* ====== PDF (cliente) ====== */
function verCompra() { imprimirListadoConJsPDF(valores_factura.value, referencia_pago.value) }
function imprimirListadoConJsPDF(info, refPago) {
  try {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' })
    doc.setFontSize(10)
    doc.text('Consmo PC Mayorista SAS', 220, 30)
    doc.text('CALLE 48C Nº 65A-24', 220, 45)
    doc.text('Tel: +57 301 5681832', 220, 60)
    doc.addImage('/assets/images/120x24.png', 'PNG', 30, 15, 80, 40)
    doc.setFontSize(8)
    doc.text(`Pedido N°: ${refPago}`, 400, 30)

    const c = Array.isArray(info.cliente) && info.cliente.length ? info.cliente[0] : null
    if (c) {
      doc.setFontSize(9)
      doc.text(`Cliente: ${c.nombres||''} ${c.apellidos||''}`, 30, 80)
      doc.text(`Documento: ${c.tip_doc_cliente||''} ${c.rut_cliente||''}`, 30, 95)
      doc.text(`Correo: ${c.email||''}`, 30, 110)
      doc.text(`Tel: ${c.tel||''}`, 30, 125)
      doc.text(`Dirección: ${c.direccion||''}`, 30, 140)
      doc.text(`Ciudad/Dto: ${c.ciudad||''} - ${c.departamento||''}`, 30, 155)
    }

    const rows = (info.productos || []).map(p => ([
      p.titulo||'', String(p.cant||0),
      Number(p.precio||0).toFixed(2), Number(p.total||0).toFixed(2)
    ]))
    doc.autoTable({ head: [['Producto','Cant','Precio','Total']], body: rows, theme: 'grid', styles: { fontSize: 8, minCellHeight: 14 }, startY: 180 })

    const sb = Number(info.sub_total_factura || 0)
    const iv = Number(info.imp_iva_factura || 0)
    const fee = Number(info.recargo_wompi || 0)
    const tt = Number(info.total_factura || sb + iv + fee)

    const y  = doc.lastAutoTable.finalY + 20
    doc.autoTable({
      head: [['Concepto','Valor']],
      body: [
        ['Subtotal', sb.toFixed(2)],
        ['IVA', iv.toFixed(2)],
        [`Comisión Wompi (${WOMPI_FEE_PCT}%)`, fee.toFixed(2)],
        ['Total', tt.toFixed(2)]
      ],
      startY: y, theme: 'grid', styles: { fontSize: 8 }, tableWidth: 200, margin: { left: 320 },
      headStyles: { fillColor: [0,0,0], textColor: [255,255,255], fontStyle: 'bold' }
    })
    window.open(doc.output('bloburl'), '_blank')
  } catch (e) { console.error('PDF error', e) }
}

/* ====== Envío a backend ====== */
async function enviar_email(refPago, idPedido, idCliente) {
  const raw = localStorage.getItem('facturacion_web')
  if (!raw) return
  const info = JSON.parse(raw)
  const fd = new FormData()
  fd.append('factura', JSON.stringify(info))
  fd.append('ref', refPago)
  fd.append('id_pedido', idPedido)
  fd.append('id_cliente', idCliente)
  try { await axios.post('/mail/enviar_pedi.php', fd, { headers: { 'Content-Type': 'multipart/form-data' } }) }
  catch (e) { console.error('Error en enviar_email:', e) }
}

async function facturar_pedido(refPago) {
  try {
    const raw = localStorage.getItem('facturacion_web')
    if (!raw) return
    const original = JSON.parse(raw)

    // 1) Productos desde snapshot
    const snapProducts = getSnapshotProducts()
    const productos = snapProducts.map(mapSnapshotItemToFactura)

    // 2) Si el método es Wompi, AÑADIR línea de comisión como producto válido (ID numérico)
    const esWompi = String(original?.form_pago) === '2'
    let recargoWompi = 0
    if (esWompi) {
      recargoWompi = calcWompiFeePesos(snapProducts)
      if (recargoWompi > 0) {
        productos.push({
          id: FEE_ITEM_ID,           // 👈 numérico, para que el back NO lo descarte
          idpro: FEE_ITEM_ID,
          titulo: `Comisión Wompi (${WOMPI_FEE_PCT}%)`,
          cant: 1,
          valor: recargoWompi,       // exento (sin IVA)
          desc: 0,
          tot_desc: 0,
          valor_desc: recargoWompi,
          iva: 0,
          impuesto: 0,
          precio: recargoWompi,
          total: recargoWompi,
          lista_precio: []
        })
      }
    }

    // 3) Recalcular totales (con la línea de fee incluida)
    const sub = productos.reduce((a, it) => a + Number(it.valor || it.precio) * Number(it.cant || 0), 0)
    const tot = productos.reduce((a, it) => a + Number(it.total || 0), 0)
    const iva = Math.max(0, tot - sub) // el fee no suma IVA

    const infoImprimir = {
      ...original,
      productos,
      sub_total_factura: Math.round(sub),
      imp_iva_factura: Math.round(iva),
      total_factura: Math.round(tot),
      recargo_wompi: recargoWompi
    }

    // Guardar y mostrar
    localStorage.setItem('facturacion_web', JSON.stringify(infoImprimir))
    total_factura.value = infoImprimir.total_factura
    valores_factura.value = infoImprimir

    // 4) Enviar a backend
    const fd = new FormData()
    fd.append('factura', JSON.stringify(infoImprimir))
    fd.append('id', '24')
    fd.append('documento', '8')
    fd.append('referencia_pago', refPago)
    if (wompi.value?.id)     fd.append('wompi_tx', wompi.value.id)
    if (wompi.value?.status) fd.append('wompi_status', wompi.value.status)

    console.log('[FACTURA->BACKEND]', JSON.parse(fd.get('factura')))
    const URL = 'https://whatsapp-nube.com/api_web/api_pos_pedido_web.php'
    const res = await axios.post(URL, fd, { headers: { 'Content-Type': 'multipart/form-data' } })

    const id_pedido = res.data?.[1]
    const id_cliente = res.data?.[2]
    if (id_pedido && id_cliente) await enviar_email(refPago, id_pedido, id_cliente)
  } catch (e) {
    console.error('Error al facturar el pedido:', e)
    ui.value.error = 'No fue posible generar la factura en el backend.'
  }
}

/* ====== Mount ====== */
onMounted(async () => {
  try {
    valores_factura.value = JSON.parse(localStorage.getItem('facturacion_web')) || {}
    total_factura.value = valores_factura.value?.total_factura || 0

    wompi.value.id = route.query.id || route.query.transaction_id || ''
    wompi.value.status = (route.query.status || '').toString().toUpperCase()

    // Si es Wompi y NO aprobó, no facturar
    if (valores_factura.value?.form_pago === '2' && wompi.value.status && wompi.value.status !== 'APPROVED') {
      ui.value.info = `El pago Wompi regresó con estado: ${wompi.value.status}. No se generó la factura.`
      return
    }

    // Referencia secuencial corta
    referencia_pago.value = await getNextOrderRef()

    await facturar_pedido(referencia_pago.value)

    // Limpia storages
    try {
      localStorage.removeItem('ticket')
      localStorage.removeItem('facturacion_web')
      localStorage.removeItem('checkout_snapshot')
    } catch {}
  } catch (err) {
    console.error('onMounted error:', err)
    ui.value.error = err?.message || 'No fue posible finalizar tu compra.'
  }
})

/* ====== Debug ====== */
const debugInfo = computed(() => ({
  wompi: wompi.value,
  referencia_enviada: referencia_pago.value,
  snapshot: (() => { try { return JSON.parse(localStorage.getItem('checkout_snapshot')) } catch { return null }})()
}))
</script>
