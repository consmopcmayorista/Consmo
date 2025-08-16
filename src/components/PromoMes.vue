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
    { title: 'IMPRESORA TERMICA POS 80MM :2405', image: '2405.png'},
    { title: 'IMPRESORA TERMICA POS 58MM :2424', image: '2424.png'},
    { title: 'MONITOR IPS 23.8" 1920X1080 FULL HD :3431', image: '3431.png'},
    { title: 'DIADEMA PARA PC USB MONOAURAL :4046', image: '4046.png'},
    { title: 'CARRETA EXT FIBRA OPTICA MONOMODO 1000MT :9825', image: '9825.png'},
    { title: 'LECTOR CODIGO DE BARRAS 1D/2D ALAMBRICO :9863', image: '9863.png'},
    { title: 'MEMORIA RAM DDR4 16GB 3200 MHZ :2691', image: '2691.png'},
    { title: 'TABLET 10.95" IPS FHD 128GB :8791', image: '8791.png'},
    { title: 'DECODIFICADOR TDT :C9117', image: 'C9117.png'},
    { title: 'TORRE TINI CORE I5 6TA :U9130', image: 'U9130.png'},
    { title: 'CLONADORA LECTORA DE DISCOS SATA 2.5 Y 3.5 // 3.0 :9397', image: '9397.png'},
    { title: 'SUPER PROMOCION CORE I5 8GB RAM SSD 256GB CON MONITOR NUEVO DE 23.8" FULL HD :U9132', image: 'U9132.png'},





    
    
  
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
  
