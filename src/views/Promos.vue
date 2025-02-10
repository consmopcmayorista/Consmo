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
      <h1 class="promos-title">Promociones de Febrero</h1>
      <p class="promos-subtitle">Cada mes encontrarás nuevas promociones aquí.</p>
  
      <!-- Galería de promociones -->
      <div class="promos-gallery">
        <div class="promo-item" v-for="(promo, index) in promos" :key="index" @click="openModal(promo, index)">
          <img :src="`/images2/promos/${promo.image}`" :alt="promo.title" class="promo-image" />
        </div>
      </div>
  
      <!-- Modal de promoción -->
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>{{ selectedPromo.title }}</h2>
          <img :src="`/images2/promos/${selectedPromo.image}`" :alt="selectedPromo.title" class="modal-image" />
          <button class="close-modal" @click="closeModal">X</button>
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
    { title: 'Promoción 1', image: '1530.jpg' },
    { title: 'Promoción 2', image: '1836.jpg' },
    { title: 'Promoción 3', image: '1870.jpg' },
    { title: 'Promoción 4', image: '1934.jpg' },
    { title: 'Promoción 5', image: '2601.jpg' },
    { title: 'Promoción 6', image: '3519.jpg' },
    { title: 'Promoción 7', image: '9555 - 9556 - 1001 - 9558.jpg' },
    { title: 'Promoción 8', image: '9703.jpg' },
    { title: 'Promoción 9', image: 'C2565.jpg' },
    { title: 'Promoción 10', image: 'C9105.jpg' },
    { title: 'Promoción 11', image: 'C9119.jpg' },
    { title: 'Promoción 12', image: 'C9120.jpg' },
    { title: 'Promoción 13', image: 'C9121.jpg' },
    { title: 'Promoción 14', image: 'C9122.jpg' },
    { title: 'Promoción 15', image: 'C9675.jpg' }
  ]);
  
  const closePopup = () => {
    showPopup.value = false;
  };
  
  const openModal = (promo, index) => {
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
    text-align: right;
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
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .promos-title {
    font-size: 2.5em;
    margin-bottom: 10px;
  }
  
  .promos-subtitle {
    font-size: 1.2em;
    margin-bottom: 20px;
    color: #555;
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
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .main-image {
      max-height: 300px;
    }
  
    .promos-gallery {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
  </style>