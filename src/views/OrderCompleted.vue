<template>
        <!-- breadcrumbs -->
        <div class="container">
        <div class="breadcrumbs">
            <a href="/"><i class="las la-home"></i></a>
            <a href="#" class="active">Compra Exitosa</a>
        </div>
    </div>

    <!-- order complete -->
    <div class="cart_area section_padding_b">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="order_complete">
                                <!-- image  -->
                                <div class="complete_icon">
                                    <img loading="lazy"  src="/assets/images/complete.png" alt="success">
                                </div>
                                <!-- description  -->
                                <div class="order_complete_content">
                                    <h4>Tu compra se ha realizado exitosamente. ¡Gracias por tu compra!</h4>
                                    <ul class="list-group">
            
            
                                  <li class="list-group-item">Referencia :{{referencia_pago}}</li>
                                    <li class="list-group-item">Monto: {{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total_factura)}}</li>
                                  <li class="list-group-item">Fecha: {{fechaHoy}}</li>
                                  
                                </ul>
                                    <p>Recibirás un correo electrónico con la confirmación de tu compra y los detalles de envío.</p>
                                        <!-- button  -->
                                        <div class="order_complete_btn">
                                            <a @click="verCompra" class="default_btn second rounded">Ver Compra</a>
                                        </div>
                                        <div class="order_complete_btn">
                                            <a href="/"   class="default_btn rounded">Volver a la página principal</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue'
import { jsPDF } from "jspdf";        // Importamos la clase jsPDF
import "jspdf-autotable";            // Importamos el plugin para tablas (si lo necesitas)

const referencia_pago = ref("");
const reference = ref("");
const valores_factura = ref({});
const total_factura = ref(0)
onMounted(async () => {
  try {
    valores_factura.value = JSON.parse(localStorage.getItem('facturacion_web')) || {};
    console.log(valores_factura.value);

    // Obtener el último pedido
    const ultimoPedido = await obtenerUltimoPedido();

if (!ultimoPedido || ultimoPedido === "null") {
  referencia_pago.value = "REF-00001";
} else {
  // Extraer solo la parte numérica eliminando "REF-"
  const numeroStr = ultimoPedido.replace(/\D/g, ""); // Remueve todo lo que no sea número
  const numero = parseInt(numeroStr, 10) + 1; // Convierte a número e incrementa

  // Formatear de nuevo con ceros a la izquierda y el prefijo REF-
  referencia_pago.value = `REF-${numero.toString().padStart(5, "0")}`;
}

    total_factura.value= valores_factura.value.total_factura
    await facturar_pedido(referencia_pago.value)
  } catch (error) {
    console.error("Error en onMounted:", error);
  }
});

async function obtenerUltimoPedido() {
  try {
    const response = await axios.get('https://whatsapp-nube.com/api_web/api_ultimo_pedido.php?id_empresa=24');
    const ultimoPedido = response.data.nrofactura;
    console.log('Último número de factura:', ultimoPedido);
    return ultimoPedido || 0; // Devuelve 0 si no hay datos
  } catch (error) {
    console.error('Error al obtener el último pedido:', error);
    return 0; // Devuelve 0 si hay un error
  }
}
function verCompra() {
 
  imprimirListadoConJsPDF(valores_factura.value, referencia_pago.value);
}

function imprimirListadoConJsPDF(infoFactura , refPago ) {
  try {
    // 1. Crear la instancia de jsPDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "letter"
    });

    // 2. Extraer datos básicos
    const nropedido = refPago;
    const info = infoFactura; // Estructura principal de la factura
    // Si "info.cliente" es un array, tomamos el primer elemento
    const cliente = (info.cliente && info.cliente.length > 0) ? info.cliente[0] : null;

    // 3. Dibujar Encabezado
    doc.setFontSize(10);
    doc.text("Consmo PC Mayorista SAS", 220, 30);
    doc.text("CALLE 48C Nº 65A-24", 220, 45);
    doc.text("Tel: +57 301 5681832", 220, 60);

    doc.addImage('/assets/images/120x24.png', 'PNG', 30, 15, 80, 40);
    doc.setFontSize(8);
    doc.text(`Pedido N°: ${nropedido}`, 400, 30);

    // Datos del Cliente
    if (cliente) {
      doc.text(`${cliente.tip_doc_cliente}: ${cliente.rut_cliente}`, 400, 45);

      doc.text(`Fecha: ${info.fecha_fac || ''}`, 40, 80);
      doc.text(`Cliente: ${cliente.nombres} ${cliente.apellidos}`, 40, 95);
      doc.text(`Teléfono: ${cliente.tel}`, 40, 110);
      doc.text(`Dirección: ${cliente.direccion} - ${cliente.ciudad}`, 40, 125);
    }

    const productos = infoFactura.productos || [];
  
  // arrayRows: array bidimensional
  const arrayRows = productos.map(item => {
    const valor = item.valor || 0;
    const iva = item.iva || 0;
    const impuesto = item.impuesto || 0;
    const precio = item.precio || 0;
    const cant = item.cant || 0;
    const total = cant * precio;
    
    return [
      item.idpro || "",
      item.titulo || "",
      valor,
      iva,
      impuesto,
      precio,
      cant,
      total
    ];
  });

  doc.autoTable({
    startY: 150,
    theme: "grid",
    head: [["Cod","Descripcion","Precio","IVA","Impuesto","T Precio","Cant","Total"]],
    body: arrayRows,
  
    styles: { 
        fontSize: 7,
        fillColor: [204, 229, 255],   // color azul claro en el fondo
        textColor: [0, 0, 0],         // texto negro
      },
      headStyles: {
        fillColor: [0, 51, 153],      // azul oscuro en el encabezado
        textColor: [255, 255, 255],   // texto blanco
        fontStyle: "bold"
      },
      bodyStyles: {
        fillColor: [204, 229, 255],   // fondo azul claro para las filas
        textColor: [0, 0, 0]
      }
  });

  let sumImpuesto = 0;
  let sumTotal = 0;
  arrayRows.forEach(row => {
    // row[4] = impuesto, row[7] = total
    sumImpuesto += Number(row[4]) || 0;
    sumTotal += Number(row[7]) || 0;
  });
  const subTotal = sumTotal - sumImpuesto;

  // (4) Tabla de totales
  const resumenTabla = [
    ["Subtotal", subTotal.toFixed(2)],
    ["Descuento", "0"],
    ["Impuestos", sumImpuesto.toFixed(2)],
    ["Total", sumTotal.toFixed(2)]
  ];

  const finalY = doc.lastAutoTable.finalY + 20;
  doc.autoTable({
    head: [["Concepto", "Valor"]],
    body: resumenTabla,
    startY: finalY,
    theme: "grid",
    styles: { fontSize: 8 },
    tableWidth: 150,
    margin: { left: 350 },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: "bold"
    },
    bodyStyles: {
      textColor: [0, 0, 0],
      fontStyle: "normal"
    }
  });


  // ... subtotales, totales, etc.
  window.open(doc.output("bloburl"), "_blank");
    
  } catch (error) {
    console.error("Error generando PDF con jsPDF:", error);
  }
}

async function enviar_email(refPago, idPedido, idCliente) {
  // Obtener la información de facturación desde localStorage
  const storedInfo = localStorage.getItem('facturacion_web')
  if (!storedInfo) {
    console.error('No se encontró la información de facturación en localStorage')
    return
  }

  const infoImprimir = JSON.parse(storedInfo)
  console.log('Información de facturación:', infoImprimir)
  const arrayJson = JSON.stringify(infoImprimir)

  // Preparar el FormData para enviar a la API
  const formData = new FormData()
  formData.append('factura', arrayJson)
  formData.append('ref', refPago)
  formData.append('id_empresa', '24')
  formData.append('id_pedido', idPedido)
  formData.append('id_cliente', idCliente)

  const URL = '/mail/enviar_pedi.php'

  try {
    const res = await axios.post(URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    // Limpiar la información almacenada después de enviar
    localStorage.removeItem('ticket')
    localStorage.removeItem('facturacion_web')
    return res.data
  } catch (error) {
    console.error('Error en enviarEmail:', error)
    throw error
  }
}




async function facturar_pedido(id) {
  try {
    // Obtener los datos de facturación almacenados en localStorage
    const infoImprimir = JSON.parse(localStorage.getItem('facturacion_web')) || {}
    console.log(infoImprimir)
    
    if (!infoImprimir || Object.keys(infoImprimir).length === 0) {
      console.error("Datos de facturación no encontrados en localStorage")
      return
    }

    // Convertir la información a JSON
    const arrayJson = JSON.stringify(infoImprimir)

    // Preparar el FormData para enviar a la API
    const formData = new FormData()
    formData.append('factura', arrayJson)
    formData.append('id', '24')
    formData.append('documento', "8")
    formData.append('referencia_pago', id)

    const URL = 'https://whatsapp-nube.com/api_web/api_pos_pedido_web.php'

    // Realizar la petición POST con axios
    const res = await axios.post(URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    // Actualizar la variable total con el total de la factura
   // total.value = infoImprimir.total_factura

    // Asumimos que la respuesta devuelve un arreglo en el que:
    // res.data[1] es el id del pedido y res.data[2] el id del cliente.
    const id_pedido = res.data[1]
    const id_cliente = res.data[2]

    if (!id_pedido || !id_cliente) {
      console.error("ID de pedido o cliente no devueltos por la API")
      return
    }

    // Llamamos a la función para enviar el email, pasando los datos correspondientes
    enviar_email(id, id_pedido, id_cliente)
  } catch (error) {
    console.error("Error al facturar el pedido:", error)
  }
}
</script>