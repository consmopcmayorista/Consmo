<template>
  <div class="top-header">
    <div class="content">
      <transition-group name="fade" tag="div" class="messages-container">
        <div
          class="message"
          v-for="(message, index) in visibleMessages"
          :key="index"
        >
          {{ message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      messages: [
        "📣 ¡Compra con nosotros y recibe contra entrega a nivel nacional!",
        "🚚 Envíos gratis a todo Medellín por compras mayores a $400.000",
        "🆕 ¡Nueva colección de productos tecnológicos disponible ahora!",
      ],
      currentIndex: 0,
      visibleMessages: [],
      interval: null,
    };
  },
  mounted() {
    // Muestra el primer mensaje al cargar
    this.visibleMessages.push(this.messages[this.currentIndex]);
    // Inicia el ticker
    this.startTicker();
  },
  beforeDestroy() {
    // Limpia el intervalo al destruir el componente
    clearInterval(this.interval);
  },
  methods: {
    startTicker() {
      this.interval = setInterval(() => {
        this.nextMessage();
      }, 4000); // Cambia cada 4 segundos
    },
    stopTicker() {
      clearInterval(this.interval);
    },
    nextMessage() {
      this.currentIndex = (this.currentIndex + 1) % this.messages.length;
      this.updateVisibleMessages();
    },
    updateVisibleMessages() {
      this.visibleMessages = [this.messages[this.currentIndex]];
    },
  },
};
</script>

<style scoped>
.top-header {
  background: linear-gradient(90deg, #f77f00, #fcbf49); /* Colores llamativos */
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.messages-container {
  overflow: hidden;
  width: 100%; /* Ajusta según el diseño */
  display: flex;
  justify-content: center;
  align-items: center;
}

.message {
  white-space: nowrap;
  padding: 0 10px;
}

/* Animaciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Ajustes para dispositivos móviles */
@media (max-width: 768px) {
  .top-header {
    font-size: 1rem; /* Ajusta el tamaño de la fuente en móviles */
    padding: 8px 0;
  }

  .message {
    padding: 0 5px; /* Reduce el padding en móviles */
  }
}
</style>