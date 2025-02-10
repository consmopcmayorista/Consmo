<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Configuración (ajusta según tu necesidad)
const dominio = 'consmopcmayorista.com'
const id_empresa = '24'

// Variables reactivas
const productos_alea = ref([])  // aquí guardaremos los productos
const cargando = ref(true)      // para mostrar o no un “cargando...”

// Función para formatear línea (cortar texto)
function formatLine(str, start, length) {
  // Si 'str' no existe o es muy corto, evita errores:
  if (!str) return ''
  return str.slice(start, start + length)
}

// Método para obtener productos de la API
async function fetchProductos() {
  try {
    console.log(`URL => https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`)
    const response = await axios.get(
      `https://whatsapp-nube.com/api_web/api_web_catalogo_new2.php?dominio=${dominio}&id=${id_empresa}`
    )
    // Suponemos que la API retorna un objeto con "productos"
    productos_alea.value = response.data.productos || []
    console.log('Productos aleatorios:', productos_alea.value)
  } catch (error) {
    console.error('Error al obtener productos:', error)
  } finally {
    cargando.value = false
  }
}

// Ejemplo de método para manejar el clic en “Ver” o “Al carrito”
function buscar_productos(id) {
  console.log('buscar_productos => clic en producto ID:', id)
  // Aquí pondrías tu propia lógica (navegar, abrir modal, etc.)
}

onMounted(() => {
  // Cuando se monta el componente, obtenemos los productos
  fetchProductos()
})
</script>

<template>
  <div class="recfor_you section_padding_b">
    <!-- Si está cargando, muestra un texto o spinner -->
    <p v-if="cargando">Cargando productos...</p>

    <!-- Si no está cargando y hay productos -->
    <div v-else-if="productos_alea.length > 0">
      <div class="container">
        <h2 class="section_title_3">Recomendados para ti</h2>
        <div class="row gy-4">
          <!-- Iterar sobre productos_alea -->
          <div
            class="col-xl-3 col-lg-4 col-sm-6"
            v-for="(dato, index) in productos_alea.slice(0,32)"
            :key="index"
           
          >
            <div class="single_toparrival">
              <div class="topariv_img">
                <img
                  loading="lazy"
                  :src="dato.imagen"
                  alt="product"
                  style="width:260px; height:260px"
                />
                <div class="prod_soh">
                  <div class="adto_wish">
                    <i class="icon-heart"></i>
                  </div>
                  <!-- Llamamos a buscar_productos con el ID -->
                  <div class="qk_view" @click="buscar_productos(dato.id)">
                    <span><i class="las la-eye"></i></span>
                    Ver
                  </div>
                </div>
              </div>
              <div class="topariv_cont">
                <!-- título cortado en 2 líneas -->
                <a :href="'product-view.html?producto=' + dato.id" class="format_titulo">
                  <p>{{ formatLine(dato.titulo, 0, 22) }}</p>
                  <p>{{ formatLine(dato.titulo, 22, 22) }}</p>
                </a>
                <div class="format_titulo2">
                  <span>SKU: {{ dato.idpro }}</span>
                </div>
                <div class="price mb-1">
                  <span class="org_price">
                    $ {{
                      Math.round(parseFloat(dato.pt1))
                        .toString()
                        .replace(/\./g, ',')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                    }}
                  </span>
                </div>
                <!-- rating -->
                <div class="rating">
                  <div class="d-flex align-items-center justify-content-start">
                    <div class="rating_star">
                      <span><i class="las la-star"></i></span>
                      <span><i class="las la-star"></i></span>
                      <span><i class="las la-star"></i></span>
                      <span><i class="las la-star"></i></span>
                      <span><i class="las la-star"></i></span>
                    </div>
                    <p class="rating_count mb-0">(50)</p>
                  </div>
                </div>
              </div>
              <div class="full_atc_btn">
                <button @click="buscar_productos(dato.id)">
                  <span class="me-1"><i class="icon-cart"></i></span>
                  Al Carrito
                </button>
              </div>
            </div>
          </div>
          <!-- Fin v-for -->
        </div>
      </div>
    </div>
    
    <!-- Si no está cargando y no hay productos -->
    <div v-else>
      <p>No hay productos recomendados en este momento.</p>
    </div>
  </div>
</template>


<style scoped>
.recfor_you {
  margin-top: 20px;
}
.single_toparrival {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}
.single_toparrival:hover {
  transform: translateY(-5px);
}
.prod_soh {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>
