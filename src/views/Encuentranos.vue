<script setup>
import { ref } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet';
import 'leaflet/dist/leaflet.css';

// Lista de sedes con coordenadas actualizadas
const branches = ref([
  {
    name: 'Sede Suramericana',
    image: '/images/img/especialidad/SURAMERICANA.png',
    coordinates: [6.254155593294459, -75.5826664180798], // Coordenadas actuales
    address: 'CALLE 48 C # 65 A 24, Medellín, Antioquia',
    phone: '+57 301 568 1832',
  },
  {
    name: 'Sede Minorista',
    image: '/images2/minorista.png',
    coordinates: [6.255780046262235, -75.57397730648458], // Coordenadas actuales
    address: 'CALLE 54 # 57 - 19, Medellín, Antioquia',
    phone: '+57 302 469 6886',
  },
  {
    name: 'Sede Montería',
    image: 'images/img/especialidad/MONTERIA.png',
    coordinates: [8.757636314501674, -75.88285754953107], // Coordenadas actuales
    address: 'CARRERA 05 # 33 - 24, Montería, Córdoba',
    phone: '+57 324 396 5955',
  },
]);
</script>

<template>
    <!-- Banner -->
    <div class="banner">
    <img src="/images2/banner_encuentranos.png" alt="Encuéntranos Banner" class="banner-image">
    <div class="banner-content">
    </div>
  </div>
  <div>
    <!-- Título principal -->
    <h1 style="text-align: center; margin-bottom: 1rem; font-size: 2.5rem; color: #333;">Encuéntranos</h1>
    
    <!-- Descripción -->
    <p style="text-align: center; font-size: 1.2rem; color: #666; margin-bottom: 2rem; line-height: 1.6;">
      Descubre nuestras sedes en Medellín y Montería. Encuentra la más cercana a ti y conoce nuestra ubicación exacta en el mapa para facilitar tu llegada.
    </p>
    
    <!-- Mostrar cada sede -->
    <div 
      v-for="(branch, index) in branches" 
      :key="index" 
      style="margin-bottom: 3rem; border: 1px solid #ddd; border-radius: 10px; padding: 1rem; transition: transform 0.2s; max-width: 800px; margin-left: auto; margin-right: auto;"
      @mouseover="e => e.currentTarget.style.transform = 'scale(1.02)'"
      @mouseleave="e => e.currentTarget.style.transform = 'scale(1)'"
    >
      <!-- Imagen de la sede -->
      <img 
        :src="branch.image" 
        :alt="branch.name" 
        style="width: 100%; height: auto; object-fit: cover; object-position: center top; border-radius: 10px; margin-bottom: 1rem; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"
      />
      
      <!-- Nombre de la sede -->
      <h2 style="text-align: center; margin-bottom: 1rem; color: #333; font-size: 1.5rem;">{{ branch.name }}</h2>
      
      <!-- Información adicional -->
      <p style="text-align: center; font-size: 1rem; margin-bottom: 1rem; color: #555; line-height: 1.6;">
        <strong>Dirección:</strong> {{ branch.address }}<br>
        <strong>Teléfono:</strong> <a :href="`tel:${branch.phone}`" style="color: #007bff; text-decoration: none;">{{ branch.phone }}</a>
      </p>

      <!-- Botón Cómo llegar -->
      <div style="text-align: center; margin-bottom: 1rem;">
        <a 
          :href="`https://www.google.com/maps/dir/?api=1&destination=${branch.coordinates[0]},${branch.coordinates[1]}`" 
          target="_blank" 
          style="background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 1rem;"
        >
          Cómo llegar
        </a>
      </div>

      <!-- Mapa de la ubicación -->
      <div style="height: 250px; border-radius: 10px; overflow: hidden;">
        <l-map :zoom="16" :center="branch.coordinates" style="height: 100%;">
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OpenStreetMap"
          ></l-tile-layer>
          
          <!-- Marcador con popup -->
          <l-marker :lat-lng="branch.coordinates">
            <l-popup>
              <strong>{{ branch.name }}</strong><br>
              {{ branch.address }}<br>
              <a 
                :href="`https://www.google.com/maps?q=${branch.coordinates[0]},${branch.coordinates[1]}`" 
                target="_blank" 
                style="color: #007bff; text-decoration: none;"
              >
                Ver en Google Maps
              </a>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<style>
@import 'leaflet/dist/leaflet.css';

/* Efecto opcional en el contenedor */
div:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}
/* Estilos para el banner */
.banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.banner-content p {
  font-size: 1.5rem;
}
</style>
