<template>
        <!-- breadcrumbs -->
        <div class="container">
        <div class="breadcrumbs">
            <a href="index.html"><i class="las la-home"></i></a>
            <a href="shop-list.html">Tienda</a>
            <a  class="active">Procesar Pago</a>
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
                <div class="col-xl-8 col-lg-7 col-md-6">
                    <h4 class="shop_cart_title mb-4 ps-3">Información Facturacion y Envio</h4>
                   <div class="mb-4">
                   
                        
                    <p>referencia:{{reference}}</p>
                    <div class="row">
                        
                        <div class="col-md-6 form-group">
                            <label>Tipo de Documento</label>
                            <select class="form-control" v-model="tip_doc_cliente">
                                 <option value="Cédula de ciudadanía" :selected="tipo_documento_womp === 'CC'">Cédula de ciudadanía</option> 
                                <option value="NIT" :selected="tipo_documento_womp === 'NIT'">NIT</option>
                                <option value="Cédula de extranjería" :selected="tipo_documento_womp === 'CE'">Cédula de extranjería</option> 
                                <option value="DNI" :selected="tipo_documento_womp === 'DNI'">DNI</option>
                                <option value="Pasaporte" :selected="tipo_documento_womp === 'PP'">Pasaporte</option> 
                                <option value="Tarjeta de identidad" :selected="tipo_documento_womp === 'TI'">Tarjeta de identidad</option> 
                                
                               
                               
                            </select>
                            
                        </div>
                         <div class="col-md-6 form-group">
                            <label>Documento Cliente</label>
                            <input class="form-control" type="text" placeholder="Nit o Cedula" v-model="rut_cliente">
                        </div>
                        
                        <div class="col-md-6 form-group">
                            <label>Nombres</label>
                            <input class="form-control" type="text" placeholder="juan" v-model="nombre_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Apellidos</label>
                            <input class="form-control" type="text" placeholder="Salas" v-model="apellido_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>E-mail</label>
                            <input class="form-control" type="text" placeholder="example@email.com"  v-model="email_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Celular</label>
                            <input class="form-control" type="text" v-on:keyup="e_tel_cliente=tel_cliente" placeholder="+57 123 456 789" v-model="tel_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Direccion</label>
                            <input class="form-control" type="text" v-on:keyup="e_direccion_cliente=direccion_cliente" placeholder="calle 666 #66-66" v-model="direccion_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Continuacion de Direccion (opcional)</label>
                            <input class="form-control" type="text" placeholder="123 Street" v-model="direccion_cliente2">
                        </div>
                       
                        <div class="col-md-6 form-group">
                            <label>Ciudad</label>
                            <input class="form-control" type="text"  v-on:keyup="e_ciudad_cliente=ciudad_cliente" placeholder="Medellin" v-model="ciudad_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Departamento</label>
                            <input class="form-control" type="text"  v-on:keyup="e_departamento_cliente=departamento_cliente" placeholder="Antioquia" v-model="departamento_cliente">
                        </div>
                        <!--<div class="col-md-6 form-group">
                            <label>ZIP Code</label>
                            <input class="form-control" type="text" placeholder="123">
                        </div>
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="newaccount">
                                <label class="custom-control-label" for="newaccount">Create an account</label>
                            </div>
                        </div>-->
                        <div class="col-md-12 form-group">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="shipto" for="shipto"  data-toggle="collapse" data-target="#shipping-address">
                                <label class="custom-control-label" for="shipto"  data-toggle="collapse" data-target="#shipping-address">Desea enviar a direccion diferente?</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collapse mb-4" id="shipping-address">
                    <h4 class="font-weight-semi-bold mb-4">Direccion de Envio</h4>
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <label>Nombres</label>
                            <input class="form-control" type="text" placeholder="Maria" v-model="e_nombre_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Apellidos</label>
                            <input class="form-control" type="text" placeholder="Salas" v-model="e_apellido_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>E-mail</label>
                            <input class="form-control" type="text" placeholder="example@email.com" v-model="e_email_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Celular</label>
                            <input class="form-control" type="text" placeholder="+57 123 456 789" v-model="e_tel_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Direccion</label>
                            <input class="form-control" type="text" placeholder="123 Street" v-model="e_direccion_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Continuacion de Direccion(opcional)</label>
                            <input class="form-control" type="text" placeholder="123 Street" v-model="e_direccion_cliente2">
                        </div>
                       
                        <div class="col-md-6 form-group">
                            <label>Ciudad</label>
                            <input class="form-control" type="text" placeholder="Medellin" v-model="e_ciudad_cliente">
                        </div>
                        <div class="col-md-6 form-group">
                            <label>Departamento</label>
                            <input class="form-control" type="text" placeholder="Antioquia" v-model="e_departamento_cliente">
                        </div>
                        
                    </div>
                </div>
                </div>

                <!-- order information wrapper  -->
                <div class="col-xl-4 col-lg-5 col-md-6">
                    <h4 class="shop_cart_title ps-3">Tu orden</h4>
                    <div class="checkout_order mt-4">
                        <h4>producto</h4>
                        <!-- single product info  -->
                        <div class="single_check_order"  v-for="(dato, index) of ticket" :key="index">
                            <div class="checkorder_cont">
                                <h5>{{dato.descripcion}}</h5>
                                
                            </div>
                            <p class="checkorder_qnty">x{{dato.cant}}</p>
                            <p class="checkorder_price">${{ Math.round(parseFloat(dato.precio)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                        </div>
                        
                        <!-- subtotal  -->
                        <div class="single_check_order subs">
                            <div class="checkorder_cont subtotal-h">
                                <h5>Subtotal</h5>
                            </div>
                            <p class="checkorder_price">${{ Math.round(parseFloat(subtotal)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                        </div>
                        <!-- shipping  -->
                        <div class="single_check_order subs">
                            <div class="checkorder_cont subtotal-h">
                                <h5>Iva</h5>
                            </div>
                            <p class="checkorder_price">${{ Math.round(parseFloat(iva)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                        </div>
                        <!-- total  -->
                        <div class="single_check_order total">
                            <div class="checkorder_cont">
                                <h5>Total</h5>
                            </div>
                            <p class="checkorder_price">${{ Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</p>
                        </div>
                        
                <!--           <div class="form-group">
                               <button class="btn btn-primary col-12" id="button-checkout" @click="createPreference">Pagar con MercadoPago</button>
                              
                        </div>-->

                                                <!--Boton Contra entrega-->


                        <div class="form-group">
                            <div class="payment-info">
                                <div class="option-label option-1"><i class="fas fa-handshake"></i> Opción 1 (Contra Entrega)</div>
                                <ul>
                                <p>Ahora puedes realizar tu pedido con <strong>pago contra entrega</strong>, y te explicamos cómo funciona:</p>
                                </ul>
                                <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_contraentrega.png">

                                <ul>
                                    <p><strong>Envíos a Medellín y sus alrededores:</strong> El costo de envío es <strong>$11,000</strong></p>
                                    <p><strong>Envíos a otras ciudades:</strong> Si tu pedido es para otra ciudad fuera de Medellín, uno de nuestros asesores se pondrá en contacto contigo de inmediato</p>
                                </ul>
                                <p></p>
                            

                            </div>


                            
                            <button type="button" class="btn-contra-entrega" @click="pagoContraEntrega">Pago Contra Entrega</button>
                            <p></p>

                            <p><em>¡Tu comodidad es nuestra prioridad!</em> Una vez que aceptes el pago contra entrega, nuestro equipo estará en contacto contigo para que tu experiencia sea rápida y segura.</p>
                                
                            <a href="#" class="payment-policies-link">Políticas de Pago Contra Entrega</a> <!-- Aquí puedes poner el enlace a las políticas -->
                            
                                
                        </div>

                        <hr style="margin: 20px 0; border-top: 3px solid #000000;">
                        <hr style="margin: 20px 0; border-top: 3px solid #000000;">


                                    <!--Boton recoger punto de venta-->
                                    <div class="form-group">
                                        <div class="payment-info">
                                            <div class="option-label option-2"><i class="fas fa-store"></i> Opción 2 (Recoger en Punto de Venta)</div>
                                            <ul>
                                                <p>Con nuestra opción de <strong>Recoger en Punto de Venta</strong>, puedes ahorrar tiempo y dinero:</p>

                                            </ul>
                                            <img style="width:100%;" src="https://consmopcmayorista.com/images2/banner_recoger.png">
                                            <p></p>
                                    
                                            <ul>
                                                <p><strong>Recoge tu pedido en nuestra tienda:</strong> Una vez confirmado el pedido, estará listo para que lo recojas en nuestras instalaciones.</p>
                                                <p><strong>Horario de atención:</strong> Lunes a viernes, de 8:30 a.m. a 6:00 p.m.</p>
                                                <p>Sabados de 8:30 a.m. a 1:00 p.m.</p>
                                            </ul>
                                            <p>Calle 48C #65A-24 Suramericana, Medellín</p>
                                            <p></p>
                                        </div>
                                    
                                        <button type="button" class="btn-punto-venta" @click="recogerEnPuntoDeVenta">Recoger en Punto de Venta</button>
                                        <p></p>
                                    
                                        <p><em>¡Es fácil y rápido!</em> Cuando selecciones esta opción, uno de nuestros asesores te confirmará cuándo tu pedido estará listo para recoger.</p>

                                        <a href="#" class="payment-policies-link">Políticas de Recogida en Punto de Venta</a> <!-- Aquí puedes poner el enlace a las políticas -->
                                    </div>
                                    
                        
                         

                        <hr style="margin: 20px 0; border-top: 3px solid #000000;">
                        <hr style="margin: 20px 0; border-top: 3px solid #000000;">
                        
                         
                        <div class="form-group">
                            <div class="option-label option-3"><i class="fas fa-lock"></i> Opción 3 (Pagos con Wompi Pasarela)</div>
                            <div class="custom-control custom-radio">
                                <p>Una vez se confirme el pago un asesor se contactará para los terminos de envío. Conoce mas de Wompi<a href="https://wompi.com/es/co/que-es-wompi?&&" target="_blank">  Aquí</a></p>
                                <p>Wompi es una de las  pasarela de pago mas reconocida en toda Colombia.</p>

                                <img style="width:100%;" src="https://antioquenadebasculas.com/images/pagos-wompi.png">
                                
                                <br/><br/><br/>
                            
                            </div>
                        </div>
                        
                        <div class="checkorder_agree custom_check check_2">
                            <input type="checkbox" class="check_inp" hidden id="save-default">
                            <label for="save-default">Acepto <a href="#" class="text-color">Terminos y Condiciones</a></label>
                        </div>
                     
                        
                        <div class="cart_sum_pros">
                         
                         <form id="wompi" action="https://checkout.wompi.co/p/" method="get">  
                         
                              
                              <input type="hidden" name="public-key" :value=key />
                              <input type="hidden" name="currency" value="COP" />
                              <input type="hidden" name="amount-in-cents" :value="Math.round(total * 100)" />
                              <input type="hidden" name="reference" :value=reference />
                              <input type="hidden" name="redirect-url" value="https://www.consmopcmayorista.com/order-completed.html">
                           
                           
                             
                              <input type="hidden" name="tax-in-cents:vat" :value="Math.round(iva * 100)" />
                            
                              <input type="hidden" name="customer-data:email" :value=email_cliente />
                              <input type="hidden" name="customer-data:full-name" :value=nombre_cliente+apellido_cliente />
                              <input type="hidden" name="customer-data:phone-number" :value=tel_cliente />
                              <input type="hidden" name="customer-data:legal-id" :value=rut_cliente />
                              <input type="hidden" name="customer-data:legal-id-type" :value=tipo_documento_womp />
                              <input type="hidden" name="shipping-address:address-line-1" :value=e_direccion_cliente />
                              <input type="hidden" name="shipping-address:country" value="CO" />
                              <input type="hidden" name="shipping-address:phone-number" :value=e_tel_cliente />
                              <input type="hidden" name="shipping-address:city" :value=e_ciudad_cliente />
                              <input type="hidden" name="shipping-address:region" :value=e_departamento_cliente />
                              <button type="button" @click="actualizar_datos">Pagar con Wompi</button>
                         </form>
                            
                    </div>
                             
                    <div id="wompi-widget"></div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
const datos_ticket =ref([])
const ticket = ref([])
const total = ref()
const subtotal =ref()
const iva = ref()


onMounted(() => {
    datos_ticket.value = JSON.parse(localStorage.getItem('ticket'))
    ticket.value = datos_ticket.value.productos
    actualizarTotales()
})

function actualizarTotales() {
     
     total.value = ticket.value.reduce((acumulador, actual) => acumulador + (actual.cant * parseFloat(actual.precio)), 0);
     subtotal.value = parseFloat(total.value) / 1.19;
     iva.value = total.value - subtotal.value;
     
     console.log(total.value)
   }

function imprimir_carrito_checkout(arreglo_car, total){
    
    var valores='';

      var cant_productos = 0;
       arreglo_car.productos.forEach((datos)=>{
      
       var codigo1 = datos.id;
       var codigo2 = '"'+codigo1+'"';
       var descripcion1 = datos.descripcion;
        var descripcion2 = '"'+descripcion1+'"';
       var precio1 = datos.precio;
       
       var cant1 = datos.cant;
       var foto1 = datos.foto;
       var subtotal1=precio1*cant1;
       precio1=new Intl.NumberFormat().format(datos.precio);
       subtotal1=new Intl.NumberFormat().format(subtotal1);
        
       valores+=`<div class="single_shop_cart d-flex align-items-center flex-wrap">
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
                      </div>`
        
        
        
      /*valores+="<li class='list-group-item d-flex justify-content-between lh-sm'><div><h6 class='my-0'>Producto:</h6><small class='text-muted'>"+descripcion1+"</small></div><span class='text-muted'>"+precio1+"X"+cant1+"</span></br><span class='text-muted'>Subtotal $"+subtotal1+"</span></li>"; */
      
      cant_productos++;
  })
  
    total_monto=new Intl.NumberFormat().format(total);
      
 
      
 
  
    
    
  //  document.getElementById("cant_productos").innerHTML=cant_productos;
  //  document.getElementById("total_productos").innerHTML=total_monto;
    
   
    document.getElementById("lista_productos").innerHTML=valores;
     document.getElementById("casilla_monto").innerHTML="$"+total_monto;  
    // document.getElementById("variablexValor").value=suma;
   document.getElementById("monto_total").innerHTML="$"+total_monto;
  

}


</script>