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
    // { title: 'GAFAS DE REALIDAD VIRTUAL 3D + CONTROL :5002', image: '5002.png' },
    // { title: 'TARJETA INTERNA PCI EXPRESS SONIDO :9084', image: '9084.png' },
    // { title: 'COOLER DISIPADOR PARA BOARD RGB INTEL/AMD :9218', image: '9218.png' },
    // { title: 'DECODIFICADOR TDT 1080P :C9117', image: 'C9117.png' },
    // { title: 'LECTOR DE CODIGOS DE BARRA OMNIDIRECCIONAL 2D :3071', image: '3071.png' },
    // { title: 'MONITOR IPS 23.8" :3431', image: '3431.png' },

    
 
 
 
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
  