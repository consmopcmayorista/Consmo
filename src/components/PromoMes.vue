<template>
    <div class="promos-gallery">
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
  </template>
  
  <script setup>
  const promos = [
  { title: 'MONITOR IPS 23.8" 1920X1080 100HZ', image: '3431.png' },
    { title: 'MONITOR IPS 27" 1920X1080 100HZ', image: '3432.png' },
    { title: 'MONITOR IPS 23.8" 1920X1080 180HZ', image: '3433.png' },
    { title: 'CHASIS PARA PC BASICK RGB LINEAL', image: '8898.png' },
    { title: 'SOPORTE TV DE BRAZO AJUSTABLE', image: '2930.png' },
    { title: 'IMPRESORA DE CODIGOS DE BARRA/ETIQUETA', image: '3512.png' },
    { title: 'CONVERTIDOR USB TIPO C A RJ45 (LAN)', image: 'C9645.png' },
    { title: 'RADIO DE COMUNICACIÓN X2 BAOFENG', image: '1048.png' },
    { title: 'LECTOR CODIGO DE BARRAS ALAMBRICO', image: '4355.png' },
    { title: 'DECODIFICADOR TDT 1080P', image: '5006.png' },
    { title: 'COMBO POS GRANDE LECTOR/IMPRESORA/CAJON', image: 'C9100 - 3391 - 4355.png' },
    { title: 'COMBO POS PEQUEÑO LECTOR/IMPRESORA/CAJON', image: '2211 - 4355 - C9102.png' },
    { title: 'TODO EN UNO POS 11.6"', image: '2706.png' },
    { title: 'CAMARA IP ROBOTICA 5 ANTENAS WIFI', image: 'C9663.png' },
    { title: 'DISCO DURO PC PULL 500GB SEAGATE', image: '2309.png' },
    { title: 'DISCO DURO PC PULL 3TB HITACHI', image: '2361.png' },
    { title: 'DISCO DURO PC PULL 4TB SEAGATE', image: '2966.png' },
    { title: 'PARLANTE GAMER RGB USB-PLUG 6W', image: 'C9577.png' },
    { title: 'CAJA EXTERNA SATA GAMER RGB 3.0', image: 'C9557.png' },
    { title: 'SOPLADORA ELECTRICA VELOCIDADES 110V', image: 'C7001.png' },
    { title: 'TV BOX 8K UHD 3GB+32GB CPU CORTEX', image: '9191.png' },
    { title: 'CARRETA CABLE UTP INTERIOR CAT 5E', image: '1870.png' },
    { title: 'FUENTES DE PODER FULL MODULAR NEGRA JYR', image: '1551 - 1552 - 1553 - 1554.png' },
    { title: 'FUENTES DE PODER FULL MODULAR BLANCA JYR', image: '1547 - 1548 - 1549 - 1550.png' },
    { title: 'ANTENA CPE EXTERIOR PUNTO A PUNTO 5KL', image: '2524.png' },
    { title: 'ROUTER DUAL-BAND 5 ANTENAS', image: '2693.png' },
    { title: 'BOARD DDR4 AMD RYZEN AM4', image: '2656.png' },
    { title: 'ROUTER DUAL-BAND GIGABYTE 4 ANTENAS', image: '2529.png' },
    { title: 'ROUTER 2 ANT 4G SIM CARD TENDA', image: '9559.png' },
    
    // ...otros
  ]
  </script>
  
  <style scoped>
  .promos-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
  .promo-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .promo-card:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  .promo-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .promo-title {
    padding: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    color: #2c3e50;
    text-align: center;
  }
  .promo-card img {
  width: 100%;
  height: 220px; /* antes: 180px */
  object-fit: contain;
  background-color: #f9f9f9;
}

  </style>
  