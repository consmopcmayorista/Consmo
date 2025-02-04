<template>
    <div class="preloader" v-if="isLoading">
      <img src="/assets/images/preloader.gif" alt="Loading..." />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Preloader',
    props: {
      isLoading: {
        type: Boolean,
        default: true
      }
    }
  }
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .preloader img {
    width: 50px;
    height: auto;
  }
  </style>