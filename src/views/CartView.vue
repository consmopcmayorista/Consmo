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
                    <!-- product head  -->
                    <h4 class="shop_cart_title sopcart_ttl d-none d-lg-flex">
                        <span>Producto</span>
                        <span>Cant</span>
                        <span>Total Precio</span>
                    </h4>

                    <!-- shop cart wrapper  -->
                    <div class="shop_cart_wrap">

                        <!-- single cart  -->
                       <div class="single_shop_cart d-flex align-items-center flex-wrap"   v-for="(dato, index) of ticket" :key="index">
                           
                            <div class="cart_img mb-4 mb-md-0">
                                <img loading="lazy" :src=dato.foto alt="product">
                            </div>
                            
                            <div class="cart_cont">
                                <a >
                                    <h5>{{dato.descripcion}}</h5>
                                </a>
                                <p class="price">${{ Math.round(parseFloat(dato.precio)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }} </p>
                               
                            </div>
                           
                            <div class="cart_qnty ms-md-auto">
                            <p>Cantidad</p>
                           <div class="d-flex align-items-center">
                                <div class="cart_qnty_btn" id="menos" @click="decrementar2(dato.id)">
                                    <i class="las la-minus"></i>
                                </div>
                                <div class="cart_count" id="cantidades_producto2">{{ obtenerCantidad(dato.id) }}</div>
                                <div class="cart_qnty_btn" id="mas" @click="incrementar2(dato.id, dato.existencia)">
                                    <i class="las la-plus"></i>
                                </div>
                            </div>
                        </div>

                            
                            <div class="cart_price ms-auto">
                                <p>${{ Math.round(parseFloat(dato.precio * dato.cant)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }} </p>
                            </div>
                           
                            <div class="cart_remove ms-auto">
                                <i class="icon-trash" @click=quitar_item_Carrito(dato.id)></i>
                            </div>
                        </div>

                        <!-- single cart  -->
                       
                    </div>
                </div>
 

                    <!-- order summary wrapper  -->
                    <div class="col-lg-3 mt-4 mt-lg-0">
                    <div class="cart_summary">
                        <h4>Total a Pagar</h4>

                        <div class="cartsum_text d-flex justify-content-between">
                            <p class="text-semibold">Subtotal</p>
                            <p class="text-semibold">${{ Math.round(parseFloat(subtotal)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }} </p>
                        </div>

                        <!--<div class="cartsum_text d-flex justify-content-between">
                            <p>Delivery</p>
                            <p>Free</p>
                        </div>-->

                        <div class="cartsum_text d-flex justify-content-between">
                            <p>IVA</p>
                            <p>{{ Math.round(parseFloat(iva)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }} </p>
                        </div>

                        <div class="cart_sum_total d-flex justify-content-between">
                            <p>Total</p>
                            <p>${{ Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }} </p>
                        </div>

                         <!--<div class="cart_sum_coupon">
                            <input type="text" placeholder="Enter coupon">
                            <button>apply</button>
                        </div>-->
                        <!-- button  -->
                        <div class="cart_sum_pros">
                            <button onclick="javascript:window.location.href='./confirmacion'">Procesar Pago</button>
                        </div>
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
 function decrementar() {
        if (cantidades > 1) {
            cantidades--;
        } else {
            console.log("No se puede disminuir más. El mínimo es 1.");
        }
    }
    function  incrementar() {
        if (cantidades < producto_mostrar.existencia) {
            cantidades++;
           
        } else {
            console.log(`No se puede incrementar más. Máximo permitido: ${producto_mostrar.existencia}.`);
        }
    }

    function   obtenerCantidad(id) {
        const producto = ticket.value.find(item => item.id === id);
        return producto ? producto.cant : 0;
    }



    function   decrementar2(id) {
        if (ticke.value) {
            const producto = ticket.value.find(item => item.id === id);
            if (producto && producto.cant > 1) {
                producto.cant--;
                localStorage.setItem('ticket', JSON.stringify({ productos: ticket.value }));
                actualizarTotales();
                cargar_detalles();
            } else {
                console.log("No se puede disminuir más. El mínimo es 1.");
            }
        }
    }
    function  incrementar2(id, existencia) {
        if (ticket.value) {
            const producto = ticket.value.find(item => item.id === id);
            if (producto && producto.cant < existencia) {
                producto.cant++;
                localStorage.setItem('ticket', JSON.stringify({ productos: ticket.value }));
                actualizarTotales();
                cargar_detalles();
            } else {
                console.log(`No se puede incrementar más. Máximo permitido: ${existencia}.`);
            }
        }
    }

    function eliminar_item_Carrito(id) {

        console.log(id)
        const arreglo_car = JSON.parse(localStorage.getItem('ticket'));
        if (arreglo_car && Array.isArray(arreglo_car.productos)) {
        arreglo_car.productos = arreglo_car.productos.filter(item => item.id !== id);
        localStorage.setItem('ticket', JSON.stringify(arreglo_car));
        }
        }

    function actualizarTotales() {
     
     total.value = ticket.value.reduce((acumulador, actual) => acumulador + (actual.cant * parseFloat(actual.precio)), 0);
     subtotal.value = parseFloat(total.value) / 1.19;
     iva.value = total.value - subtotal.value;
     
     console.log(total.value)
   }

   function quitar_item_Carrito(id){
        if (this.ticket) {
            // Crear un nuevo objeto nuevo_ticket
            let nuevo_ticket = {
              productos: []
            };
        
            // Copiar los productos que no coinciden con el id
            nuevo_ticket.productos = this.ticket.filter(item => item.id !== id);
        
        
            localStorage.setItem('ticket', JSON.stringify(nuevo_ticket));
             var arreglo_carrito = JSON.parse(localStorage.getItem('ticket'));
              
          this.ticket=arreglo_carrito.productos
           this.actualizarTotales()
          this.cargar_detalles()
            // Asignar nuevo_ticket a this.ticket
            
          }
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
       precio1=datos.precio;
       subtotal1=subtotal1;
       
      
      valores+=`  <div class="single_shop_cart d-flex align-items-center flex-wrap">
                         
                          <div class="cart_img mb-4 mb-md-0">
                              <img loading="lazy" src='${foto1}' alt="product">
                          </div>
                          
                          <div class="cart_cont">
                              <a href="#">
                                  <h5>${descripcion1}</h5>
                              </a>
                              <p class="price">${Math.round(parseFloat(precio1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                             
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
                              <p>${ Math.round(parseFloat(subtotal1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                          </div>
                         
                          <div class="cart_remove ms-auto">
                              <i class="icon-trash" onclick="eliminar_item_Carrito(${codigo1})"></i>
                          </div>
                      </div>`;                    
        
        
        
      /*valores+="<li class='list-group-item d-flex justify-content-between lh-sm'><div><h6 class='my-0'>Producto:</h6><small class='text-muted'>"+descripcion1+"</small></div><span class='text-muted'>"+precio1+"X"+cant1+"</span></br><span class='text-muted'>Subtotal $"+subtotal1+"</span></li>"; */
    
      cant_productos++                         
                          
    
  
  })
  
    total_monto=Math.round(parseFloat(total)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      
 
      
 
  
    
    
  //  document.getElementById("cant_productos").innerHTML=cant_productos;
  //  document.getElementById("total_productos").innerHTML=total_monto;
    
   
  document.getElementById("lista_productos").innerHTML=valores;
     document.getElementById("casilla_monto").innerHTML="$"+total_monto;  
    // document.getElementById("variablexValor").value=suma;
   document.getElementById("monto_total").innerHTML="$"+total_monto;
  

}


</script>