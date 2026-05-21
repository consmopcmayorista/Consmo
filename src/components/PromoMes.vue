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
   { title: 'MONITOR 22" FHD 100HZ/10MS HDMI/VGA DAHUA: 3365', image: '3365.jpg'},
   { title: 'MONITOR 24" LED 100HZ/10MS HDMI/VGA DAHUA: 3363', image: '3363.jpg'},
   { title: 'CAMARA IP ROBOTICA 5 ANTENAS WIFI DUALBAND VI365: C9663', image: 'C9663.jpg'},
   { title: 'ROUTER 5 ANTENAS DUALBAND GIGABIT WIFI 6 TX2L PRO: 2693', image: '2693.jpg' },
   { title: 'TODO EN UNO POS INDUSTRIAL 15¨ CORE I3 7TH 8GB/256GB: 2793', image: '2793.jpg'},
   { title: 'SOPORTE ELEVADOR MONITOR 4 PUERTOS USB 2.0 MADERA: 3214', image: '3214.jpg'},
   { title: 'MEMORIA RAM DDR3 8GB 1600 (PC3-12800) PC-DTECHCO: 5694', image: '5694.jpg'},
   { title: 'CHASIS GAMER PARA PC ATX NEGRO 2 COOLER XPG: 6983', image: '6983.jpg'},
   { title: 'MOUSE INALAMBRICO VERTICAL RECARGABLE+BT ERGONOMICO: 7836', image: '7836.jpg'},
   { title: 'IMPRESORA MULTIFUNCIONAL DUPLEX WIFI BROTHER T730DW: 8828', image: '8828.jpg'},
   { title: 'DIADEMA PARA PC USB CON CONTROL VOLUMEN LOGITECH H390: 9133', image: '9133.jpg'},
   { title: 'COOLER PARA CHASIS 120MM: 9705,9706,9707,9708', image: '9705, 9706, 9707, 9708.jpg'},
   { title: 'DECODIFICADOR TDT + ANTENA + CONTROL 1080P: C9117', image: 'C9117.jpg'},
   { title: 'BASE REFRIGERANTE 1 COOLER CONSMO: C9570', image: 'C9570.jpg'},
   { title: 'UPS INTERACTIVA 400VA/240W WATTANA: 1654', image: '1654.jpg'},
   { title: 'MEMORIA RAM DDR4 8GB 2666 (PC4-21300) PC-DTECHCO: 2197', image: '2197.jpg'},
   { title: 'CAJON MONEDERO GRANDE 5 BILLETES 4 MONEDAS XT405: 2220', image: '2220.jpg'},
   { title: 'IMPRESORA TERMICA POS 80MM USB+RED COLPOS: 2405', image: '2405.jpg'},
   { title: 'IMPRESORA TERMICA POS 2 EN 1 RECIBOS Y ETIQUETAS: 2428', image: '2428.jpg'},
   { title: 'ROUTER DUAL-BAND 4 ANTENAS GIGABIT AC8 TENDA: 2529', image: '2529.jpg'},
   { title: 'MEMORIA RAM DDR4 16GB 3200 (PC4-25600) PC-DTECHCO: 2691', image: '2691.jpg'},
   
   
    
  
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
  
