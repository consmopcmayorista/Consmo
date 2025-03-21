<template>
    <div class="promo-header">
      <h1>🎯 Promociones disponibles</h1>
      <p>¡Aprovecha las mejores ofertas en cada categoría!</p>
      <div class="tabs">
        <button
          v-for="(section, index) in sections"
          :key="index"
          :class="['tab', { active: activeTab === index }]"
          @click="$emit('change-tab', index)"
        >
          <span class="tab-icon">
            <template v-if="section.name.includes('Mes')">🗓️</template>
            <template v-else-if="section.name.includes('Liquidación')">🔥</template>
            <template v-else>💥</template>
          </span>
          {{ section.name }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['sections', 'activeTab'])
  defineEmits(['change-tab'])
  </script>
  
  <style scoped>
  .promo-header {
    text-align: center;
    margin-bottom: 20px;
  }
  .promo-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
  }
  .promo-header p {
    color: #607d8b;
    font-size: 1.1rem;
  }
  
  .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 20px;
  }
  .tab {
    background: #ffffff;
    border: 2px solid #42b983;
    color: #42b983;
    padding: 12px 20px;
    cursor: pointer;
    font-weight: 600;
    border-radius: 999px;
    transition: all 0.3s ease;
  }
  .tab:hover {
    background-color: #e0f7fa;
  }
  .tab.active {
    background: #42b983;
    color: white;
  }
  .tab-icon {
    margin-right: 6px;
  }
  </style>
  