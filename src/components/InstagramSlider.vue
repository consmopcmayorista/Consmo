<template>
    <section class="instagram-widget">
      <h2 class="text-center text-xl font-semibold mb-4">Síguenos en Instagram</h2>
      <div class="iframe-container">
        <iframe
          src="//lightwidget.com/widgets/bb1c151096255355966734f836145fe0.html"
          scrolling="no"
          allowtransparency="true"
          class="lightwidget-widget"
          style="width:100%; border:0; overflow:hidden;">
        </iframe>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js'
    script.async = true
    document.body.appendChild(script)
  })
  </script>
  
  <style scoped>
  .iframe-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  </style>
  