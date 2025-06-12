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
    { title: 'CAJA EXTERNAS SATA USB 2.0 PARA DISCO 2.5" :1412', image: '1412.png'},
    { title: 'ADAPTADOR WIFI USB 2.0 :6645', image: '6645.png' },
    { title: 'CHASIS GAMER RGB :8897', image: '8897.png' },
    { title: 'FUNDA PARA PORTATIL TIPO SOBRE 15.6" :9381', image: '9381.png' },
    { title: 'TECLADO NUMERICO :C9566', image: 'C9566.png' },
    { title: 'CONVERTIDOR USB 2.0 A RJ45 10/100 :C9568', image: 'C9568.png' },
    { title: 'CAMARA IP ROBOTICA WIFI 5 ANTENAS :C9663', image: 'C9663.png' },
    { title: 'HUB USB 3.0 7 PUERTOS CON SWITCH :C9680', image: 'C9680.png' },

    

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
  
  