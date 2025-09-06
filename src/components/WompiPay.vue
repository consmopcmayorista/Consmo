<template>
  <div class="wompi-pay">
    <!-- INIT MODE: botón/slot para disparar el flujo de Wompi -->
    <div v-if="mode === 'init'">
      <slot name="trigger" :start="startPayment">
        <button type="button" class="btn btn-primary" @click="startPayment" :disabled="loading">
          <span v-if="!loading">Pagar con Wompi</span>
          <span v-else>Creando pago...</span>
        </button>
      </slot>
      <p v-if="errorMsg" class="text-danger mt-2">{{ errorMsg }}</p>
    </div>

    <!-- RETURN MODE: mensaje de procesamiento -->
    <div v-else-if="mode === 'return'">
      <div class="container py-4">
        <h3 class="mb-2">Confirmando tu pago...</h3>
        <p class="text-muted">Estamos validando la transacción con Wompi. No cierres esta página.</p>
        <p v-if="errorMsg" class="text-danger mt-3">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * WompiPay.vue
 * 
 * Un (1) solo componente reutilizable que encapsula:
 *  - Modo "init": crea el checkout en backend y redirige al checkout de Wompi.
 *  - Modo "return": procesa el retorno de Wompi, confirma en backend y dispara el mismo flujo que "contra entrega".
 * 
 * Props clave:
 *  - mode: 'init' | 'return' (default: 'init')
 *  - returnPath: ruta absoluta o relativa donde recibes el retorno (default: '/pago/wompi/retorno')
 *  - payload: objeto con datos del cliente/carrito/totales que tu backend necesita para crear el checkout.
 *  - apiCreateUrl: endpoint backend para crear checkout -> { ok, checkout_url }
 *  - apiConfirmUrl: endpoint backend para confirmar transacción -> { ok, id_pedido, url_pdf, total_factura, referencia_pago, fecha, ... }
 *  - redirectOnSuccess: si true (default), redirige a { name: 'OrderCompleted' } después de confirmar.
 *  - orderCompletedRouteName: nombre de la ruta de compra exitosa (default: 'OrderCompleted')
 *  - storeSessionOnSuccess: si true (default), guarda en sessionStorage('orderCompletedData') lo retornado por backend.
 * 
 * Eventos emitidos:
 *  - 'start' cuando se inicia el proceso de pago (init)
 *  - 'created' con { checkout_url } cuando backend responde (init)
 *  - 'error' con (error)
 *  - 'confirmed' con (data) cuando el backend confirma (return)
 * 
 * Uso (INIT):
 *  <WompiPay
 *    :mode="'init'"
 *    :payload="{ cliente, carrito, totales }"
 *    api-create-url="/api/pagos/wompi/crear-checkout"
 *    api-confirm-url="/api/pagos/wompi/confirmar"
 *  />
 *  // opcional: slot de disparador personalizado
 *  <WompiPay v-slot:trigger="{ start }" :payload="...">
 *    <button @click="start">Pagar ahora</button>
 *  </WompiPay>
 * 
 * Uso (RETURN) en tu ruta de retorno:
 *  <WompiPay
 *    :mode="'return'"
 *    api-create-url="/api/pagos/wompi/crear-checkout"
 *    api-confirm-url="/api/pagos/wompi/confirmar"
 *  />
 */
export default {
  name: 'WompiPay',
  props: {
    mode: { type: String, default: 'init' },
    returnPath: { type: String, default: '/pago/wompi/retorno' },
    payload: { type: Object, default: () => ({}) },
    apiCreateUrl: { type: String, default: '/api/pagos/wompi/crear-checkout' },
    apiConfirmUrl: { type: String, default: '/api/pagos/wompi/confirmar' },
    redirectOnSuccess: { type: Boolean, default: true },
    orderCompletedRouteName: { type: String, default: 'OrderCompleted' },
    storeSessionOnSuccess: { type: Boolean, default: true },
  },
  data() {
    return {
      loading: false,
      errorMsg: '',
    }
  },
  mounted() {
    if (this.mode === 'return') {
      this.processReturn()
    }
  },
  methods: {
    // --- INIT MODE ---
    async startPayment() {
      try {
        this.$emit('start')
        this.errorMsg = ''
        this.loading = true

        // Asegurar return_url en el payload
        const origin = window?.location?.origin || ''
        const returnUrl = this.normalizeReturnUrl(origin, this.returnPath)

        const body = {
          ...this.payload,
          metodo: 'WOMPI',
          return_url: returnUrl,
        }

        const res = await fetch(this.apiCreateUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        if (!res.ok) throw new Error('No se pudo crear el checkout en Wompi')
        const data = await res.json()

        if (!data?.ok || !data?.checkout_url) {
          throw new Error(data?.message || 'Respuesta inválida del backend (checkout_url ausente)')
        }

        this.$emit('created', { checkout_url: data.checkout_url })

        // Redirigir a Wompi
        window.location.href = data.checkout_url
      } catch (err) {
        console.error(err)
        this.errorMsg = err.message || 'Error iniciando el pago con Wompi'
        this.$emit('error', err)
      } finally {
        this.loading = false
      }
    },

    normalizeReturnUrl(origin, path) {
      if (!path) return origin
      // Si ya es absoluta, retornar tal cual
      if (/^https?:\/\//i.test(path)) return path
      // Unir origin + path relativo
      if (path.startsWith('/')) return `${origin}${path}`
      return `${origin}/${path}`
    },

    // --- RETURN MODE ---
    async processReturn() {
      try {
        this.errorMsg = ''
        const query = new URLSearchParams(window.location.search)
        const transactionId = query.get('transaction_id') || query.get('id') || ''
        const reference = query.get('reference') || query.get('ref') || ''
        const statusFront = query.get('status') || ''

        if (!transactionId) {
          throw new Error('No se recibió transaction_id en el retorno de Wompi')
        }

        const res = await fetch(this.apiConfirmUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transaction_id: transactionId,
            reference,
            status_front: statusFront
          })
        })
        if (!res.ok) throw new Error('Fallo confirmando el pago en backend')
        const data = await res.json()

        if (!data?.ok || !data?.id_pedido) {
          throw new Error(data?.message || 'Confirmación incompleta del backend')
        }

        // Guardar en sessionStorage para OrderCompleted
        if (this.storeSessionOnSuccess) {
          const payload = {
            id_pedido: data.id_pedido,
            id_cliente: data.id_cliente,
            referencia_pago: data.referencia_pago || reference,
            total_factura: data.total_factura || 0,
            fecha: data.fecha || new Date().toISOString().slice(0, 10),
            url_pdf: data.url_pdf || null,
            metodo: 'WOMPI'
          }
          try { sessionStorage.setItem('orderCompletedData', JSON.stringify(payload)) } catch (_) {}
        }

        this.$emit('confirmed', data)

        if (this.redirectOnSuccess) {
          this.$router.replace({ name: this.orderCompletedRouteName, query: { id: data.id_pedido } })
        }
      } catch (err) {
        console.error('WompiPay RETURN error:', err)
        this.errorMsg = err.message || 'No fue posible confirmar el pago.'
        this.$emit('error', err)
        // Aún en error, podemos llevar al usuario a la pantalla de finalización para dar feedback
        if (this.redirectOnSuccess) {
          this.$router.replace({ name: this.orderCompletedRouteName, query: { error: 'confirm_failed' } })
        }
      }
    }
  }
}
</script>

<style scoped>
.wompi-pay .btn {
  min-width: 220px;
}
</style>

<!--
===============================================================
EJEMPLOS DE USO
===============================================================

1) BOTÓN EN CUALQUIER VISTA (INIT):
-----------------------------------
<template>
  <WompiPay
    :payload="{
      cliente: formCliente,
      carrito: carrito,
      totales: totales,
    }"
    api-create-url="/api/pagos/wompi/crear-checkout"
    api-confirm-url="/api/pagos/wompi/confirmar"
    @created="({ checkout_url }) => console.log('Checkout Wompi:', checkout_url)"
    @error="onPayError"
  />
</template>

<script>
import WompiPay from '@/components/WompiPay.vue'
export default {
  components: { WompiPay },
  methods: {
    onPayError(err) {
      alert('No fue posible iniciar el pago con Wompi')
      console.error(err)
    }
  }
}
</script>

2) RUTA DE RETORNO (RETURN):
-----------------------------
// router/index.js
{
  path: '/pago/wompi/retorno',
  name: 'WompiReturn',
  component: {
    // Componente inline minimalista que solo monta WompiPay en modo RETURN
    render(h) { return h('div', [h('WompiPay', { props: { mode: 'return' } })]) },
    components: { WompiPay: () => import('@/components/WompiPay.vue') }
  }
},
{
  path: '/orden/completada',
  name: 'OrderCompleted',
  component: () => import('@/views/OrderCompleted.vue')
}

3) LÓGICA EN OrderCompleted.vue (lectura opcional):
---------------------------------------------------
mounted() {
  try {
    const raw = sessionStorage.getItem('orderCompletedData')
    if (raw) {
      const d = JSON.parse(raw)
      this.referencia_pago = d.referencia_pago
      this.total_factura = d.total_factura
      this.fechaHoy = d.fecha
      this.url_pdf = d.url_pdf
    }
  } catch(e) {}
}

4) CONTRATO BACKEND RECOMENDADO
--------------------------------
POST /api/pagos/wompi/crear-checkout
Body: {
  cliente: {...},
  carrito: [...],
  totales: { subtotal, envio, total },
  metodo: 'WOMPI',
  return_url: 'https://tusitio.com/pago/wompi/retorno'
}
Res: { ok: true, checkout_url }

POST /api/pagos/wompi/confirmar
Body: { transaction_id, reference?, status_front? }
Res: {
  ok: true,
  id_pedido,
  id_cliente,
  referencia_pago,
  total_factura,
  fecha,
  url_pdf
}

// En confirmar, tu backend valida el transaction_id con la API Wompi,
// si APPROVED => factura el pedido usando el MISMO flujo que contra entrega.

-->
