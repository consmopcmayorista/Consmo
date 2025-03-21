<template>
  <div class="promos-container">
    <!-- Encabezado bonito -->
    <div class="promo-header">
      <h1>🎯 Promociones disponibles</h1>
      <p>¡Aprovecha las mejores ofertas del momento en cada categoría!</p>
    </div>

    <!-- Navegación entre secciones -->
    <div class="tabs">
      <button
        v-for="(section, index) in sections"
        :key="index"
        :class="['tab', { active: activeTab === index }]"
        @click="activeTab = index"
      >
        <span class="tab-icon">
          <template v-if="section.name.includes('Mes')">🗓️</template>
          <template v-else-if="section.name.includes('Liquidación')">🔥</template>
          <template v-else>💥</template>
        </span>
        {{ section.name }}
      </button>
    </div>

    <!-- Galería y Modal siguen igual... -->
    <div v-if="sections[activeTab].items.length > 0" class="promos-gallery">
      <div
        class="promo-item"
        v-for="(promo, index) in sections[activeTab].items"
        :key="index"
        @click="openModal(promo, sections[activeTab].folder)"
      >
        <img
          :src="`/images2/promos/${sections[activeTab].folder}/${promo.image}`"
          :alt="promo.title"
          class="promo-image"
        />
        <div class="promo-overlay">
          <span class="promo-title">{{ promo.title }}</span>
        </div>
      </div>
    </div>
    <div v-else class="no-promos">
      <p>No hay promociones disponibles en este momento. Vuelve pronto para más ofertas</p>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ selectedPromo.title }}</h2>
        <img
          :src="`/images2/promos/${selectedPromo.folder}/${selectedPromo.image}`"
          :alt="selectedPromo.title"
          class="modal-image"
        />
        <button class="close-modal" @click="closeModal">X</button>
        <div class="promo-sticker-modal">
          <a
            :href="`https://wa.me/573015537673?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20un%20producto%20en%20promoci%C3%B3n.%20Producto%3A%20${selectedPromo.title}`"
            target="_blank"
            class="whatsapp-button"
          >
            ¡Pídelo ahora!
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
const selectedPromo = ref({})
const activeTab = ref(0)

const sections = [
  {
    name: 'Promociones del Mes',
    folder: 'mes',
    items: [
      { title: 'MONITOR IPS 23.8" 1920X1080 100HZ', image: '3431.png' },
      { title: 'MONITOR IPS 27" 1920X1080 100HZ', image: '3432.png' },
      { title: 'MONITOR IPS 23.8" 1920X1080 180HZ', image: '3433.png' },
      { title: 'CHASIS PARA PC BASICK RGB LINEAL', image: '8898.png' },
      { title: 'SOPORTE TV DE BRAZO AJUSTABLE', image: '2930.png' },
      { title: 'IMPRESORA DE CODIGOS DE BARRA/ETIQUETA', image: '3512.png' },
      { title: 'CONVERTIDOR USB TIPO C A RJ45 (LAN)', image: 'C9645.png' },
      { title: 'RADIO DE COMUNICACIÓN X2 BAOFENG', image: '1048.png' },
      { title: 'LECTOR CODIGO DE BARRAS ALAMBRICO', image: '4355.png' },
      { title: 'DECODIFICADOR TDT 1080P', image: '5006.png' },
      { title: 'COMBO POS GRANDE LECTOR/IMPRESORA/CAJON', image: 'C9100 - 3391 - 4355.png' },
      { title: 'COMBO POS PEQUEÑO LECTOR/IMPRESORA/CAJON', image: '2211 - 4355 - C9102.png' },
      { title: 'TODO EN UNO POS 11.6"', image: '2706.png' },
      { title: 'CAMARA IP ROBOTICA 5 ANTENAS WIFI', image: 'C9663.png' },
      { title: 'DISCO DURO PC PULL 500GB SEAGATE', image: '2309.png' },
      { title: 'DISCO DURO PC PULL 3TB HITACHI', image: '2361.png' },
      { title: 'DISCO DURO PC PULL 4TB SEAGATE', image: '2966.png' },
      { title: 'PARLANTE GAMER RGB USB-PLUG 6W', image: 'C9577.png' },
      { title: 'CAJA EXTERNA SATA GAMER RGB 3.0', image: 'C9557.png' },
      { title: 'SOPLADORA ELECTRICA VELOCIDADES 110V', image: 'C7001.png' },
      { title: 'TV BOX 8K UHD 3GB+32GB CPU CORTEX', image: '9191.png' },
      { title: 'CARRETA CABLE UTP INTERIOR CAT 5E', image: '1870.png' },
      { title: 'FUENTES DE PODER FULL MODULAR NEGRA JYR', image: '1551 - 1552 - 1553 - 1554.png' },
      { title: 'FUENTES DE PODER FULL MODULAR BLANCA JYR', image: '1547 - 1548 - 1549 - 1550.png' },
      { title: 'ANTENA CPE EXTERIOR PUNTO A PUNTO 5KL', image: '2524.png' },
      { title: 'ROUTER DUAL-BAND 5 ANTENAS', image: '2693.png' },
      { title: 'BOARD DDR4 AMD RYZEN AM4', image: '2656.png' },
      { title: 'ROUTER DUAL-BAND GIGABYTE 4 ANTENAS', image: '2529.png' },
      { title: 'ROUTER 2 ANT 4G SIM CARD TENDA', image: '9559.png' },
    ]
  },
  {
    name: 'Liquidación',
    folder: 'liquidacion',
    items: [
      { title: 'DIADEMA PARA PC/TABLETS/CELULAR', image: '4060.jpg' },
      { title: 'MEMORIA RAM DDR4 4GB 2666', image: '5052.jpg' },
      { title: 'DATAFONO MOVIL', image: '9335.jpg' },
      { title: 'DIADEMA PARA PC JD-868 2 PLUG', image: 'C9540.jpg' },
      { title: 'DIADEMA PARA PC JD-808 2 PLUG', image: 'C9542.jpg' },
      { title: 'DIADEMA PARA PC JD-809 1 PLUG', image: 'C9546.jpg' },
      { title: 'PARLANTES USB DE 3W M600', image: 'C9560.jpg' },
    ]
  },
  {
    name: 'Combos Pague y Lleve',
    folder: 'pagueylleve',
    items: [
      { title: 'DIADEMA PARA PC', image: 'C9541.jpg' },
      { title: 'BASE REFRIGERANTE', image: 'C9570.jpg' },
      { title: 'PARLANTES USB 3W MADERA', image: 'C9664.jpg' },
      { title: 'HUB USB 3.0 7 PUERTOS SWITCH', image: 'C9680.jpg' },
      { title: 'LECTOR DE TARJETAS SD 5 EN 1', image: 'C9685.jpg' },
    ]
  }
]

const openModal = (promo, folder) => {
  selectedPromo.value = { ...promo, folder }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.promos-container {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
}

.tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tab {
  background: #ddd;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s;
}

.tab.active {
  background: #42b983;
  color: white;
}

.promos-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  padding: 20px;
}

.promo-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.promo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-radius: 10px;
}

.promo-item:hover .promo-image {
  transform: scale(1.1);
}

.no-promos {
  text-align: center;
  font-size: 1.5em;
  color: #666;
  margin-top: 20px;
}

.promo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  font-size: 1.2em;
  text-align: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 600px;
  width: 90%;
}

.modal-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 10px;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff5c5c;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.promo-sticker-modal {
  margin-top: 15px;
}

.whatsapp-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #25d366;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.whatsapp-button:hover {
  background-color: #1ebe57;
}

@media (max-width: 768px) {
  .promos-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .modal-content {
    padding: 10px;
    width: 95%;
  }

  .close-modal {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}

.promos-container {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(to bottom right, #f3f4f6, #e0f7fa);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.promo-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
}

.promo-header p {
  color: #607d8b;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 2px solid #42b983;
  color: #42b983;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 600;
  border-radius: 999px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.tab:hover {
  background-color: #e0f7fa;
}

.tab.active {
  background: #42b983;
  color: white;
  transform: scale(1.05);
}

.tab-icon {
  font-size: 1.2rem;
}

.promos-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 10px;
}

.promo-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  background: white;
  transition: transform 0.2s ease;
}

.promo-item:hover {
  transform: translateY(-5px);
}

.promo-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.promo-overlay {
  padding: 12px;
  font-weight: 600;
  color: #333;
}

.modal-content {
  border-radius: 20px;
}

.whatsapp-button {
  padding: 12px 25px;
  font-size: 1.1em;
  border-radius: 999px;
  background-color: #25d366;
  color: white;
  font-weight: bold;
  transition: background 0.3s ease;
}

.whatsapp-button:hover {
  background-color: #1ebe57;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }

  .promo-image {
    height: 180px;
  }
}

</style>
