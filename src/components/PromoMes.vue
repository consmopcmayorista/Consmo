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
    { title: 'REGULADOR DE VOLTAJE 8 TOMAS 1200VA / 600W WATTANA : 1564', image: '1564.png'},
    { title: 'MINI TECLADO PREMIUM INALAMBRICO BLUETOOTH RGB : 2077', image: '2077.png'},
    { title: 'IMPRESORA TERMICA POS 80MM USB+LAN+RJ11 NEOTEK : 3616', image: '3616.png'},
    { title: 'FUENTE DE PODER GAMER FULL MODULAR BLANCA 650W JYR : 1547', image: '1547.png'},
    { title: 'FUENTE DE PODER GAMER FULL MODULAR NEGRA 750W JYR : 1552', image: '1552.png'},
    { title: 'UPS INTERACTIVA 8 TOMAS RJ45 1500VA/900W GP2000 ICONNEX : 1660', image: '1660.png'},
    { title: 'CARRETA CABLE UTP INTERIOR CAT 6E CERTIFICADA 70/30 LPS 305MTS : 1836', image: '1836.png'},
    { title: 'MEMORIA RAM DDR3L 8GB 1600 (PC3L 12800)PC - KINGSTON  : 2132', image: '2132.png'},
    { title: 'CAJON MONEDERO PEQUEÑO 4 BILLETES/8 MONEDAS RIEL PLASTICO : 2212', image: '2212.png'},
    { title: 'MEMORIA MICRO SD 256GB 100MB/s KINGSTON CANVAS : 2379', image: '2379.png'},
    { title: 'ROUTER 2 ANT GPON FIBRA OPTICA DUAL-BAND HUAWEI : 2519', image: '2519.png'},
    { title: 'COMBO TECLADO Y MOUSE INALAMBRICO TIPO GAMER : 2991', image: '2991.png'},
    { title: 'BOLSO TIPO MILITAR CAMUFLAJEADO COLORES SURTIDOS : 7891', image: '7891.png'},
    { title: 'TV BOX 4GB+32GB 8K ULTRA HD T95ZPLUS : 9191', image: '9191.png'},
    { title: 'IMPRESORA TERMICA BLUETOOTH 80MM COLPOS : 9438', image: '9438.png'},
    { title: 'COOLER LED PARA CHASIS 120MM AZUL - ROJO - VERDE  : 9707-9708-9706', image: '9707-9708-9706.png'},
    { title: 'PAD MOUSE GAMER NEGRO LINEA ROJA 75CMX35CMX0.3CM WEIBO K9 : 9722', image: '9722.png'},
  



    
  
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
  
