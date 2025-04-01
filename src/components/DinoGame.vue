<template>
    <div class="dino-wrapper">
      <iframe
        ref="iframe"
        src="/dino-game.html"
        frameborder="0"
        class="dino-frame"
      ></iframe>
    </div>
  </template>
  
  <script setup>
  // El iframe carga el archivo local del juego HTML
  </script>
  
  <style scoped>
  .dino-wrapper {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    background: #fff;
  }
  
  .dino-frame {
    width: 100%;
    height: 400px;
    border: none;
  }
  </style>
  