<template>
  <div class="promos-container">
    <!-- Popup inicial -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content">
        <img src="/images2/promos/inicio.jpg" alt="Promociones de Febrero" class="popup-image" />
        <button class="close-popup" @click="closePopup">X</button>
      </div>
    </div>

    <!-- Título principal -->
    <h1 class="promos-title">Promociones de Marzo</h1>
    <p class="promos-subtitle">Cada mes encontrarás nuevas promociones aquí.</p>

    <!-- Galería de promociones -->
    <div v-if="promos.length > 0" class="promos-gallery">
      <div class="promo-item" v-for="(promo, index) in promos" :key="index" @click="openModal(promo, index)">
        <img :src="`/images2/promos/${promo.image}`" :alt="promo.title" class="promo-image" />
        <div class="promo-overlay">
          <span class="promo-title">{{ promo.title }}</span>
        </div>
      </div>
    </div>
    <div v-else class="no-promos">
      <p>No hay promociones disponibles en este momento. Vuelve pronto para más ofertas</p>
    </div>

    <!-- Modal de promoción -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ selectedPromo.title }}</h2>
        <img :src="`/images2/promos/${selectedPromo.image}`" :alt="selectedPromo.title" class="modal-image" />
        <button class="close-modal" @click="closeModal">X</button>
        <div class="promo-sticker-modal">
          <a
            :href="`https://wa.me/573015537673?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20un%20producto%20en%20promoci%C3%B3n%20del%20mes.%20Producto%3A%20${selectedPromo.title}`"
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
import { ref } from 'vue';

const showPopup = ref(true);
const showModal = ref(false);
const selectedPromo = ref({});

const promos = ref([
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
  ]);

const closePopup = () => {
  showPopup.value = false;
};

const openModal = (promo) => {
  selectedPromo.value = promo;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.promos-container {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
}

.popup-overlay {
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

.popup-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.popup-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
}

.close-popup {
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

.promos-title {
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #333;
}

.promos-subtitle {
  font-size: 1.2em;
  margin-bottom: 20px;
  color: #666;
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
  background-color: #25d366; /* Color de fondo de WhatsApp */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.2em;
  transition: background-color 0.3s ease;
}

.whatsapp-button:hover {
  background-color: #1ebe57; /* Color de fondo al pasar el mouse */
}

@media (max-width: 768px) {
  .main-image {
    max-height: 300px;
  }

  .promos-gallery {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .modal-content {
    padding: 10px;
    width: 95%;
  }

  .popup-content {
    padding: 10px;
    width: 95%;
  }

  .close-popup,
  .close-modal {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}
</style>