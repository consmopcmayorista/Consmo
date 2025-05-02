<style scoped>
 img {
  transition: opacity 0.3s ease-in-out;
  
}


.zoom-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.zoomable-image {
  width: 100%;
  display: block;
}

.zoom-lens {
  position: absolute;
  border: 1px solid #d4d4d4;
  width: 200px;
  height: 100px;
  cursor: none;
  border-radius: 50%;
  display: none;
}

.zoom-result {
  position: fixed;
  border: 1px solid #d4d4d4;
  width: 800px;   /* ← Más ancho */
  height: 700px;  /* ← Más alto */
  overflow: hidden;
  background: #fff;
  display: none; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.zoom-result img {
  position: absolute;
  width: 100%;
  height: auto;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center; 
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  padding: 30px;
}

.zoom-image {
  max-width: 600px;
  max-height: 600px;
  object-fit: contain;
  cursor: zoom-out;
  transition: transform 0.5s ease;
}

.zoom-image:hover {
  transform: scale(1.3);
}

.close-btn {
  position: absolute;
  top: 10px; right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1001;
  border-radius: 4px;
  transition: background 0.3s ease;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.tiktok {
  content: url('/assets/tik-tok_6422207.svg');
  display: inline-block;
  width: 4px;
  height: 4px;
  cursor: pointer;
}

.decor-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  margin-bottom: 12px;
}

.icono-decorativo {
  color: #facc15; /* amarillo vibrante */
  font-size: 18px;
}

.linea-decorativa {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, #d1d5db, #6b7280); /* gris claro a oscuro */
  opacity: 0.7;
  border-radius: 2px;
}


</style>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import BarraPopularidad from '@/components/BarraPopularidad.vue'

const producto_mostrar = ref(null)
const imagenMostrada = ref('')
const cargando = ref(false)
const cantidades = ref(1)
const imagenCargada = ref(false)
const mostrarModal = ref(false)

const route = useRoute()

const  maximo = ref(100) // Valor inicial, se actualizará al cargar el producto


function cambiarImagen(url) {
  imagenMostrada.value = url
}

function incrementar() {
  if(cantidades.value < maximo.value){
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

function sumarExistencias(existenciaStr) {
  console.log(existenciaStr)
  if (!existenciaStr) return 0;
  return existenciaStr.split(',').reduce((total, item) => {
    const parts = item.split(':');
    const cantidad = parseInt(parts[1]) || 0;
    
    return total + cantidad;
  }, 0);
}
// Función para obtener el producto desde la API
async function fetchProducto() {
  try {
    cargando.value = true
    const id = route.query.producto
    if (!id) {
      console.warn('No hay parámetro ?producto en la URL')
      return
    }
    
    const response = await axios.get(`https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_inv.php?id=${id}`)
    
    if (response.data.producto && response.data.producto.length > 0) {
      producto_mostrar.value = response.data.producto[0]

      
      console.log(sumarExistencias(producto_mostrar.value.existencia))
      imagenMostrada.value = producto_mostrar.value.imagen
      maximo = sumarExistencias(producto_mostrar.value.existencia);
      console.log('maximo', maximo)
    } else {
      console.warn('Producto no encontrado en la API.')
    }
  } catch (error) {
    console.error('Error al obtener producto:', error)
  } finally {
    cargando.value = false
  }
}
watch(
  () => route.query.producto, // Observa el campo `?producto`
  (nuevoId, antiguoId) => {
    // Cuando cambie, vuelve a cargar
    if (nuevoId && nuevoId !== antiguoId) {
      fetchProducto()
    }
  }
)


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


// Llamamos a la API al montar
onMounted(() => {
  fetchProducto()
  window.scrollTo({
    top: 0
   
  });
  // Aquí hacemos la lógica de zoom:
  console.log('Montado: inicializando zoom...')

  const zoomContainer = document.querySelector('.single_viewslider')
  const zoomResult = document.querySelector('.zoom-result')

  if (!zoomContainer || !zoomResult) {
    return
  }
  
  // Crear imagen para zoom
  const zoomImage = document.createElement('img')
  zoomResult.appendChild(zoomImage)

  zoomContainer.addEventListener('mouseenter', () => {
    zoomResult.style.display = 'block'
    const zoomImageSrc = zoomContainer.querySelector('img')?.src
    zoomImage.src = zoomImageSrc || ''
    zoomImage.style.position = 'absolute'
    zoomImage.style.top = '0'
    zoomImage.style.left = '0'
    zoomImage.style.transform = 'scale(2)' // Ajusta la escala
  })

  zoomContainer.addEventListener('mousemove', (e) => {
    const containerRect = zoomContainer.getBoundingClientRect()
    const offsetX = e.clientX - containerRect.left
    const offsetY = e.clientY - containerRect.top
    
    const xPercentage = (offsetX / containerRect.width) * 100
    const yPercentage = (offsetY / containerRect.height) * 100
    
    zoomImage.style.transformOrigin = `${xPercentage}% ${yPercentage}%`
    // Ajustar posición del contenedor si deseas que se mueva
    zoomResult.style.right = '400px'
    zoomResult.style.top = '250px'
  })

  zoomContainer.addEventListener('mouseout', () => {
  zoomResult.style.display = 'none'
  })
})


</script>

<template>
  <div class="container">
    <!-- BreadCrumbs -->
    <div class="breadcrumbs">
      <a href="#"><i class="las la-home"></i></a>
      <a href="#">Shop</a>
      <a href="#" class="active">{{ producto_mostrar?.titulo }}</a>
    </div>
  </div>

  <!-- product view -->
  <div class="product_view_wrap section_padding_b">
    <div class="container">
      <div class="row">
        <!-- Columna Izquierda (Imagen) -->
        <div class="col-lg-6">
          <div class="product_view_slider">
            <div class="single_viewslider zoom-container">
              <!-- Imagen principal (si ya cargó el producto), si no mostramos loader -->
              <img
                v-if="!cargando && producto_mostrar"
                :src="imagenMostrada"
                alt="product"
                @click="mostrarModal = true"
                @load="imagenCargada = true"
                @error="imagenCargada = false"
                class="zoomable-image"
              >
              <!-- Loader temporal si está cargando o la imagen no ha llegado -->
              <img
                v-else
                src="/assets/images/progress.gif"
                alt="Cargando..."
              >
            </div>
            <div class="zoom-result"></div>
            <!-- Modal Zoom (click en la imagen) -->
            <!-- <div v-if="mostrarModal" class="modal-overlay" @click="cerrarModal">
              <div class="modal-content" @click.stop>
                <img :src="imagenMostrada" alt="Zoom Image" class="zoom-image" />
                <button class="close-btn" @click="cerrarModal">X</button>
              </div>
            </div> -->
          </div>

          <!-- product slider small image -->
          <div
            class="product_viewslid_nav"
            v-if="producto_mostrar && producto_mostrar.lista_imagenes"
            style="display: flex;"
          >
            <div class="single_viewslid_nav" style="display: flex;">
              <!-- Imagen principal -->
              <img
                loading="lazy"
                :src="producto_mostrar.imagen"
                alt="product"
                style="width:100px; border: 1px solid #ccc; margin-right:5px;"
                @click="cambiarImagen(producto_mostrar.imagen)"
              >
              <!-- Otras imágenes -->
              <template
                v-for="(url, index) in (producto_mostrar.lista_imagenes || '').split(',')"
                :key="index"
              >
                <img
                  loading="lazy"
                  :src="url.trim()"
                  alt="product"
                  style="width:100px; border: 1px solid #ccc; margin-right:5px;"
                  @click="cambiarImagen(url.trim())"
                >
              </template>
            </div>
          </div>
        </div>

        <!-- Columna Derecha (info producto) -->
        <div class="col-lg-6">
          <div class="product_info_wrapper" v-if="!cargando && producto_mostrar">
            <div class="product_base_info">
<h1>{{ producto_mostrar.titulo }}</h1>


<BarraPopularidad/>





              <!-- product info -->
              <div class="product_other_info">
                <p><span class="text-semibold">
                     Disponibilidad en:
           
                <!-- Verifica si el valor es mayor a 0 -->
                <span class="text-green" > {{ producto_mostrar.existencia
 }} </span></span> </p>
                <p><span>Marca:</span> {{ producto_mostrar.marca }}</p>
                <p><span>Categoría:</span> {{ producto_mostrar.linea }}</p>
                <p><span>SKU:</span> {{ producto_mostrar.idpro }}</p>
              </div>
              <input type="hidden" id='item_producto'  :value=producto_mostrar.id>

<input type="hidden" id='detalle' :value=producto_mostrar.titulo>
<input type="hidden" id='precio'  :value=producto_mostrar.pt1>
<input type="hidden" id='foto'  :value=producto_mostrar.imagen>
<input type="hidden" id='tags'  :value=producto_mostrar.idpro>
 <input type="hidden" id='cantidadesx' :value=producto_mostrar.existencia>

              <!-- product price -->
              <div class="price mt-3 mb-3 d-flex align-items-center">
                <span class="org_price ms-2">
                  ${{ Math.round(parseFloat(producto_mostrar.pt1)).toLocaleString() }}
                </span>
              </div>

              <!-- Cantidad -->
              <div class="cart_qnty ms-md-auto">
                <p>Cantidad</p>
                <div class="d-flex align-items-center">
                  <div class="cart_qnty_btn" @click="decrementar">
                    <i class="las la-minus"></i>
                  </div>
                  <div class="cart_count"  id="cantidades_producto" :value="cantidades">{{ cantidades }}</div>
                  <div class="cart_qnty_btn" @click="incrementar">
                    <i class="las la-plus"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="product_buttons">
              <button class="default_btn me-sm-3 me-2 px-2 px-lg-4"  onclick="agregar_producto_car();">
                <i class="icon-cart me-2"></i> Al Carrito
              </button>
            </div>
          </div>
          
          <!-- Mensaje "No se encontró" -->
          <div v-else-if="!cargando && !producto_mostrar">
            <p>No se encontró el producto</p>
          </div>

          <div id='container_success'></div>
        </div>
      </div>

      <!-- product detail tabs, etc. -->
      <div class="product_view_tabs mt-4">
        <div class="pv_tab_buttons spec_text">
          <div class="pbt_single_btn active">Detalle Productos</div>
      </div>

        <div class="pb_tab_content info active">
          <div class="row">
            <div class="col-lg-8">
              <div class="pbt_info_text">
                <p>{{ producto_mostrar?.detalle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

