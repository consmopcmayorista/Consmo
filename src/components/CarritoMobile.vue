<template>
    <div class="mobile_menwrap d-lg-none" id="mobileCart">
      <div class="mobile_cart_wrap d-flex flex-column">
        <h5 class="mobile_title">
          Carrito
          <span class="sidebarclose" @click="closeMobileCart">
            <i class="las la-times"></i>
          </span>
        </h5>
        <div class="px-3 py-3 flex-grow-1 d-flex flex-column">
          <div class="cart_droptitle">
            <h4 class="text_lg">Total {{ cant_en_carrito }} Productos</h4>
          </div>
          <div class="cartsdrop_wrap">
            <div class="muestra" id="muestra2"></div>
          </div>
          <div class="mt-auto">
            <div class="total_cartdrop">
              <h4 class="text_lg text-uppercase mb-0">Sub Total:</h4>
              <h4 class="text_lg mb-0 ms-2" id="total_ticket2"></h4>
            </div>
            <!-- mobile cart button  -->
            <div class="cartdrop_footer mt-3 d-flex">
              <a href="/carrito" class="default_btn w-50 text_xs px-1">Ver Carro</a>
              <a href="/confirmacion" class="default_btn second ms-3 w-50 text_xs px-1">Pagar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Importar las variables y funciones necesarias de App.vue
  import { cant_en_carrito, cargar_arreglo_car, ocultarSugerencias, imprimir_carrito } from '../App.vue'
  
  const isMobileCartOpen = ref(false)
  
  function closeMobileCart() {
    isMobileCartOpen.value = false
  }
  
  onMounted(() => {
    cargar_arreglo_car()
  })
  </script>
  
  <style scoped>
  .mobile_menwrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    display: none; /* Initially hidden */
  }
  
  .mobile_menwrap.d-lg-none {
    display: flex;
  }
  
  .mobile_cart_wrap {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    max-height: 80%; /* Evita que el modal sobresalga de la pantalla */
    overflow-y: auto;
  }
  
  .mobile_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .sidebarclose {
    cursor: pointer;
  }
  </style>