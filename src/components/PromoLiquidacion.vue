<template>
  <div v-if="promos.length > 0" class="promos-gallery">
      <div
        v-for="(promo, index) in promos"
        :key="index"
        class="promo-card"
        @click="$emit('select-promo', { ...promo, folder: 'liquidacion' })"
      >
        <div class="badge">🔥 LIQUIDACIÓN</div>
        <img :src="`/images2/promos/liquidacion/${promo.image}`" :alt="promo.title" />
        <div class="promo-title">{{ promo.title }}</div>
      </div>
    </div>
    <div v-else class="no-promos-message">
      ⚠️ Actualmente no hay promociones de Liquidación. ¡Muy pronto tendrás nuevas ofertas!
      </div>
  </template>
  
  <script setup>
  const promos = [
      { title: 'DIADEMA PARA PC/TABLETS/CELULAR C:4060', image: '4060.png' },
      { title: 'MEMORIA RAM DDR4 4GB 2666 C:5052', image: '5052.png' },
      { title: 'DATAFONO MOVIL C:9335', image: '9335.png' },
      { title: 'DIADEMA PARA PC JD-868 2 PLUG C:C9540', image: 'C9540.png' },
      { title: 'DIADEMA PARA PC JD-808 2 PLUG C:C9542', image: 'C9542.png' },
      { title: 'DIADEMA PARA PC JD-809 1 PLUG C:C9546', image: 'C9546.png' },
      { title: 'PARLANTES USB DE 3W M600 C:C9560', image: 'C9560.png' },
      { title: 'ROUTER XPON-ONU 2.4G :C2565', image: 'C2565.png' },
      { title: 'CARRETA FIBRA OPTICA DROP PLANA :C9001', image: 'C9001.png' },
      { title: 'TECLADO NUMERICO :C9566', image: 'C9566.png' },
      { title: 'CONVERTIDOR USB 2.0 A RJ45 :C9568', image: 'C9568.png' },
      { title: 'CABLE DE RED BLANCO CAT 6E 10MTS :C9610', image: 'C9610.png' },
      { title: 'CABLE DE RED BLANCO CAT 6E 15MTS :C9611', image: 'C9611.png' },
      { title: 'CABLE DE RED BLANCO CAT 6E 20MTS :C9612', image: 'C9612.png' },
      { title: 'CABLE DE RED BLANCO CAT 6E 30MTS :C9613', image: 'C9613.png' },
      { title: 'CABLE USB MACHO A MACHO 2.0 BLINDADO 60CM :C9625', image: 'C9625.png' },
      { title: 'CABLE EXTENSION USB 2.0 BLINDADO 1.5CM :C9627', image: 'C9627.png' },
      { title: 'CABLE EXTENSION USB 2.0 BLINDADO 3 METROS :C9628', image: 'C9628.png' },
      { title: 'CABLE EXTENSION USB 2.0 ACTIVA 15 METROS :C9631', image: 'C9631.png' },
      { title: 'CABLE CABLE OPTICO ENMALLADO 3 METROS :C9633', image: 'C9633.png' },
      { title: 'CABLE 2X1 ENCAUCHETADO 10 METROS :C9639', image: 'C9639.png' },
      { title: 'CONVERTIDOR USB 3.0 A RJ45 10/100 :C9644', image: 'C9644.png' },
      { title: 'CONVERTIDOR MINI DISPLAYPORT A HDMI :C9647', image: 'C9647.png' },
      { title: 'CABLE VGA MACHO EN Y :C9653', image: 'C9653.png' },
      { title: 'CORREA DE DATOS SATA 40CM :C9656', image: 'C9656.png' },
      { title: 'GUAYA CON LLAVE 1.10 METROS :C9657', image: 'C9657.png' },
      { title: 'KIT DE DESTORNILLADORES 31 EN 1 :C9675', image: 'C9675.png' },
      { title: 'CABLE DATOS MOLEX IDE SATA EN Y :C9681', image: 'C9681.png' },
      { title: 'CABLE OPTICO ENMALLADO 1.5 METROS :C9688', image: 'C9688.png' },
      { title: 'HUB USB 2.0 4 PUERTOS :MC2091', image: 'MC2091.png' },
  ]
  </script>
  
  <style scoped>
  .promos-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  .promo-card {
    width: 240px;
    background: #fff5f5;
    border: 2px solid #ff5252;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: 0.2s;
  }
  .promo-card:hover {
    transform: scale(1.05);
  }
  .promo-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
  .badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #ff5252;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 8px;
  }
  .promo-title {
    padding: 10px;
    font-size: 1rem;
    font-weight: 700;
    color: #d32f2f;
    text-align: center;
  }
  .promo-card img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  background-color: #fff1f1;
}
.no-promos-message {
  background-color: #fff3cd;
  color: #856404;
  border: 2px dashed #ffeeba;
  padding: 20px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  margin: 40px auto;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  animation: fadeIn 0.4s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
  </style>
  