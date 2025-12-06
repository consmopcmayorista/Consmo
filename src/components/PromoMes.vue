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
    { title: 'VASO TERMICO CON PITILLO COLORES VARIOS: C9135', image: 'C9135.png'},
    { title: 'UPS INTERACTIVA 6 TOMAS 600VA/360W WATTANA: 1655', image: '1655.png'},
    { title: 'UPS INTERACTIVA 6 TOMAS 800VA/480W WATTANA: 1656', image: '1656.png'},
    { title: 'POWER BANK PORTATIL 20000mAH ICONNEX: 1680', image: '1680.png'},
    { title: 'MINI TECLADO INALAMBRICO RGB SMART: 2042', image: '2042.png'},
    { title: 'IMPRESORA TERMICA POS 2en1 JALTECH: 2428', image: '2428.png'},
    { title: 'LECTOR CODIGO DE BARRAS ALAMBRICO DIGITALPOS: 2954', image: '2954.png'},
    { title: 'LECTOR CODIGO DE BARRAS OMNIDIRECCIONAL AUTO: 3367', image: '3367.png'},
    { title: 'LECTOR CODIGO DE BARRAS INALAMBRICO JALTECH: 3369', image: '3369.png'},
    { title: 'LECTOR CODIGO DE BARRAS OMNIDIRECCIONAL 2D: 3508', image: '3508.png'},
    { title: 'MINI KARAOKE RGB BT 5.3 JALTECH: 3598', image: '3598.png'},
    { title: 'PROYECTOR PORTABLE FHD ANDROID P30: 3627', image: '3627.png'},
    { title: 'PARLANTE MICROFONO BLUETOOTH 5.1: 3630', image: '3630.png'},
    { title: 'TECLADO GAMER RGB MECANICO NEGRO USB JEDEL: 4107', image: '4107.png'},
    { title: 'PARLANTE BT CON CARGA INALAMBRICA LUZ LED: 5896', image: '5896.png'},
    { title: 'BOLSO TIPO MILITAR CAMUFLAJEADO COLORES: 7891', image: '7891.png'},
    { title: 'CHASIS GAMER PARA PC TRIDIMENSIONAL RGB: 8897', image: '8897.png'},
    { title: 'TECLADO ALAMBRICO GAMER RGB GENIUS ERGONOMICO: 9202', image: '9202.png'},
    { title: 'WATCH ONN GOOGLE TV HDMI 4K: 9800', image: '9800.png'},
    { title: 'SET BROCHAS X3 PIEZAS DE SILICONA: C2553', image: 'C2553.png'},
    { title: 'BROCHAS DE MAQUILLAJE SET DE 13 PIEZAS: C2558', image: 'C2558.png'},
    { title: 'CAMARA IP WIFI ROBOTICA 1080P TENDA CP3: 1918', image: '1918.png'},
    
    
  



    
  
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
  
