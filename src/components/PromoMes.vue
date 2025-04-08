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
    { title: 'CAJON MONEDERO PEQUEÑO :3513', image: '3513.png' },
    { title: 'MOUSE ALAMBRICO RETROILUMINADO :1219', image: '1219.png' },
    { title: 'FUENTE DE PODER 790W ATX :1530', image: '1530.png' },
    { title: 'CONTROL INALAMBRICO PS3 :2805', image: '2805.png' },
    { title: 'CAMARA WEB USB NT-003 :9557', image: '9557.png' },
    { title: 'CAJA CONVERTIDORA HDMI A VGA :MC1045', image: 'MC1045.png' },
    { title: 'TABLET 10.5" IPS FHD ANDROID :8791', image: '8791.png' },
    { title: 'CHASIS GAMER TRIDIMENSIONAL RGB :8897', image: '8897.png' },
    { title: 'TODO EN UNO POS 15.6" :2707', image: '2707.png' },
    { title: 'TODO EN UNO POS 11.6" I3 5TA :2706', image: '2706.png' },
    { title: 'ROUTER DUAL-BAND 4 ANTENAS :2529', image: '2529.png' },
    { title: 'ROUTER DUAL-BAND 5 ANTENAS WIFI 6 :2693', image: '2693.png' },
    { title: 'MONITOR IPS 23.8" 100Hz :3431', image: '3431.png' },
    { title: 'MONITOR IPS 27" 100Hz :3432', image: '3432.png' },
    { title: 'MONITOR IPS 27" CURVO 180Hz :3433', image: '3433.png' },
    { title: 'CHASIS PARA PC RGB LINEAL NEGRO :8898', image: '8898.png' },
    { title: 'PARLANTE USB-PLUG GAMER RGB 6W X2 :C9577', image: 'C9577.png' },

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
  
  