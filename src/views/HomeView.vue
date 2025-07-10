<script setup>
import { RouterLink, RouterView } from 'vue-router'
import services from '@/components/services.vue'
import ProductQuickview from '@/components/product_indv.vue' // Importamos el modal
import CarouselTarjetas from '@/components/CarouselTarjetas.vue' // Importamos el carrusel de tarjetas
import CarruselesPorCategoria from '@/components/CarruselesPorCategoria.vue' // Importamos el carrusel de categorías
import PopupPromociones from '@/components/PopupPromociones.vue'

import { ref, onMounted, inject } from 'vue'
import axios from 'axios'

import popup from '@/components/PopupPromociones.vue'
import Destacados from '@/components/Destacados.vue'

// Configuración
const dominio = 'consmopcmayorista.com'
const id_empresa = '24'

// Variables reactivas
const productos_alea = ref([])    // Lista de productos para "Recomendados"
const categorias_alea = inject('categorias_alea', ref([])) 
console.log('Categorías inyectadas:', categorias_alea.value)

const cargando = ref(true)





const mostrarQuickview = ref(false)
const productoSeleccionado = ref(null)
const producto_mostrar =ref([])
const imagenMostrada = ref()
const imagenCargada =ref(false)
let  maximo = ref()
let cantidades = ref(1)

const categoriasCarrusel = [
  { nombre: "CHASIS", titulo: "🎮 Chasis Gamer" },
  { nombre: "CAMARAS WEB", titulo: "📷 Cámaras Web" },
  { nombre: "MONITOR", titulo: "🖥️ Monitores" },
  { nombre: "", titulo: "🎮 Gaming" },
  { nombre: "IMPRESORAS", titulo: "🖨️ Impresoras" }
]


function sumarExistencias(existenciaStr) {
  console.log(existenciaStr)
  if (!existenciaStr) return 0;
  return existenciaStr.split(',').reduce((total, item) => {
    const parts = item.split(':');
    const cantidad = parseInt(parts[1]) || 0;
    console.log(cantidad)
    return total + cantidad;
  }, 0);
}




function buscar_productos(id) {
    cantidades=1
            
            let get={};
           
             let valor=productos_alea.value
             get=(valor.filter(e => (`${e.id} `.includes(id))));
             get.pt2 = Math.round(parseInt(get.pt2));
             producto_mostrar.value=get[0]
           
            
             console.log(producto_mostrar.value)
             imagenCargada.value=true
              maximo = sumarExistencias(producto_mostrar.value.existencia);
             
              imagenMostrada.value= producto_mostrar.value.imagen 
               document.querySelector('.product_quickview').classList.add('active');
     
               document.body.style.overflowY = 'hidden';
             
  //productoSeleccionado.value = id
  //mostrarQuickview.value = true
  //console.log('Abriendo modal, id=', id, 'mostrarQuickview=', mostrarQuickview.value)
}


function agregar_producto_car(){
    
    let cant1=new Intl.NumberFormat().format($('#cantidades_producto').html());
    
   //  document.getElementById("cantidades_producto").innerHTML=1;
	if($('#cantidades_producto').html()!=""){
	    
	   // let maximo=mod_cantidades(cant1);
	    
		
		  
    		const id=document.getElementById('item_producto').value;
    		//const referencia=document.getElementById('referencia').value
    		const detalle=document.getElementById('detalle').value
    		const precio=document.getElementById('precio').value;
    		const foto=document.getElementById('foto').value;
    		const tags=document.getElementById('tags').value;
    		const existencia=document.getElementById('cantidadesx').value;
    		
    		cargar_carro( id, detalle, precio,  foto, "Agregado_ppl", tags, existencia);
    		
    		$('#cantidades_producto').val('1');
    	
    		$('#myModal3').modal('hide');	
		
		
		
	}
}

function cargar_carro(id, descripcion, precio, foto, operacion, tags, existencia) {
          precio = parseFloat(precio.toFixed(2)); // Limita "precio" a 2 decimales
          tags = parseFloat(tags.toFixed(2)); // Limita "tags" a 2 decimales

        
        if (operacion=='Agregado_ppl') {    	
        var cant = new Number($('#cantidades_producto').html());
        
        operacion="Agregado ";
        }else{
         if (operacion=='Agregado') {
            var cant =1;
         }else{ 
            var cant =-1;
         }  
     
        }
	
	
	   const arreglo_car=JSON.parse(localStorage.getItem('ticket'));  
		
	   
	   var estructura;
	
	   const carrito = Object.create(prototipoCarrito);
	  
	  
		if (!arreglo_car) {
			
		   const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags,
			   existencia
			 };
	
		   
		   carrito.agregarProducto(producto);
			//var estructura =  id+ ";" +  descripcion+ ";" +  precio+ ";" +  cant + ";" +foto;  
	   }else{
			  const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags,
			   existencia
			 };
	
				 let cantidad=0;
				 let indice;
			   let encontrado=false;
			   arreglo_car.productos.forEach((datos, index)=>{
					   if (datos.id==id) {
						
						 cantidad= datos.cant;
						 indice=index;
						 encontrado=true;
					   }
				   
			   })
			   
	
				if (encontrado) {
					 
					 arreglo_car.productos[indice].cant=parseInt(cant) + parseInt(cantidad);
					 
					 
	
				}else{
					//carrito.agregarProducto(producto);
	
					arreglo_car.productos.push(producto);
				}	
			 
				 arreglo_car.productos.forEach((datos)=>{
				 carrito.agregarProducto(datos);
	
			    })	
	
			
	
	
			
			
	
			
		   }
		   //console.log(arreglo_car);
		  localStorage.setItem('ticket', JSON.stringify(carrito)); 
		  cargar_arreglo_car() ; 
	
		  mensaje_add_car(descripcion, id , operacion, cant);
	  
	}
 
  function mensaje_add_car(descripcion, id , operacion, cant){
	
	let valores ="";
	
	valores +="<div class='alert alert-primary' role='alert'>Se ha "+operacion+" "+cant+" "+descripcion+" al carrito de compra </div>";
	document.getElementById("container_success").innerHTML=valores;
	setTimeout(function(){ document.getElementById("container_success").innerHTML=""; }, 3000);
	
	
	}



function 	imprimir_carro_vacio(){
let valores=`<ul classs=hopping-cart-items">
                          <li class="clearfix">
                           
                            <span class="item-quantity">No hay Productos en tu Carrito!</span>
                            <br/>
                            <br/><br/>
                          </li>

                        </ul>`
document.getElementById("total_ticket").innerHTML=0;
document.getElementById("total_ticket2").innerHTML=0;
document.getElementById("muestra").innerHTML=valores;
document.getElementById("muestra2").innerHTML=valores;
}
function imprimir_carrito(arreglo_car, total){
  var valores='';
 var cantidad_valores= arreglo_car.productos.length
 document.querySelector('.pops2').innerHTML= cantidad_valores,
valores+="<ul class='shopping-cart-items'>";

     arreglo_car.productos.forEach((datos)=>{

   var codigo1 = datos.id;
   var codigo2 = '"'+codigo1+'"';
     var descripcion1 = datos.descripcion+ " ("+codigo1+")";
      var descripcion2 = '"'+descripcion1+'"';
      
     var precio1 = datos.precio;
     
     var cant1 = datos.cant;
     var foto1 = datos.foto;
     var subtotal1=precio1*cant1;
     precio1=datos.precio ; 
      subtotal1=subtotal1;
     
     
     valores+= ` 
                          <li class="clearfix">
                            <img style="width:75; height:60px" src='${foto1}' alt="" />
                            <span class="item-name">${descripcion1.slice(0, 18)}</span>
                            <span class="item-price">$ ${Math.round(parseFloat(precio1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }</span>
                            <span class="item-quantity">/ Cantidad: ${cant1}</span>
                          </li>
                          
                          
                    
                         
                        `;
  

})
  
  total_monto=total;
    

    

 valores+="</ul>";
 
  document.getElementById("total_ticket").innerHTML=Math.round(parseFloat(total_monto)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') 
  document.getElementById("total_ticket2").innerHTML=Math.round(parseFloat(total_monto)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') 
document.getElementById("muestra").innerHTML=valores;
  document.getElementById("muestra2").innerHTML=valores;
}




/* -----------------------------------------     */


// Función para cerrar el quickview
function closeQuickview() {
  document.querySelector('.product_quickview').classList.remove('active');
  document.body.style.overflowY = 'auto';
}

// Función para cortar línea de texto sin dividir palabras de forma incorrecta
function formatLine(str, maxLength) {
  if (!str) return '';
  const words = str.split(' ');
  let line = '';
  let result = [];

  for (let word of words) {
    if ((line + ' ' + word).trim().length <= maxLength) {
      line += (line ? ' ' : '') + word;
    } else {
      result.push(line);
      line = word;
    }
  }
  if (line) result.push(line);

  return result;
}

function cambiarImagen(url) {
  imagenMostrada.value = url
}

function incrementar() {
  if(cantidades.value < maximo){
  cantidades.value++
  }
}
function decrementar() {
  if (cantidades.value > 1) {
    cantidades.value--
  }
}
function cerrarModal() {
  mostrarModal.value = false
}

// Función para barajar el array
function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

// Carga de productos "recomendados"
async function fetchProductos() {
  try {
    const response = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`
    )
    // Asignamos array barajado
    productos_alea.value = shuffleArray(response.data.productos) || []
    console.log(productos_alea.value)
  } catch (error) {
    console.error('Error al obtener productos:', error)
  } finally {
    cargando.value = false
  }
}

onMounted(() => {
  fetchProductos()
})

// Scripts de carrusel, etc. (usando jQuery, owl, etc.)
$(document).ready(function() {
  $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  })

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    observer: true,
    observeParents: true
  })

  setInterval(() => {
    const paginationBullet = document.getElementById('button-next')
    if (paginationBullet) {
      paginationBullet.click()
      console.log('Clic simulado en el botón Next')
    } else {
      console.log('No se encontró el botón con id "button-next"')
    }
  }, 5000)
})


</script>

<template>
  <!-- Carrusel principal con Bootstrap -->
  <div id="bannerCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <!-- Slide 1 -->
      <div class="carousel-item active">
        <a href="pdfs/CatalogoActualizado.pdf" target="_blank">
          <img src="/images2/banner_equipos.jpg" class="d-block w-100" alt="Equipos" />
        </a>
      </div>
      <!-- Slide 2 -->
      <div class="carousel-item">
        <a href="pdfs/CatalogoImpresoras.pdf" target="_blank">
          <img src="/images2/banner_impresoras.jpg" class="d-block w-100" alt="Impresoras" />
        </a>
      </div>
      <!-- Slide 3 -->
      <div class="carousel-item">
        <a href="pdfs/CatalogoGamerActualizado.pdf" target="_blank">
          <img src="/images2/catalogo-gamer.jpg" class="d-block w-100" alt="Gamer" />
        </a>
      </div>
    </div>

    <!-- Controles del Carrusel -->
    <button class="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>

    <!-- Indicadores -->
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2"></button>
    </div>
  </div>

  <!--<services /> -->
<!-- Mostrar carrusel de productos Gamer -->
<CarruselesPorCategoria
  :productos="productos_alea"
  categoria="CELULARES"
  titulo="📱 Celulares"
  :buscarProducto="buscar_productos"
  :formatLine="formatLine"
/>


  
  <Destacados />

<div class="futuristic-banner-wrapper section_padding_b">
  <div class="container">
    <a href="https://wa.me/573015537673?text=Hola%20ConsmoPC,%20quiero%20solicitar%20el%20servicio%20técnico%20de%20mi%20equipo."
       target="_blank"
       rel="noopener noreferrer"
       class="futuristic-banner-link">
      <picture>
        <source
          media="(min-width: 768px)"
          srcset="/images2/servicio_tecnico.jpg"
        />
        
        <img
          loading="lazy"
          class="futuristic-banner-img"
          src="/images2/servicio_tecnico.jpg"
          alt="Servicio técnico Consmo PC"
        />
      </picture>
    </a>
  </div>
</div>

<CarruselesPorCategoria
  :productos="productos_alea"
  categoria="monitores"
  titulo="🖥️ Monitores"
  :buscarProducto="buscar_productos"
  :formatLine="formatLine"
/>
  <!-- Sección Categorías -->
   <!--
  <div class="shop_bycat section_padding_b">
    <div class="container">
      <h2 class="section_title_3">Todas las Categorias</h2>
      <div class="row gx-2 gy-2">
        <div
          class="col-lg-4 col-6"
          v-for="(dato, index) of categorias_alea.slice(0,6)"
          :key="dato.id"
        >
          <a
            :href="'catalogo_cat?Pag=' + dato.categoria + '&criterio=categoria'"
            class="single_shopbycat bg_1"
            :style="{ backgroundImage: `url('${dato.imagen}')` }"
          >
            <div class="shopcat_cont">
              <h4>{{ dato.categoria }}</h4>
              <div class="icon">
                <i class="las la-long-arrow-alt-right"></i>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div> -->
<CarruselesPorCategoria
  :productos="productos_alea"
  categoria="ARTICULOS Y ACCESORIOS"
  titulo="🛒 Artículos y Accesorios"
  :buscarProducto="buscar_productos"
  :formatLine="formatLine"
/>

<!-- SECCIÓN MERCADO LIBRE + WHATSAPP DIFUSIONES -->
<!-- BOTONES FLOTANTES ESTILO EXPANDIDO -->
<div class="floating-cards-wrapper">
  <!-- ✅ Mercado Libre -->
  <div class="floating-card trigger-ml" @click="toggleFloatingCard($event)">
    <img src="/assets/images/aliado.png" class="floating-icon" alt="Mercado Libre" />
    <div class="card-info mercado-libre">
      <p class="fw-bold text-primary mb-1">🛒 Mercado Libre</p>
      <small class="text-dark d-block mb-1">¡Estamos presentes con 2 tiendas oficiales!</small>
      <small class="text-muted d-block mb-2">Dale un vistazo a nuestro catálogo con envío rápido y seguro.</small>
      <div class="d-flex gap-2 flex-wrap">
        <a href="https://listado.mercadolibre.com.co/_CustId_292963841" class="btn btn-warning btn-sm fw-bold" target="_blank">Consmo PC</a>
        <a href="https://listado.mercadolibre.com.co/_CustId_1659542107" class="btn btn-warning btn-sm fw-bold" target="_blank">WORLDTECHCOL</a>
      </div>
    </div>
  </div>

  <!-- 💬 WhatsApp -->
  <div class="floating-card trigger-wp" @click="toggleFloatingCard($event)">
    <img src="/assets/images/difusiones.png" class="floating-icon" alt="Difusiones WhatsApp" />
    <div class="card-info whatsapp">
      <p class="fw-bold text-white mb-1">📢 Difusiones WhatsApp</p>
      <small class="text-white d-block">Promociones nuevas cada día</small>
      <small class="text-white d-block mb-2">¡Únete y entérate antes que nadie!</small>
      <div class="d-flex gap-2 flex-wrap">
        <a href="https://chat.whatsapp.com/CCgnqRsRHNh5bQDIazc2DF" class="btn btn-light btn-sm fw-bold" target="_blank">Suramericana</a>
        <a href="https://chat.whatsapp.com/EoiWvYD6jzTGFtDuk8gZON" class="btn btn-light btn-sm fw-bold" target="_blank">Minorista</a>
        <a href="https://chat.whatsapp.com/DPm4UI5L6PHA2G4e0Z0pgy" class="btn btn-light btn-sm fw-bold" target="_blank">Montería</a>
      </div>
    </div>
  </div>
</div>
 <CarouselTarjetas :tarjetas="productos_alea.slice(0, 8)" />



<!-- Sección Recomendados -->

  <!-- Modal Quickview -->

 <div class="product_quickview">
<div class="prodquick_wrap position-relative">
  <div class="close_quickview" @click="closeQuickview">
<i class="las la-times"></i>
</div>
<div class="row">
<div class="col-lg-6">
<!-- product quick view slider image  -->
<div class="product_view_slider">
<div class="single_viewslider">
<img loading="lazy"  :src=imagenMostrada   alt="product">
</div>

</div>


<!-- product quick view nav  -->
<div class="product_viewslid_nav" style="display: flex;">

<div class="single_viewslid_nav" v-if="producto_mostrar && producto_mostrar.lista_imagenes" style="display: flex;">
  <img style="display: flex; width:100px; border: 0.5 px solid; "  loading="lazy" :src="producto_mostrar.imagen" alt="product"   @click="cambiarImagen(producto_mostrar.imagen)">
<template v-for="(url, index) in (producto_mostrar.lista_imagenes || '').split(',')" :key="index">
<img style="display: flex; width:100px; border: 0.5 px solid; "  loading="lazy" :src="url.trim()" alt="product"  @click="cambiarImagen(url.trim())">
</template>
</div>


</div>
</div>
<div class="col-lg-6">
    <div class="product_info_wrapper">
        <div class="product_base_info">
          <router-link
  :to="{ name: 'producto', query: { producto: producto_mostrar.id } }"
  class="format_titulo"
>
  <h5 v-for="(line, index) in formatLine(producto_mostrar.titulo, 22)" :key="index">
    {{ line }}
  </h5>
</router-link>



             <!-- rating  -->
            <!-- product info  -->
            <div class="product_other_info">
                 <p><span class="text-semibold">
                     Disponibilidad en:
           
                <!-- Verifica si el valor es mayor a 0 -->
                <span class="text-green" > {{ producto_mostrar.existencia
 }} </span>
        

                  </span>  </p>
                <p><span class="text-semibold">Marca:</span>{{ producto_mostrar.marca}}</p>
                <p><span class="text-semibold">Categoria:</span> {{ producto_mostrar.linea}}</p>
                <p><span class="text-semibold">SKU:</span> {{ producto_mostrar.idpro }}</p>
            </div>
            <!-- product price  -->
            <div class="price mt-3 mb-3 d-flex align-items-center">
                <span class="org_price ms-2">${{ Math.round(parseFloat(producto_mostrar.pt1)).toString().replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}</span>
                <!-- <span class="prev_price ms-0">{{ producto_mostrar.pt1 }}</span>
               
                <div class="disc_tag ms-3">-30%</div> -->
            </div>
            <div class="pd_dtails">
                <p>
                    {{ producto_mostrar.detalle }}
                </p>
            </div>
            
                            <input type="hidden" id='item_producto'  :value=producto_mostrar.id>

                            <input type="hidden" id='detalle' :value=producto_mostrar.titulo>
                            <input type="hidden" id='precio'  :value=producto_mostrar.pt1>
                            <input type="hidden" id='foto'  :value=producto_mostrar.imagen>
                            <input type="hidden" id='tags'  :value=producto_mostrar.idpro>
                             <input type="hidden" id='cantidadesx' :value=producto_mostrar.existencia>

                  <div class="cart_qnty ms-md-auto">
                      <p>Cantidad</p>
                      <div class="d-flex align-items-center">
                          <div class="cart_qnty_btn" id="menos" @click="decrementar">
                              <i class="las la-minus"></i>
                          </div>
                          <div class="cart_count"  id="cantidades_producto" :value="cantidades">{{ cantidades }}</div>
                          <div class="cart_qnty_btn" id="mas" @click="incrementar">
                              <i class="las la-plus"></i>
                          </div>
                      </div>
                  </div>
                  </div>
                    <div id='container_success'></div>
            
            <div class="product_buttons">
              <a style="cursor: pointer;" class="default_btn me-sm-3 me-2 px-2 px-lg-4" onclick="agregar_producto_car()" ><i
                      class="icon-cart me-2"></i> Al Carrito</a>
              <a style="cursor: pointer;" class="default_btn second px-3 px-ms-4" @click="cargar_me_gusta(producto_mostrar.id, producto_mostrar.titulo, producto_mostrar.pt1, producto_mostrar.imagen,'Agregado_ppl',  producto_mostra)">
                  Me Gusta</a>
          </div>


          </div>
          </div>
          </div>
          </div>
          </div>

 <!-- <popup/>  -->
</template>

<style scoped>
/* ESTILOS GENERALES */
.recfor_you {
  margin-top: 2rem;
  padding-bottom: 2rem;
  
}
.section_title_3 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

/* TARJETAS DE PRODUCTO */
.card-product-clean {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 430px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-product-clean:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-img-clean {
  position: relative;
  overflow: hidden;
}
.card-img-clean img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-bottom: 1px solid #eee;
}
.card-product-clean:hover img {
  transform: scale(1.05);
}

.card-body {
  flex-grow: 1;
}

/* OVERLAY HOVER SOBRE IMAGEN */
.overlay-clean {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.card-img-clean:hover .overlay-clean {
  opacity: 1;
}

/* BOTONES */
button.btn {
  border-radius: 8px;
  transition: all 0.3s ease;
}
button.btn:hover {
  opacity: 0.9;
}

/* RESPONSIVE CAROUSEL BANNERS */
@media (max-width: 768px) {
  #bannerCarousel img {
    height: 180px;
    object-fit: cover;
  }
}
.floating-cards-wrapper {
  position: fixed;
  top: 40%;
  left: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.floating-card {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #ffffff;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  width: 60px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.floating-card:hover,
.floating-card.active {
  width: 320px;
}

.floating-icon {
  width: 48px;
  height: 48px;
  object-fit: contain;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.floating-card:hover .floating-icon,
.floating-card.active .floating-icon {
  transform: scale(1.05);
}

.card-info {
  display: none;
  margin-left: 12px;
  width: 100%;
}

.floating-card:hover .card-info,
.floating-card.active .card-info {
  display: block;
}

.card-info.mercado-libre {
  color: #333;
}

.card-info.whatsapp {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  padding: 10px;
  border-radius: 10px;
}

.card-info p,
.card-info small {
  margin: 0;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .floating-card {
    width: 60px;
  }
}
.futuristic-banner-wrapper {
  padding: 40px 0;
}

.futuristic-banner-link {
  display: block;
  border-radius: 1.6rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 240, 255, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #0e223a, #1e2f44);
}

.futuristic-banner-link:hover {
  transform: scale(1.015);
  box-shadow: 0 12px 36px rgba(0, 240, 255, 0.28);
}

.futuristic-banner-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.futuristic-banner-link:hover .futuristic-banner-img {
  filter: brightness(1.05) saturate(1.15);
}

</style>