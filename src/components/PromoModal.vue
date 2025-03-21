<template>
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="$emit('close')">×</button>
        <h2>{{ promo.title }}</h2>
        <img
          :src="`/images2/promos/${promo.folder}/${promo.image}`"
          :alt="promo.title"
          class="modal-image"
        />
  
        <div class="promo-sticker-modal">
          <a
            :href="whatsappLink"
            target="_blank"
            class="whatsapp-button"
          >
            ¡Pídelo ahora!
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    promo: {
      type: Object,
      required: true
    }
  })
  
  const getPromoTipo = (folder) => {
    switch (folder) {
      case 'mes':
        return 'producto en promoción del mes'
      case 'liquidacion':
        return 'producto en liquidación'
      case 'pagueylleve':
        return 'combo pague y lleve'
      default:
        return 'producto en promoción'
    }
  }
  
  const whatsappLink = computed(() => {
    const tipo = getPromoTipo(props.promo.folder)
    const titulo = encodeURIComponent(props.promo.title)
    const texto = encodeURIComponent(`Hola, quiero más información sobre un ${tipo}. Producto: ${titulo}`)
    return `https://wa.me/573015537673?text=${texto}`
  })
  </script>
  
  <style scoped>
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
    padding: 30px 20px;
    border-radius: 20px;
    text-align: center;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .modal-content h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .modal-image {
    width: 100%;
    height: auto;
    max-height: 400px;
    object-fit: contain;
    border-radius: 14px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 2px solid #f0f0f0;
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
    font-size: 20px;
    cursor: pointer;
  }
  
  .promo-sticker-modal {
    margin-top: 15px;
  }
  
  .whatsapp-button {
    display: inline-block;
    padding: 12px 24px;
    background-color: #25d366;
    color: white;
    text-decoration: none;
    border-radius: 999px;
    font-weight: bold;
    font-size: 1.1rem;
    transition: background-color 0.3s ease;
  }
  
  .whatsapp-button:hover {
    background-color: #1ebe57;
  }
  </style>
  