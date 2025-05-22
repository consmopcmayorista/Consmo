<template>
  <div v-if="promos.length > 0" class="promos-gallery">
      <div
        v-for="(promo, index) in promos"
        :key="index"
        class="promo-card"
        @click="$emit('select-promo', { ...promo, folder: 'relampago' })"
      >
      <div class="flash-badge">
  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.3 1L4 9h4l-.3 6 7-8H9l.3-6z"/>
  </svg>
  ¡RELÁMPAGO!
</div>


        <img :src="`/images2/promos/relampago/${promo.image}`" :alt="promo.title" />
        <div class="promo-title">{{ promo.title }}</div>
        <div class="promo-timer">Oferta válida por tiempo limitado</div>
      </div>
    </div>
    <div v-else class="no-promos-message">
    ⚠️ Actualmente no hay promociones Relampago. ¡Muy pronto tendrás nuevas ofertas!
  </div>
  </template>
  
  <script setup>
  const promos = [ 
    { title: 'MONITOR PLANO 21.5" :3435', image: '3435.png' },
    { title: 'MONITOR CURVO 24" :3436', image: '3436.png' },
    { title: 'MONITOR PLANO 27" 2K :3437', image: '3437.png' },
    { title: 'BOARD DDR4 AMD RYZEN 3000 :2616', image: '2616.png' },
    { title: 'CHASIS GAMER PARA PC :6917', image: '6917.png' },
    { title: 'COOLER DISIPADOR PARA BOARD :9270', image: '9270.png' },
    { title: 'LECTOR CODIGOS DE BARRAS SLIM USB :2694', image: '2694.png' },
    { title: 'IMPRESORA CODIGOS DE BARRA/ETIQUETA :3512', image: '3512.png' },
    { title: 'CAJON MONEDERO AHORRADOR DE ESPACIO :3521', image: '3521.png' },
    { title: 'BOCINA ASISTENTE DE VOZ INTELIGENTE ALEXA :6021', image: '6021.png' },
 
 
 
  ]
  </script>
  
  <style scoped>
  .promos-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  
  .promo-card {
    position: relative;
    background: linear-gradient(145deg, #ffe082, #ffca28);
    color: #212121;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s;
  }
  
  .promo-card:hover {
    transform: scale(1.05);
  }
  
  .flash-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    background: #ef6c00;
    color: white;
    font-weight: bold;
    padding: 6px 10px;
    font-size: 0.8rem;
    border-radius: 8px;
    z-index: 1;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
  
  .promo-card img {
    width: 100%;
    height: 220px;
    object-fit: contain;
    background: #fffde7;
  }
  
  .promo-title {
    padding: 12px 10px 5px;
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
  }
  
  .promo-timer {
    text-align: center;
    padding-bottom: 12px;
    font-size: 0.9rem;
    color: #5d4037;
    font-style: italic;
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
  