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
    { title: 'IMPRESORA MULTIFUNCIONAL WIFI EPSON L3251: 5589', image: '5589.jpg'},
    { title: 'IMPRESORA MULTIFUNCIONAL USB EPSON L3210: 2416', image: '2416.jpg'},
    { title: 'IMPRESORA MULTIFUNCIONAL WIFI CANON PIXMA G3170: 2412', image: '2412.jpg'},
    { title: 'COMBO POS GRANDE CAJON + IMPRESORA 80MM + LECTOR: 3392-3981-3635', image: '3392-3981-3635.jpg'},
    { title: 'COMBO POS PEQUEÑO CAJON + IMPRESORA 58MM + LECTOR: 3393-3635-3619', image: '3393-3635-3619.jpg'},
    { title: 'LECTOR CODIGO DE BARRAS OMNIDIRECCIONAL 2D ALAMBRICO: 3685', image: '3685.jpg'},
    { title: 'IMPRESORA TERMICA POS 80MM USB+LAN+RJ11 NEOTEK : 3981', image: '3981.jpg'},
    { title: 'ROUTER NETIS INALAMBRICO N300 3 ANTENAS 5DBI: NET4004', image: 'NET4004.jpg'},
    { title: 'EQUIPO COMPLETO USADO TINY I5 6TA 8GB RAM/256GB SSD + MONITOR 19: U2152', image: 'U2152.jpg'},
    { title: 'TECLADO ALAMBRICO RGB COLOR NEGRO JEDEL K500+: 2236', image: '2236.jpg'},
    { title: 'IMPRESORA TERMICA POS 80MM USB+LAN+BLUETOOTH DIGITAL POS: 2409', image: '2409.jpg'},
    { title: 'CAJON MONEDERO PEQUEÑO 4 BILLETES 5 MONEDAS METALICO DIGITAL POS: 3694', image: '3694.jpg'},
    { title: 'CAMARA IP WIFI6 ROBOTICA AI 5MP TENDA MOD 3K CP7: 1696', image: '1696.jpg'},
    { title: 'ROUTER DUAL-BAND 5 ANTENAS 6DBI GIGABIT WIFI6 TENDA TX2JPRO: 2693', image: '2693.jpg'},
    { title: 'CAJON MONEDERO GRANDE 5 BILLETES 8 MONEDAS NEOTEK: 3392', image: '3392.jpg'},



    
    
  
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
  
