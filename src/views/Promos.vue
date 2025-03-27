// Promos.vue (Componente principal)
<template>
  <div class="promos-container">
    <PromoHeader :activeTab="activeTab" :sections="sections" @change-tab="changeTab" />

    <component
      :is="currentComponent"
      @select-promo="openModal"
    />

    <PromoModal
      v-if="showModal"
      :promo="selectedPromo"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PromoHeader from '@/components/PromoHeader.vue'
import PromoModal from '@/components/PromoModal.vue'
import PromoMes from '@/components/PromoMes.vue'
import PromoLiquidacion from '@/components/PromoLiquidacion.vue'
import PromoCombos from '@/components/PromoCombos.vue'
import PromoRelampago from '@/components/PromoRelampago.vue'

const activeTab = ref(0)
const showModal = ref(false)
const selectedPromo = ref(null)

const sections = [
  { name: 'Promociones del Mes', component: PromoMes },
  { name: 'Liquidación', component: PromoLiquidacion },
  { name: 'Combos Pague y Lleve', component: PromoCombos },
  { name: 'Relámpago', component: PromoRelampago },
]

const currentComponent = computed(() => sections[activeTab.value].component)

const changeTab = (index) => {
  activeTab.value = index
}

const openModal = (promo) => {
  selectedPromo.value = promo
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.promos-container {
  padding: 20px;
  background: #f4f4f4;
  min-height: 100vh;
}
</style>