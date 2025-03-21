<template>
    <div class="promos-gallery">
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
  </template>
  
  <script setup>
  const promos = [
  { title: 'DIADEMA PARA PC', image: 'C9541.jpg' },
      { title: 'BASE REFRIGERANTE', image: 'C9570.jpg' },
      { title: 'PARLANTES USB 3W MADERA', image: 'C9664.jpg' },
      { title: 'HUB USB 3.0 7 PUERTOS SWITCH', image: 'C9680.jpg' },
      { title: 'LECTOR DE TARJETAS SD 5 EN 1', image: 'C9685.jpg' },
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

  </style>
  