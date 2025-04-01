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
      { title: 'DIADEMA PARA PC/TABLETS/CELULAR C:4060', image: '4060.jpg' },
      { title: 'MEMORIA RAM DDR4 4GB 2666 C:5052', image: '5052.jpg' },
      { title: 'DATAFONO MOVIL C:9335', image: '9335.jpg' },
      { title: 'DIADEMA PARA PC JD-868 2 PLUG C:C9540', image: 'C9540.jpg' },
      { title: 'DIADEMA PARA PC JD-808 2 PLUG C:C9542', image: 'C9542.jpg' },
      { title: 'DIADEMA PARA PC JD-809 1 PLUG C:C9546', image: 'C9546.jpg' },
      { title: 'PARLANTES USB DE 3W M600 C:C9560', image: 'C9560.jpg' },
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
  