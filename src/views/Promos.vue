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
          <span>¡Pídelo ahora!</span>
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
  position: absolute;
  right: -300px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff5c5c;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  z-index: 10;
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

  .promo-sticker-modal {
    right: 50%;
    bottom: -60px;
    transform: translateX(50%);
    top: unset;
  }
}
</style>