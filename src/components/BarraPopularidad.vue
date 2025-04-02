<template>
    <!-- La línea se expande un poco al hacer hover -->
    <div
      class="linea-decorativa"
      :class="{ hover: isHover }"
      @mouseover="isHover = true"
      @mouseleave="isHover = false"
    ></div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const isHover = ref(false)
  </script>
  
  <style scoped>
  .linea-decorativa {
    height: 3px;
    margin: 16px 0;
    background: linear-gradient(90deg, #ff4d4d, #ffa64d, #ffff4d, #80ff4d, #4dffff, #4d4dff, #bf4dff);
    background-size: 400% 400%;
    animation: movimiento 4s linear infinite;
    transition: height 0.3s ease;
  }
  
  .linea-decorativa.hover {
    height: 5px;
  }
  
  @keyframes movimiento {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  </style>
  