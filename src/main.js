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




const app = createApp(App)

app.use(router)

app.mount('#app');


