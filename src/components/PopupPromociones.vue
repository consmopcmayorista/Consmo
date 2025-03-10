<template>
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <button class="close-btn" @click="closePopup">&times;</button>
        <img src="/images2/promos/inicio.jpg" alt="Promociones de Marzo" class="promo-image">
        <div class="popup-content">
          <h2>¡Promociones de Marzo!</h2>
          <p>No te pierdas nuestras increíbles promociones del mes de marzo.</p>
          <button class="promo-btn" @click="goToPromociones">Ir a Promociones</button>
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
      goToPromociones() {
        this.$router.push('/promociones');
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
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  max-width: 400px;
  width: 90%;
  animation: pop-in 0.5s ease-out;
}

@keyframes pop-in {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #ff0015; /* Color azul */
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #0056b3; /* Azul más oscuro al pasar el ratón */
}

.promo-image {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.popup-content h2 {
  margin-top: 0;
  color: #007BFF; /* Color azul */
}

.popup-content p {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.promo-btn {
  background: #007BFF; /* Color azul */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.promo-btn:hover {
  background: #0056b3; /* Azul más oscuro al pasar el ratón */
}
</style>