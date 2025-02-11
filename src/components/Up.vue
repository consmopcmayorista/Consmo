<template>
    <div>
      <button v-if="isVisible" @click="scrollToTop" class="scroll-to-top">
        <i class="fas fa-arrow-up"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
      };
    },
    mounted() {
      window.addEventListener('scroll', this.toggleVisibility);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.toggleVisibility);
    },
    methods: {
      toggleVisibility() {
        this.isVisible = window.scrollY > 200;
      },
      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .scroll-to-top {
    position: fixed;
    bottom: 60px; /* Adjust this value for desktop */
    left: 30px; /* Adjust this value for desktop */
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .scroll-to-top:hover {
    background-color: #0056b3;
    transform: scale(1.1);
  }
  
  /* Responsive design for mobile */
  @media (max-width: 768px) {
    .scroll-to-top {
      bottom: 620px; /* Adjust this value for mobile */
      left: 3px; /* Adjust this value for mobile */
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
    }
  }
  </style>