<template>
  <div class="menu-mobile">
    <!-- Botón hamburguesa (izquierda) -->
    <button @click="toggleMenu" class="hamburger-button">
      ☰
    </button>

    <!-- Fondo oscuro al abrir -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>

    <!-- Menú lateral visual estructurado -->
    <aside :class="['side-menu', { open: isMenuOpen }]">
      <!-- Encabezado -->
      <div class="menu-header">
        <h2>Menu</h2>
        <button @click="toggleMenu" class="close-button">✖</button>
      </div>

      <!-- Ítems del menú -->
      <ul class="menu-items">
        <!-- 🔍 Buscar primero -->
        <li @click="abrirBuscador">
          <i class="icon">🔍</i>
          <span>Buscar</span>
        </li>
        <li @click="goTo('/')">
          <i class="icon">🏠</i>
          <span>Inicio</span>
        </li>
        <li @click="goTo('/catalogo')">
          <i class="icon">📦</i>
          <span>Catálogo</span>
        </li>
        <li @click="goTo('/promociones')">
          <i class="icon">🏷️</i>
          <span>Promociones</span>
        </li>
        <li @click="goTo('/calificanos')">
          <i class="icon">⭐</i>
          <span>Califícanos</span>
        </li>
        <li @click="goTo('/foro')">
          <i class="icon">💬</i>
          <span>Foro</span>
        </li>
        <li @click="goTo('/conocenos')">
          <i class="icon">ℹ️</i>
          <span>Conócenos</span>
        </li>
        <li @click="goTo('/encuentranos')">
          <i class="icon">📍</i>
          <span>Encuéntranos</span>
        </li>
      </ul>
    </aside>

    <!-- Modal del buscador integrado -->
    <div v-if="isBuscarModalOpen" class="buscar-modal">
      <button class="close-button" @click="toggleBuscarModal">✖️</button>
      <div class="buscar-modal-content">
        <div class="search_wrap">
          <input
            type="text"
            placeholder="Buscar producto..."
            v-model="busqueda"
            @input="filtrarProductos"
            autocomplete="off"
            @blur="ocultarSugerencias"
          />
          <button class="btn-buscar" @click="buscarProductos">Buscar</button>
        </div>

        <!-- Resultados -->
        <div v-if="producto_buscado.length" class="search_result_product">
          <div
            v-for="(dato, index) in producto_buscado"
            :key="index"
            class="single_sresult_product"
            @click="irAlProducto(dato.id)"
          >
            <div class="sresult_img">
              <img :src="dato.imagen" />
            </div>
            <div class="sresult_content">
              <h4>{{ dato.titulo }}</h4>
              <div class="price">
                ${{ Math.round(parseFloat(dato.pt1)).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MenuMobile',
  data() {
    return {
      isMenuOpen: false,
      isBuscarModalOpen: false,
      busqueda: '',
      producto_buscado: []
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleBuscarModal() {
      this.isBuscarModalOpen = !this.isBuscarModalOpen;
    },
    abrirBuscador() {
      this.toggleMenu();
      this.toggleBuscarModal();
    },
    goTo(ruta) {
      this.$router.push(ruta);
      this.toggleMenu();
    },
    async filtrarProductos() {
      if (this.busqueda.length <= 2) {
        this.producto_buscado = [];
        return;
      }

      try {
        const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${this.busqueda}&id=24`;
        const response = await axios.get(url);
        const productos = response.data.productos || [];

        const busquedaMinus = this.busqueda.toLowerCase();
        const palabrasClave = busquedaMinus.split(" ").filter(Boolean);

        const exactas = productos.filter(p => {
          const t = p.titulo?.toLowerCase() || "";
          const id = p.idpro?.toLowerCase() || "";
          return t.includes(busquedaMinus) || id.includes(busquedaMinus);
        });

        const parciales = productos.filter(p => {
          const t = p.titulo?.toLowerCase() || "";
          const id = p.idpro?.toLowerCase() || "";
          return palabrasClave.every(pal => t.includes(pal) || id.includes(pal)) && !exactas.includes(p);
        });

        this.producto_buscado = [...exactas, ...parciales];

      } catch (error) {
        console.error("Error al buscar:", error);
      }
    },
    ocultarSugerencias() {
      setTimeout(() => {
        this.producto_buscado = [];
      }, 200);
    },
    buscarProductos() {
      if (this.busqueda.length > 2) {
        this.filtrarProductos();
        this.toggleBuscarModal();
      }
    },
    irAlProducto(id) {
      this.$router.push({ name: 'producto', query: { producto: id } }).then(() => {
        this.toggleBuscarModal();
        this.ocultarSugerencias();
        window.scrollTo(0, 0);
      });
    }
  }
};
</script>

<style scoped>
/* Oculta en pantallas grandes */
@media (min-width: 768px) {
  .menu-mobile {
    display: none;
  }
}

.menu-mobile {
  font-family: 'Segoe UI', sans-serif;
}

/* Botón hamburguesa */
.hamburger-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1200;
  background: #061F27;
  color: #fff;
  font-size: 26px;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

/* Fondo oscuro */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1190;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

/* Panel lateral */
.side-menu {
  position: fixed;
  top: 0;
  left: -280px;
  width: 260px;
  height: 100%;
  background: #061F27;
  color: white;
  z-index: 1201;
  transition: left 0.3s ease;
  box-shadow: 4px 0 16px rgba(0, 255, 255, 0.15);
}
.side-menu.open {
  left: 0;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.close-button {
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
}

.menu-items {
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu-items li {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
  transition: background 0.2s ease;
}
.menu-items li:hover {
  background: rgba(0,255,255,0.05);
}
.icon {
  margin-right: 12px;
  font-size: 20px;
}
.menu-items span {
  font-size: 16px;
}

/* Modal buscador */
.buscar-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1300;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 👈 Alínea hacia arriba */
  padding-top: 60px;        /* 👈 Espacio desde arriba (ajústalo si quieres) */
}

.buscar-modal-content {
  background: #111;
  border: 1px solid #0ff;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}
.search_wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.search_wrap input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #0ff;
  border-radius: 8px;
  background: #000;
  color: #0ff;
}
.btn-buscar {
  background: #0ff;
  color: #000;
  font-weight: bold;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}
.search_result_product {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
}
.single_sresult_product {
  display: flex;
  align-items: center;
  background: #000;
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 10px;
  cursor: pointer;
  color: #0ff;
}
.sresult_img img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 10px;
}
.sresult_content h4 {
  margin: 0 0 4px;
  font-size: 15px;
}
.price {
  font-weight: bold;
  font-size: 14px;
}
</style>
