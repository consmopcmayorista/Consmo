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
    { title: 'CAMARA AI 5MP IP WI-F16 :1696', image: '1696.png'},
    { title: 'CAMARA EXTERIOR 1080P FULL COLOR 2K 3MP :1911', image: '1911.png'},
    { title: 'CAMARA IP/PT/ALEXA 10MP FULL COLOR H.265 :1974', image: '1974.png'},
    { title: 'DISCO ESTADO SOLIDO 256GB DTECHCO :2331', image: '2331.png'},
    { title: 'DISCO ESTADO SOLIDO 128GB DTECHCO :2332', image: '2332.png'},
    { title: 'ROUTER 3 ANTENAS N300 MOD F3 :2504', image: '2504.png'},
    { title: 'ROUTER DUAL-BAND 4 ANT GIGABYTE TENDA AC1200 :2529', image: '2529.png'},
    { title: 'ROUTER DUAL-BAND 5 ANT 6DBI GIGABIT WIFI 6 TENDA TX2L PRO :2693', image: '2693.png'},
    { title: 'TODO EN UNO POS INDUSTRIAL 15" :2703', image: '2703.png'},
    { title: 'LECTOR CODIGO DE BARRAS INALAMBRICO-BT :2955', image: '2955.png'},
    { title: 'UPS INTERACTIVA 6 TOMAS 500VA :1653 ', image: '1653.png'},
    { title: 'UPS INTERACTIVA 6 TOMAS 600VA :1655', image: '1655.png'},
    { title: 'AUDIFONOS BLUETOOHT 5.4 RGB  :1951', image: '1951.png'},
    { title: 'IMPRESORA TERMICA POS 80MM :2409', image: '2409.png'},
    { title: 'BASE REFRIGERANTE RECLINABLE 3 COOLER :3691', image: '3691.png'},
    { title: 'BASE REFRIGERANTE RECLINABLE LED 6 COOLER :6192', image: '6192.png'},
    { title: 'CAJA EXTERNA SATA GAMER RGB USB 3.0 :C9557', image: 'C9557.png'}, 


    
    
  
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
  
