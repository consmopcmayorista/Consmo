<template>
  <div v-if="showPopup" class="popup-overlay" @click="closePopup">
    <div class="popup" @click.stop>
      <button class="close-btn" @click="closePopup">&times;</button>
      <img src="/images2/promos/combopos.jpg" alt="Combo POS" class="promo-image" />
      <div class="popup-content">
        <h1>🔥 Combo POS desde $257.000</h1>
        <h2>Impresora, lector de código de barras y cajón monedero en un solo combo</h2>
        <p>Precios y disponibilidad limitados. ¡Cotiza el tuyo ahora!</p>
        <button class="promo-btn" @click="goToWhatsApp">
          💬 Compra ahora por WhatsApp
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      showPopup: true,
    };
  },
  methods: {
    goToWhatsApp() {
      const numero = "573015681832";
      const mensaje = "¡Hola! Me interesa el Combo POS por $257.000 que vi en la promoción.";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
      this.showPopup = false;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>
  
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
}

.popup {
  background: #ffffff;
  border-radius: 16px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  text-align: center;
  animation: popupFadeIn 0.3s ease-out;
}

@keyframes popupFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 14px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.8);
}

.promo-image {
  width: 100%;
  display: block;
  border-radius: 16px 16px 0 0;
}

.popup-content {
  padding: 24px 28px 28px;
}

.popup-content h1 {
  font-size: 24px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 12px;
  line-height: 1.3;
}

.popup-content h2 {
  font-size: 20px;
  font-weight: 600;
  color: #2c2c3a;
  margin: 0 0 14px;
  line-height: 1.5;
}

.popup-content p {
  font-size: 13px;
  font-weight: 600;
  color: #e63946;
  margin: 0 0 20px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.promo-btn {
  background: #25d366;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease;
  animation: pulseButton 1.8s ease-in-out infinite;
}

.promo-btn:hover {
  background: #1ebe5a;
  animation-play-state: paused;
}

@keyframes pulseButton {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
  }
  70% {
    transform: scale(1.03);
    box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}

.promo-btn:hover {
  background: #1ebe5a;
  transform: translateY(-1px);
}
</style>