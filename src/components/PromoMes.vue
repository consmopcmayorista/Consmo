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
    { title: 'MOUSE ALAMBRICO USB RETROILUMINADO WEIBO M-39 : 1219', image: '(1) 1219.png'},
    { title: 'DIADEMA PARA PC JD808 2 PLUG : C9542', image: '(2) C9542.png'},
    { title: 'DIADEMA PARA PC JD868 2 PLUG : C9540', image: '(3) C9540.png'},
    { title: 'CONVERTIDOR MINI DISPLAYPORT A HDMI : C9647', image: '(4) C9647.png'},
    { title: 'APUNTADOR/PRESENTADOR LASER INALAMBRICO : MC3000', image: '(5) MC3000.png'},
    { title: 'BATERIAS AA RECARGABLES X2 CARTON 1.2V NH-AA : C9003', image: '(6) C9003.png'},
    { title: 'COOLER PARA CHASIS RGB 120MM FUNCOOLER : 1320', image: '(7) 1320.png'},
    { title: 'DECODIFICADOR TDT +ATENA+CONTROL 1080P DVB-T2 : C9117', image: '(8) C9117.png'},
    { title: 'COOLER DISIPADOR PARA BOARD RGB INTEL/AMD : 9218', image: '(9) 9218.png'},
    { title: 'TV BOX 4GB+32GB 8K UHD CPU CORTEX-A53 T95MAX : C9105', image: '(10) C9105.png'},
    { title: 'GUAYA DE SEGURIDAD  USADA PARA PORTATIL (CON LLAVE) : U6003', image: '(11) U6003.png'},
    { title: 'ROUTER 2 ANTENAS TENDA N300 MOD N301 : 2501', image: '(12) 2501.png'},
    { title: 'ROUTER DUAL-BAND GIGABYTE 4 ANT TENDA AC1200 MOD AC8 : 2529', image: '(13) 2529.png'},
  



    
  
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
  
