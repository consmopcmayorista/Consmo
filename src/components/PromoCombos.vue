<template>
  <div v-if="promos.length > 0" class="promos-gallery">
      <div
        v-for="(promo, index) in promos"
        :key="index"
        class="promo-card"
        @click="$emit('select-promo', { ...promo, folder: 'pagueylleve' })"
      >
        <div class="combo-label">💼 COMBO</div>
        <img :src="`/images2/promos/pagueylleve/${promo.image}`" :alt="promo.title" />
        <div class="promo-title">{{ promo.title }}</div>
      </div>
    </div>
    <div v-else class="no-promos-message">
      ⚠️ Actualmente no hay promociones Pague y Lleve. ¡Muy pronto tendrás nuevas ofertas!
      </div>
  </template>
  
  <script setup>
  const promos = [
      { title: 'DIADEMA PARA PC C:C9541', image: 'C9541.jpg' },
      { title: 'BASE REFRIGERANTE C:C9570', image: 'C9570.jpg' },
      { title: 'PARLANTES USB 3W MADERA C:C9664', image: 'C9664.jpg' },
      { title: 'HUB USB 3.0 7 PUERTOS SWITCH C:C9680', image: 'C9680.jpg' },
      { title: 'LECTOR DE TARJETAS SD 5 EN 1 C:C9685', image: 'C9685.jpg' },
  ]
  </script>
  
  <style scoped>
  .promos-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  .promo-card {
    background: #212121;
    color: #fdd835;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    border: 2px solid #fdd835;
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  .promo-card:hover {
    transform: scale(1.05);
  }
  .promo-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-bottom: 1px solid #fdd835;
  }
  .combo-label {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #fdd835;
    color: #212121;
    font-weight: bold;
    font-size: 0.8rem;
    padding: 4px 8px;
    border-radius: 999px;
  }
  .promo-title {
    padding: 12px;
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
  }
  .promo-card img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  background-color: #1c1c1c;
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
  