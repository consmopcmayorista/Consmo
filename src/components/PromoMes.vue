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
   { title: 'MONITOR 23" FHD 100HZ HDMI/VGA DAHUA: 3363', image: '3363.png'},
    { title: 'MONITOR 27" LED 100HZ HDMI/VGA DAHUA: 3398', image: '3398.png'},
     { title: 'LECTOR CODIGO DE BARRAS ALAMBRICO SIN BASE 1D/2D/QR NEOTEK: 3635', image: '3635.png'},
      { title: 'CARGADOR PARA CELULAR 65W TIPO CX2 PTOS USB C - USB A CARGA RAPIDA 100W: 5876', image: '5876.png'},
       { title: 'IMPRESORA MULTIFUNCIONAL DUPLEX WIFI/RJ45 FAX EPSON L6490: 6490', image: '6490.png'},
       { title: 'CHASIS GAMER TRIDIMENSIONAL PARA PC RGB NEGRO 6 COOLERS ORIGAMI ORI-6027: 8897', image: '8897.png'},
        { title: 'FUENTE DE PODER REAL ATX  600W 24X1 NEGRA 80 PLUS BRONCE XPG PROBE: 1526', image: '1526.png'},
         { title: 'COMBO TECLADO Y MOUSE INALAMBRICO NEGRO CONNECT  KB-205: 2249', image: '2249.png'},
          { title: 'ROUTER 2 ANTENAS TENDA N300 MOD N301: 2501', image: '2501.png'},
           { title: 'CAJON MONEDERO PEQUEÑO 4 BILLETES 5 MONEDAS RIEL PLASTICO 12V LEXA XT-3335: 3359', image: '3359.png'},

    
    
  
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
  
