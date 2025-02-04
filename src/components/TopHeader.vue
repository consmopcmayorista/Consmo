<template>
    <div class="top-header">
      <div class="content">
        <button @click="prevMessage" class="nav-button">❮</button>
        <transition-group name="fade" tag="div" class="messages-container">
          <div
            class="message"
            v-for="(message, index) in visibleMessages"
            :key="index"
          >
            {{ message }}
          </div>
        </transition-group>
        <button @click="nextMessage" class="nav-button">❯</button>
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
      prevMessage() {
        this.currentIndex =
          (this.currentIndex - 1 + this.messages.length) % this.messages.length;
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
    width: 70%; /* Ajusta según el diseño */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .message {
    white-space: nowrap;
    padding: 0 10px;
  }
  
  /* Botones de navegación */
  .nav-button {
    background-color: #fff;
    border: none;
    color: #f77f00;
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }
  
  .nav-button:hover {
    transform: scale(1.2);
    background-color: #fcbf49;
    color: #fff;
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
  
  /* Espaciado para evitar que el header tape el contenido */
  body {
    padding-top: 60px; /* Ajusta según la altura del header */
  }
  </style>
  