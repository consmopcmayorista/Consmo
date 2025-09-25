<template>
  <div v-if="promos.length > 0" class="promos-gallery">
    <div
      v-for="(promo, index) in promos"
      :key="index"
      class="promo-card"
      @click="$emit('select-promo', { ...promo, folder: 'mes' })"
    >
      <img :src="`/images2/promos/mes/${promo.image}`" :alt="promo.title" />
      <div class="promo-title">{{ promo.title }}</div>
    </div>
  </div>
  <div v-else class="no-promos-message">
    ⚠️ Actualmente no hay promociones del mes. ¡Muy pronto tendrás nuevas ofertas!
  </div>
</template>
  
  <script setup>
  const promos = [
    { title: 'UPS INTERATIVA 6 TOMAS 500VA/240 :1653', image: '1653.png'},
    { title: 'LECTOR CODIGO DE BARRAS INALAMBRICO :3502', image: '3502.png'},
    { title: 'PROYECTOR PORTABLE FHD ANDROID WIFI DUAL BAND :3627', image: '3627.png'},
    { title: 'CHASIS GAMER PARA PC TRIDIMENCIONAL RGB 6 COOLERS :8897', image: '8897.png'},
    { title: 'COMBO TECLADO Y MOUSE ALAMBRICO USB RETROILUMINADO :C2005', image: 'C2005.png'},
    { title: 'AURICULARES OPEN EAR OSEA SPORT BT 5.3 COLOR NEGRO WESDAR-R103 :4896', image: '4896.png'},
    { title: 'CHASIS PARA PC GAMER TIPO PECERA NEGRO ARGB + 5 COOLER  :8896', image: '8896.png'},
    { title: 'CHASIS PARA PC GAMER TIPO PECERA BLANCO ARGB + 5 COOLER :8895', image: '8895.png'},
    { title: 'PAD MOUSE GEL CON ALMOHADILLA NEGRO :8029', image: '8029.png'},
    { title: 'PAD MOUSE CON ALMOHADILLA NEGRO :8028', image: '8028.png'},
    { title: 'COOLER RGB PARA CHASIS 120MM 4 PINES :8026', image: '8026.png'},
    { title: 'BOCINA ASISTENTE DE VOZ INTELIGENTE 5TA GEN ALEXA AMAZON :6021', image: '6021.png'},
    { title: 'PARLANTES USB PARA PC RGB COLOR NEGRO JEDEL :4086', image: '4086.png'},
    { title: 'PARLANTE USB PARA PC RETROILUMINADO :4080', image: '4080.png'},
    { title: 'LECTOR CODIGO DE BARRAS ALAMBRICO SIN BASE 2D/QR NEOTEK :3618', image: '3618.png'},
    { title: 'LECTOR CODIGO DE BARRAS OMNIDIRECCIONAL 2D ALAMBRICO :3508', image: '3508.png'},
    { title: 'ROUTER DUAL-BAND GIGABYTE 4 ANTENAS TENDA AC1200 :2529', image: '2529.png'},
    { title: 'MOUSE INALAMBRICO COLOR NEGRO JEDEL W920 :2242', image: '2242.png'},
    { title: 'MOUSE INALAMBRICO COLORES JEDEL W120 :2239', image: '2239.png'},
    { title: 'MOUSE INALAMBRICO COLOR NEGRO JEDEL W927 :2238', image: '2238.png'},
    { title: 'COMBO MOUSE GAMER Y PAD MOUSE GAMER COLOR NARANJA-NEGRO :2237', image: '2237.png'},
    { title: 'TECLADO ALAMBRICO RGB COLOR NEGRO JEDEL K500+ :2236', image: '2236.png'},
    { title: 'COMBO TECLADO/DIADEMA/MOUSE/PADMOUSE 4 EN 1 JEDEL :2234', image: '2234.png'},
    { title: 'COMBO TECLADO Y MOUSE INALAMBRICO COLOR NEGRO JEDEL :2233', image: '2233.png'},
    { title: 'COMBO TECLADO Y MOUSE ALAMBRICO COLOR BLANCO RGB JEDEL :2231', image: '2231.png'},
    { title: 'COMBO TECLADO Y MOUSE ALAMBRICO COLOR NEGRO JEDEL G19 :2230', image: '2230.png'},


    
    
  
    // Agrega más promociones según sea necesario
  ]
  </script>
  
  <style scoped>
  .promos-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }
  
  .promo-card {
    background: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(0, 132, 255, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 3px solid transparent;
    background-image: linear-gradient(#ffffff, #ffffff), 
                      linear-gradient(135deg, #56ccf2, #2f80ed);
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
  
  .promo-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0, 132, 255, 0.25);
  }
  
  .promo-card img {
    width: 100%;
    height: 260px;
    object-fit: contain;
    background-color: #f0f9ff;
    padding: 16px;
  }
  
  .promo-title {
    padding: 16px;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0a3d62;
    text-align: center;
    background-color: #eaf6ff;
    border-top: 1px solid #d3eaff;
  }
  
  .no-promos-message {
    background-color: #dff6ff;
    color: #026aa7;
    border: 2px dashed #b3e4ff;
    padding: 24px;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    margin: 40px auto;
    max-width: 520px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    animation: fadeIn 0.4s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  
