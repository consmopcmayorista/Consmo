import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css'
import axios from 'axios';
import 'bootstrap';
import $ from 'jquery';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'leaflet/dist/leaflet.css';

// Interceptor para normalizar precios basados en el IVA (19 -> pt2, 0 -> pt1)
function normalizarPrecios(data, visited = new Set()) {
  if (data && typeof data === 'object') {
    if (visited.has(data)) return;
    visited.add(data);

    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        normalizarPrecios(data[i], visited);
      }
    } else {
      if ('pt1' in data && 'iva' in data) {
        const ivaVal = String(data.iva || '').trim();
        if (ivaVal === '19') {
          if (!('pt1_original' in data)) {
            data.pt1_original = data.pt1;
          }
          data.pt1 = data.pt2 || data.pt1;
        }
      }
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          normalizarPrecios(data[key], visited);
        }
      }
    }
  }
}

axios.interceptors.response.use((response) => {
  if (response && response.data) {
    normalizarPrecios(response.data);
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

const app = createApp(App)

app.use(router)

app.mount('#app');



