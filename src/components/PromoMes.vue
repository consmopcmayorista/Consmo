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
   //{ title: 'COMBO POS CAJON+IMPRESORA+LECTOR: 3359,9987,9985', image: '3359, 9987, 9985.jpg'},
   //{ title: 'UPS INTERACTIVA 6 TOMAS 800VA/480W JALTECH: 1578', image: '1578.jpg'},
   //{ title: 'VASO DE ACRILICO CON PITILLO: C9135', image: 'C9135.jpg'},
   //{ title: 'LECTOR DE HUELLAS BIOMETRICO JALTECH: 9978', image: '9978.jpg'},
   //{ title: 'MONITOR TACTIL POS CAPACITIVO 15" DIGITALPOS: 9792', image: '9792.jpg'},
   //{ title: 'ROUTER DUAL-BAND 4 ANTENAS TP-LINK C50: 9738', image: '9738.jpg'},
   //{ title: 'CPE EXTERIOR PUNTO A PUNTO 500 MTS TENDA: 9428', image: '9428.jpg'},
   //{ title: 'COOLER DISIPADOR PARA BOARD RGB INTEL/AMD: 9218', image: '9218.jpg'},
   //{ title: 'TV SMART TV DE 32" HD GOOGLE TV IFFALCON: 6655', image: '6655.jpg'},
   //{ title: 'MONITOR LCD IPS DE 27" PLANO FHD 120Hz/1MS AOC: 3397', image: '3397.jpg'},
   //{ title: 'SWITCH DE RED 24 PTOS GIGABITE METALICO TENDA: 2528', image: '2528.jpg'},
   //{ title: 'CHASIS GAMER PARA PC ATX NEGRO + 2 COOLER RAINBOW: 8910', image: '8910.jpg'},
   


  
  
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
  
