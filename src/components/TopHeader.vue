<template>
  <div class="top-header">
    <div class="marquee">
      <div class="marquee-track">
        <div class="marquee-content">
          <span v-for="(message, index) in messages" :key="'1-' + index">
            {{ message }}<span class="separator">•</span>
          </span>
          <span v-for="(message, index) in messages" :key="'2-' + index">
            {{ message }}<span class="separator">•</span>
          </span>
        </div>
      </div>
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
    };
  },
};
</script>

<style scoped>
.top-header {
  background: linear-gradient(90deg, #0f0f0f, #000000);
  color: #fff;
  font-size: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  overflow: hidden;
  padding: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.marquee {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
}

.marquee-track {
  display: flex;
  will-change: transform;
  animation: scroll 25s linear infinite;
  transform: translate3d(0, 0, 0); /* GPU acceleration */
}

.marquee-content {
  display: flex;
}

.marquee-content span {
  padding: 0 40px;
  display: inline-block;
  font-smooth: always;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.separator {
  margin: 0 20px;
  color: #aaa;
}

/* ANIMACIÓN SUAVE CONTINUA */
@keyframes scroll {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .top-header {
    font-size: 0.9rem;
  }

  .marquee-content span {
    padding: 0 20px;
  }

  .separator {
    margin: 0 10px;
  }
}
</style>
