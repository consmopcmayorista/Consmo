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
      <router-link to="/envios" class="btn btn-primary btn-lg animate__animated animate__pulse animate__infinite">
          <i class="las la-map-marker"></i> Descubre el costo de tu domicilio en nuestro mapa interactivo
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
                              <select class="form-control" v-model="tip_doc_cliente">
                                  <option value="CC">Cédula de ciudadanía</option>
                                  <option value="NIT">NIT</option>
                                  <option value="CE">Cédula de extranjería</option>
                                  <option value="DNI">DNI</option>
                                  <option value="Pasaporte">Pasaporte</option>
                                  <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                              </select>
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Documento Cliente</label>
                              <input class="form-control" type="text" placeholder="Nit o Cédula" v-model="rut_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Nombres</label>
                              <input class="form-control" type="text" placeholder="Juan" v-model="nombre_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Apellidos</label>
                              <input class="form-control" type="text" placeholder="Salas" v-model="apellido_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>E-mail</label>
                              <input class="form-control" type="text" placeholder="example@email.com" v-model="email_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Celular</label>
                              <input class="form-control" type="text" placeholder="+57 123 456 789" v-model="tel_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Dirección</label>
                              <input class="form-control" type="text" placeholder="calle 666 #66-66" v-model="direccion_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Continuación de Dirección (opcional)</label>
                              <input class="form-control" type="text" placeholder="123 Street" v-model="direccion_cliente2" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Ciudad</label>
                              <input class="form-control" type="text" placeholder="Medellín" v-model="ciudad_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Departamento</label>
                              <input class="form-control" type="text" placeholder="Antioquia" v-model="departamento_cliente" />
                          </div>
                          <div class="col-md-12 form-group">
                              <div class="custom-control custom-checkbox">
                                  <input type="checkbox" class="custom-control-input" id="shipto" data-toggle="collapse" data-target="#shipping-address" />
                                  <label class="custom-control-label" for="shipto" data-toggle="collapse" data-target="#shipping-address">
                                      ¿Desea enviar a dirección diferente?
                                  </label>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!-- Dirección de envío adicional (oculta con collapse) -->
                  <div class="collapse mb-4" id="shipping-address">
                      <h4 class="font-weight-semi-bold mb-4">Dirección de Envío</h4>
                      <div class="row">
                          <div class="col-md-6 form-group">
                              <label>Nombres</label>
                              <input class="form-control" type="text" placeholder="María" v-model="e_nombre_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Apellidos</label>
                              <input class="form-control" type="text" placeholder="Salas" v-model="e_apellido_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>E-mail</label>
                              <input class="form-control" type="text" placeholder="example@email.com" v-model="e_email_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Celular</label>
                              <input class="form-control" type="text" placeholder="+57 123 456 789" v-model="e_tel_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Dirección</label>
                              <input class="form-control" type="text" placeholder="123 Street" v-model="e_direccion_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Continuación de Dirección (opcional)</label>
                              <input class="form-control" type="text" placeholder="123 Street" v-model="e_direccion_cliente2" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Ciudad</label>
                              <input class="form-control" type="text" placeholder="Medellín" v-model="e_ciudad_cliente" />
                          </div>
                          <div class="col-md-6 form-group">
                              <label>Departamento</label>
                              <input class="form-control" type="text" placeholder="Antioquia" v-model="e_departamento_cliente" />
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Columna resumen de orden -->
              <div class="col-xl-4 col-lg-5 col-md-6">
                  <h4 class="shop_cart_title ps-3">Tu orden</h4>
                  <div class="checkout_order mt-4">
                      <h4>producto</h4>

                      <!-- Itera los items del carrito -->
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
                          <div class="checkorder_cont subtotal-h">
                              <h5>Subtotal</h5>
                          </div>
                          <p class="checkorder_price">
                              ${{ Math.round(parseFloat(subtotal)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
                          </p>
                      </div>

                      <!-- IVA -->
                      <div class="single_check_order subs">
                          <div class="checkorder_cont subtotal-h">
                              <h5>Iva</h5>
                          </div>
                          <p class="checkorder_price">
                              ${{ Math.round(parseFloat(iva)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
                          </p>
                      </div>

                      <!-- Total -->
                      <div class="single_check_order total">
                          <div class="checkorder_cont">
                              <h5>Total</h5>
                          </div>
                          <p class="checkorder_price">
                              ${{ Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
                          </p>
                      </div>

                      <!-- Botón de Pago Contra Entrega -->
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
                                      <p><strong>Envíos a Medellín y alrededores:</strong> $11,000</p>
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

                      <!-- Botón Recoger en Punto de Venta -->
                      <div class="form-group">
                          <div class="payment-info">
                              <div class="option-label option-2" @click="toggleCollapse('puntoVenta')">
                                  <i class="fas fa-store"></i> Opción 2 (Recoger en Punto de Venta)
                              </div>
                              <v-collapse :show="showPuntoVenta">
                                  <ul>
                                      <p>Con nuestra opción <strong>Recoger en Punto de Venta</strong>...</p>
                                  </ul>
                                  <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_recoger.png" />
                                  <p></p>
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

                      <!-- Botón Transferencia Bancaria -->
 <!--                    <div class="form-group">
                          <div class="payment-info">
                              <div class="option-label option-3" @click="toggleCollapse('transferenciaBancaria')">
                                  <i class="fas fa-university"></i> Opción 3 (Transferencia Bancaria)
                              </div>
                              <v-collapse :show="showTransferenciaBancaria">
                                  <ul>
                                      <p>Realiza tu pago mediante <strong>transferencia bancaria</strong>...</p>
                                  </ul>
                                  <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_bancolombia.png" />
                                  <p></p>
                                  <ul>
                                      <p><strong>Datos para la transferencia:</strong></p>
                                      <p>Banco: Bancolombia</p>
                                      <p>Cuenta: 95874544408</p>
                                      <p>Tipo: Corriente</p>
                                      <p>Titular: Consmo PC Mayorista</p>
                                      <p>Total a transferir: ${{ Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                                  </ul>
                                  <button type="button" class="btn-bancolombia" @click="openBancolombiaPopup">
                                      Transferencia Bancaria
                                  </button>
                                  <p><em>¡Es fácil y seguro!</em></p>
                              </v-collapse>
                          </div>
                      </div>--> 
                  </div>
              </div>
          </div>
      </div>
  </div> 
</template>
<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const publicKey = ref(import.meta.env.VITE_WOMPI_PUBLIC_KEY);

console.log(publicKey.value)
const datos_ticket = ref([])
const ticket = ref([])
const producto_imprimir = ref([]);
const tip_doc_cliente = ref("Cédula de ciudadanía"); // Tipo de documento
const rut_cliente = ref(""); // Documento del cliente
const info_cliente_envio = ref([])
// Datos de facturación
const nombre_cliente = ref("");
const apellido_cliente = ref("");
const email_cliente = ref("");
const tel_cliente = ref("");
const direccion_cliente = ref("");
const direccion_cliente2 = ref(""); // Continuación de la dirección
const ciudad_cliente = ref("");
const departamento_cliente = ref("");

// Datos de envío si "shipTo" está activado
const e_nombre_cliente = ref("");
const e_apellido_cliente = ref("");
const e_email_cliente = ref("");
const e_tel_cliente = ref("");
const e_direccion_cliente = ref("");
const e_direccion_cliente2 = ref("");
const e_ciudad_cliente = ref("");
const e_departamento_cliente = ref("");

// Otros datos numéricos
let subtotal = ref(0)
let iva = ref(0)
let total = ref(0)
let amountInCents = ref(0)
let vatInCents = ref(0)
const fechaHoy = ref()
// Variables auxiliares
const reference = ref("")

const fechaHoy1 = new Date(); // Obtiene la fecha y hora actual

// Formatea la fecha como YYYY-MM-DD
const año = fechaHoy1.getFullYear();
const mes = String(fechaHoy1.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
const dia = String(fechaHoy1.getDate()).padStart(2, '0');

fechaHoy.value = `${año}-${mes}-${dia}`;

// ...
// infoFactura será un objeto, podemos usar reactive:
const infoFactura = reactive({
    reference: "",
    cliente: [],
    productos: [],
    info_cliente_envio: [],
    descuento: 0,
    sub_total_factura_bruto: 0,
    total_descuento: 0,
    sub_total_factura: 0,
    imp_iva_factura: 0,
    total_factura: 0,
    form_pago: "1",
    nota: "",
    fecha_fac: "",
    fecha_vencimiento: ""
})

const info_cliente = ref([])

function generateRef(length = 30) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let reference = '';
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues); // Genera valores aleatorios seguros

    for (let i = 0; i < length; i++) {
        reference += characters[randomValues[i] % characters.length];
    }

    return reference;
}

async function actualizarDatos() {
    if (
        nombre_cliente.value &&
        apellido_cliente.value &&
        email_cliente.value &&
        tel_cliente.value &&
        direccion_cliente.value &&
        rut_cliente.value &&
        parseFloat(total.value) > 0
    ) {
        // Construcción de info_factura
        const infoFactura = {
            productos: producto_imprimir.value,
            reference: reference.value,
            cliente: {
                nombres: nombre_cliente.value,
                apellidos: apellido_cliente.value,
                email: email_cliente.value,
                tel: tel_cliente.value,
                direccion: `${direccion_cliente.value} ${direccion_cliente2.value}`,
                ciudad: ciudad_cliente.value,
                departamento: departamento_cliente.value,
                tip_doc_cliente: tip_doc_cliente.value,
                rut_cliente: rut_cliente.value
            },
            sub_total_factura: subtotal.value,
            imp_iva_factura: iva.value,
            total_factura: total.value,
            form_pago: "2", // Identificador de pago con Wompi
            fecha_fac: new Date().toISOString().split("T")[0], // Fecha actual
            nota: "Compra ejecutada por página web, facturada para pago en línea."
        };

        // Guardar en localStorage
        localStorage.setItem("facturacion_web", JSON.stringify(infoFactura));

        // Enviar formulario de Wompi
        const form = document.getElementById("wompi");
        if (form) {
            form.submit();
        } else {
            console.error("No se encontró el formulario Wompi");
        }
    } else {
        alert("Llene los campos obligatorios");
    }
};

async function obtenerUltimoPedido() {
    try {
        const response = await axios.get('https://whatsapp-nube.com/api_web/api_ultimo_pedido.php?id_empresa=24')
        const ultimoPedido = response.data.nrofactura
        console.log('Último número de factura:', ultimoPedido)
        return ultimoPedido // Devuelve el número directamente
    } catch (error) {
        console.error('Error al obtener el último pedido:', error)
        return 0 // Devuelve 0 si hay un error
    }
}

// 3) Función llenar_satisfactorio (adaptada a Composition API)
async function llenar_satisfactorio(id, rutaArchivo) {
    // Si la ruta es index.html, muestra un modal
    if (rutaArchivo === "index.html") {
        document.querySelector('.product_quickview')?.classList.add('active')
        document.body.style.overflowY = 'hidden'
    }

    // Si la ruta incluye order-completed.html, entonces...
    if (rutaArchivo.includes('order-completed.html')) {
        // Verificamos que datos_ticket no sea null
        if (datos_ticket.value !== null) {
            const urlSearchParams = new URLSearchParams(window.location.search)
            let referenciaURL = urlSearchParams.get("id")

            if (!referenciaURL || referenciaURL === "null") {
                const ultimoPedido = await obtenerUltimoPedido()

                if (ultimoPedido && !isNaN(ultimoPedido) && parseInt(ultimoPedido) > 0) {
                    // Se le suma 1 a lo que se haya obtenido
                    referencia_pago.value = (parseInt(ultimoPedido) + 1).toString()
                } else {
                    // Si no hay datos válidos, iniciamos en "1"
                    referencia_pago.value = "1"
                }
            } else {
                // Si ya viene en la URL, lo usamos tal cual
                referencia_pago.value = referenciaURL
            }

            // Llamamos a facturar_pedido pasando id
            facturar_pedido(id)
        } else {
            // Si no hay datos_ticket, redirigimos al carrito
            window.location.href = "carrito.html"
        }
    }
}

// 4) Función llamar_ultima (adaptada a Composition API)
async function llamar_ultima() {
    const ultimo_pedido = await obtenerUltimoPedido()
    console.log("Último pedido:", ultimo_pedido)
}

async function recogerEnPuntoDeVenta() {
    if (
        nombre_cliente.value !== '' &&
        apellido_cliente.value !== '' &&
        email_cliente.value !== '' &&
        tel_cliente.value !== '' &&
        parseFloat(total.value) > 0
    ) {
        // Agregar la información del cliente
        info_cliente.value.push({
            nombres: nombre_cliente.value,
            apellidos: apellido_cliente.value,
            email: email_cliente.value,
            tel: tel_cliente.value,
            direccion: direccion_cliente.value + (direccion_cliente2.value || ""),
            ciudad: ciudad_cliente.value,
            departamento: departamento_cliente.value,
            tip_doc_cliente: tip_doc_cliente.value,
            rut_cliente: rut_cliente.value
        })

        // Armar el objeto de facturación
        infoFactura.value = {
            productos: producto_imprimir.value,
            reference: reference.value,
            cliente: info_cliente.value,
            descuento: 0,
            sub_total_factura_bruto: subtotal.value,
            total_descuento: 0,
            sub_total_factura: subtotal.value,
            imp_iva_factura: iva.value,
            total_factura: total.value,
            form_pago: "3",
            nota: "Compra ejecutada por página web, facturada para recogida en punto de venta.",
            fecha_fac: fechaHoy.value,
            fecha_vencimiento: fechaHoy.value
        }

        // Guardar en localStorage
        const arrayJson = JSON.stringify(infoFactura.value)
        localStorage.setItem("facturacion_web", arrayJson)

        // Redirigir a la página de confirmación
        window.location.href = "/compra-exitosa"
    } else {
        alert("Por favor, completa todos los campos obligatorios")
    }
}

async function pagoContraEntrega() {
    console.log(nombre_cliente.value)
    console.log(apellido_cliente.value)
    console.log(email_cliente.value)
    console.log(tel_cliente.value)
    console.log(direccion_cliente.value)
    console.log(total.value)

    if (
        nombre_cliente.value !== "" &&
        apellido_cliente.value !== "" &&
        email_cliente.value !== "" &&
        tel_cliente.value !== "" &&
        direccion_cliente.value !== "" &&
        rut_cliente.value !== "" &&
        parseFloat(total.value) > 0
    ) {
        // Obtener número de factura

        // Llenar info_cliente
        info_cliente.value.push({
            nombres: nombre_cliente.value,
            apellidos: apellido_cliente.value,
            email: email_cliente.value,
            tel: tel_cliente.value,
            direccion: direccion_cliente.value + direccion_cliente2.value,
            ciudad: ciudad_cliente.value,
            departamento: departamento_cliente.value,
            tip_doc_cliente: tip_doc_cliente.value,
            rut_cliente: rut_cliente.value
        })

        // Verificamos si hay shipTo
        const checkbox = document.getElementById('shipto')
        if (checkbox && checkbox.checked) {
            info_cliente_envio.value.push({
                nombres: enombre_cliente.value,
                apellidos: eapellido_cliente.value,
                email: eemail_cliente.value,
                tel: etel_cliente.value,
                direccion: edireccion_cliente.value + edireccion_cliente2.value,
                ciudad: eciudad_cliente.value,
                departamento: edepartamento_cliente.value
            })
        } else {
            info_cliente_envio.value.push({
                nombres: nombre_cliente.value,
                apellidos: apellido_cliente.value,
                email: email_cliente.value,
                tel: tel_cliente.value,
                direccion: direccion_cliente.value + direccion_cliente2.value,
                ciudad: ciudad_cliente.value,
                departamento: departamento_cliente.value
            })
        }

        // Rellenar infoFactura
        infoFactura.productos = producto_imprimir.value,
            infoFactura.reference = reference.value
        infoFactura.cliente = info_cliente.value
        infoFactura.info_cliente_envio = info_cliente_envio.value
        infoFactura.descuento = 0
        infoFactura.sub_total_factura_bruto = subtotal.value
        infoFactura.total_descuento = 0
        infoFactura.sub_total_factura = subtotal.value
        infoFactura.imp_iva_factura = iva.value
        infoFactura.total_factura = total.value
        infoFactura.form_pago = "1"
        infoFactura.nota = "Compra ejecutada por página web, facturada para contra entrega."
        infoFactura.fecha_fac = fechaHoy.value
        infoFactura.fecha_vencimiento = fechaHoy.value

        // Convertir a JSON y guardar en localStorage
        const arrayJson = JSON.stringify(infoFactura)
        localStorage.setItem("facturacion_web", arrayJson)

        // Redirigir
        window.location.href = "/compra-exitosa"
    } else {
        alert("Llene los campos obligatorios")
    }
}

onMounted(() => {
    datos_ticket.value = JSON.parse(localStorage.getItem('ticket'))
    ticket.value = datos_ticket.value.productos
    actualizarTotales()
    cargar_detalles();
    reference.value = generateRef();
})

function cargar_detalles() {
    producto_imprimir.value = []; // Reiniciar el array
    console.log(ticket.value)
    if (ticket.value && ticket.value.length > 0) {
        ticket.value.forEach((element) => {
            const valor2 = element.precio / 1.19;
            const iva2 = element.precio - valor2;
            const total2 = element.precio * element.cant;

            producto_imprimir.value.push({
                id: element.id,
                idpro: element.tags,
                titulo: element.descripcion,
                cant: element.cant,
                valor: parseFloat(valor2.toFixed(2)), // Redondear a 2 decimales
                desc: 0,
                tot_desc: 0,
                valor_desc: parseFloat(valor2.toFixed(2)), // Redondear a 2 decimales
                iva: 19,
                impuesto: parseFloat(iva2.toFixed(2)), // Redondear a 2 decimales
                precio: parseFloat(element.precio), // Redondear a 2 decimales
                total: parseFloat(total2.toFixed(2)), // Redondear a 2 decimales
                lista_precio: [],
            });
        });

        infoFactura.productos.value = producto_imprimir.value; // Actualizar la factura
    }
}

function actualizarTotales() {
    total.value = ticket.value.reduce((acumulador, actual) => acumulador + (actual.cant * parseFloat(actual.precio)), 0);
    subtotal.value = Math.floor(total.value / 1.19); // Redondear el subtotal hacia abajo
    iva.value = Math.round(total.value - subtotal.value);

    // Convertir a centavos y asegurarse de que sean enteros
    amountInCents.value = Math.round(total.value * 100);
    vatInCents.value = Math.round(iva.value * 100);

    console.log('Total:', total.value);
    console.log('Amount in Cents:', amountInCents.value);
    console.log('VAT in Cents:', vatInCents.value);
}

function imprimir_carrito_checkout(arreglo_car, total) {
    var valores = '';
    var cant_productos = 0;
    arreglo_car.productos.forEach((datos) => {
        var codigo1 = datos.id;
        var codigo2 = '"' + codigo1 + '"';
        var descripcion1 = datos.descripcion;
        var descripcion2 = '"' + descripcion1 + '"';
        var precio1 = datos.precio;
        var cant1 = datos.cant;
        var foto1 = datos.foto;
        var subtotal1 = precio1 * cant1;
        precio1 = new Intl.NumberFormat().format(datos.precio);
        subtotal1 = new Intl.NumberFormat().format(subtotal1);

        valores += `<div class="single_shop_cart d-flex align-items-center flex-wrap">
                          <div class="cart_img mb-4 mb-md-0">
                              <img loading="lazy" src='${foto1}'  alt="product">
                          </div>
                          <div class="cart_cont">
                              <a href="product-view.html">
                                  <h5>${descripcion1}</h5>
                              </a>
                              <p class="price">${precio1}</p>
                             
                          </div>
                          <div class="cart_qnty d-flex align-items-center ms-md-auto">
                              <div class="cart_qnty_btn">
                                  <i class="las la-minus"></i>
                              </div>
                              <div class="cart_count">${cant1}</div>
                              <div class="cart_qnty_btn">
                                  <i class="las la-plus"></i>
                              </div>
                          </div>
                          <div class="cart_price ms-auto">
                              <p>${subtotal1}</p>
                          </div>
                          <div class="cart_remove ms-auto">
                               <i class="icon-trash"></i>
                          </div>
                      </div>`;
        cant_productos++;
    });

    total_monto = new Intl.NumberFormat().format(total);
    document.getElementById("lista_productos").innerHTML = valores;
    document.getElementById("casilla_monto").innerHTML = "$" + total_monto;
    document.getElementById("monto_total").innerHTML = "$" + total_monto;
}

function openBancolombiaPopup() {
    alert(`Por favor realiza una transferencia bancaria a la siguiente cuenta:\n\nBanco: Bancolombia\nCuenta: 123456789\nTitular: Consmo PC Mayorista\n\nTotal a transferir: $${Math.round(parseFloat(total.value)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
}
</script>

<style scoped>
/* Estilos generales */
.container {
    margin-top: 20px;
}

.breadcrumbs {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
}

.breadcrumbs a {
    color: #333;
    text-decoration: none;
}

.breadcrumbs a.active {
    font-weight: bold;
}

.cart_area {
    background: #f9f9f9;
    padding: 20px 0;
}

.shop_cart_title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.payment-info {
    margin-top: 20px;
}

.payment-info .option-label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.payment-info ul {
    list-style-type: none;
    padding: 0;
}

.payment-info ul p {
    margin: 5px 0;
}

.payment-policies-link {
    display: block;
    margin-top: 10px;
    color: #007bff;
    text-decoration: none;
}

.payment-policies-link:hover {
    text-decoration: underline;
}

.single_check_order {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.single_check_order.subs {
    font-weight: bold;
}

.single_check_order.total {
    font-size: 20px;
    font-weight: bold;
}

.checkorder_cont h5 {
    margin: 0;
}

.checkorder_qnty,
.checkorder_price {
    margin: 0;
}

/* Estilos específicos para cada opción de pago */

/* Opción 1: Contra Entrega */
.option-1 {
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 15px;
    border-radius: 5px;
}

.btn-contra-entrega {
    background-color: #dc3545;
    color: #fff;
}

.btn-contra-entrega:hover {
    background-color: #c82333;
}

/* Opción 2: Recoger en Punto de Venta */
.option-2 {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    padding: 15px;
    border-radius: 5px;
}

.btn-punto-venta {
    background-color: #28a745;
    color: #fff;
}

.btn-punto-venta:hover {
    background-color: #218838;
}

/* Opción 3: Transferencia Bancaria */
.option-3 {
  background-color: #f8d7da;
    border: 1px solid #f5c6cb;
    padding: 15px;
    border-radius: 5px;
}

.btn-bancolombia {
    background-color: #dc3545;
    color: #fff;
}

.btn-bancolombia:hover {
    background-color: #138496;
}
</style>