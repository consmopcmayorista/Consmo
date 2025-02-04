<script setup>
import { ref, watch } from "vue";
import axios from "axios";

// Recibimos la prop con el ID del producto
const props = defineProps({
  id_producto: Number,
});

// Emitimos “cerrar” al hacer click en la X
const emit = defineEmits(["cerrar"]);

const producto_mostrar = ref(null);
const imagenMostrada = ref("");
const cantidades = ref(1);
const cargando = ref(false);

// Observamos los cambios en "id_producto" para llamar fetchProducto
watch(() => props.id_producto, (newId) => {
  if (newId) fetchProducto(newId);
}, { immediate: true })

// Función para obtener un producto por ID
async function fetchProducto(id) {
  try {
    cargando.value = true;
    console.log(`Consultando: https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_inv.php?id=${id}`);
    const response = await axios.get(`https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_inv.php?id=${id}`);
    console.log(response.data.producto[0])
    if (response.data.producto && response.data.producto.length > 0) {
      producto_mostrar.value = response.data.producto[0];
      imagenMostrada.value = producto_mostrar.value.imagen;
    } else {
      console.warn("Producto no encontrado en la API.");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  } finally {
    cargando.value = false;
  }
}

// Cambiar la imagen principal
function cambiarImagen(url) {
  imagenMostrada.value = url;
}

// Aumentar / Disminuir cantidad
function incrementar() {
  cantidades.value++;
}
function decrementar() {
  if (cantidades.value > 1) {
    cantidades.value--;
  }
}
</script>

<template>
  <div class="product_quickview">
    <div class="prodquick_wrap position-relative">
      <div class="close_quickview" @click="emit('cerrar')">
        <i class="las la-times"></i>
      </div>

      <div v-if="cargando">Cargando producto...</div>
      <div v-else-if="producto_mostrar" class="row">
        <div class="col-lg-6">
          <!-- Imagen Principal -->
          <div class="product_view_slider">
            <div class="single_viewslider">
              <img loading="lazy" :src="imagenMostrada" alt="product" />
            </div>
          </div>

          <!-- Navegación de imágenes -->
          <div class="product_viewslid_nav" style="display: flex;">
            <div class="single_viewslid_nav" v-if="producto_mostrar.lista_imagenes" style="display: flex;">
              <!-- Imagen principal del producto -->
              <img
                loading="lazy"
                :src="producto_mostrar.imagen"
                alt="product"
                @click="cambiarImagen(producto_mostrar.imagen)"
              />
              <!-- Otras imágenes -->
              <template v-for="(url, index) in (producto_mostrar.lista_imagenes || '').split(',')" :key="index">
                <img
                  loading="lazy"
                  :src="url.trim()"
                  alt="product"
                  @click="cambiarImagen(url.trim())"
                />
              </template>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="product_info_wrapper">
            <div class="product_base_info">
              <h1>{{ producto_mostrar.titulo }}</h1>

              <div class="product_other_info">
                <p><span class="text-semibold">Categoría:</span> {{ producto_mostrar.linea }}</p>
                <p><span class="text-semibold">SKU:</span> {{ producto_mostrar.idpro }}</p>
              </div>

              <div class="price mt-3 mb-3 d-flex align-items-center">
                <span class="org_price ms-2">
                  ${{ Math.round(parseFloat(producto_mostrar.pt2)).toLocaleString() }}
                </span>
              </div>

              <div class="cart_qnty ms-md-auto">
                <p>Cantidad</p>
                <div class="d-flex align-items-center">
                  <div class="cart_qnty_btn" @click="decrementar">
                    <i class="las la-minus"></i>
                  </div>
                  <div class="cart_count">{{ cantidades }}</div>
                  <div class="cart_qnty_btn" @click="incrementar">
                    <i class="las la-plus"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botones de acción -->
            <div class="product_buttons">
              <button class="default_btn me-sm-3 me-2 px-2 px-lg-4">
                <i class="icon-cart me-2"></i> Al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        No se encontró el producto.
      </div>
    </div>
  </div>
</template>

<style scoped>
.product_quickview {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.prodquick_wrap {
  background-color: #fff;
  width: 80%;
  max-width: 900px; 
  min-height: 300px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,.3);
  border-radius: 8px;
  position: relative;
}

</style>

