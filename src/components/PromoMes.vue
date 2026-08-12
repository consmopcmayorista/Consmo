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
   { title: 'RADIO DE COMUNICACIÓN X2 BAOFENG BF-S9 PLUS: 1064', image: '1064.jpg'},
   { title: 'ROUTER 2 ANT GPON FIBRA OPTICA DUAL-BAND HUAWEI: 2519', image: '2519.jpg'},
   { title: 'SWITCH DE RED 24 PTOS GIGABYTE METALICO TENDA: 2528', image: '2528.jpg'},
   { title: 'ROUTER DUAL-BAND GIGABYTE 4 ANTEAS TENDA AC8: 2529', image: '2529.jpg'},
   { title: 'SWITCH DE RED 5 PTOS BASE 10/100 CONSMO: 2551', image: '2551.jpg'},
   { title: 'SWITCH DE RED 8 PTOS BASE 10/100 CONSMO: 2553', image: '2553.jpg'},
   { title: 'SWITCH DE RED 8 PTOS GIGABYTE CONSMO: 2554', image: '2554.jpg'},
   { title: 'MONITOR LED VA PLANO 22 PUL FHD AOC: 3396', image: '3396.jpg'},
   { title: 'RADIO COMUNICACION X1 BAOFENG UVSR: 1051', image: '1051.jpg'},
   { title: 'RADIO COMUNICACIÓN X2 BAOFENG UV-9RPLUS: 1060', image: '1060.jpg'},
   { title: 'MONITOR INDUSTRIAL LED 32¨ DAHUA: 3415', image: '3415.jpg'},
   { title: 'CARGADOR CELULAR 65W 2MTS TIPO C ADATA: 5876', image: '5876.jpg'},
   { title: 'CHASIS GAMER PARA PC ATX 4 COOLER ARG XPG: 6982', image: '6982.jpg'},
   { title: 'TONER IMPRESORA LASER SIN CHIP: 7715', image: '7715.jpg'},
   { title: 'FUENTE DE PODER REAL 750W WATTANA: 8953', image: '8953.jpg'},
   { title: 'POWER BANK 10000MAH CARGA RAPIDA ADATA: 9848', image: '9848.jpg'},
   { title: 'IMPRESORA TERMICA MOVIL 58MM USB/BT STARPOS: 9989', image: '9989.jpg'},
   { title: 'ROUTER INALAMBRICO XPON-ONU 2.4G FIBRA OPTICA: C2565', image: 'C2565.jpg'},
   { title: 'TV BOX 4GB + 32GB 8K UHD T95MAX: C9105', image: 'C9105.jpg'},
   { title: 'ROUTER NETIS AX1500 WIFI 6 4ANT GIGABIT NX10: NET4007', image: 'NET4007.jpg'},
  
  
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
  
