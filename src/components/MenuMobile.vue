<template>
  <div class="menu-mobile">
    <!-- 📌 Botón hamburguesa para pantallas pequeñas -->
    <button
      :class="['hamburger-button', { 'modo-header': modoHeader }]"
      @click="toggleMenu"
    >
      ☰
    </button>

    <!-- 🔲 Fondo oscuro al abrir menú -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="toggleMenu"></div>

    <!-- 📋 Menú lateral izquierdo -->
    <aside :class="['side-menu', { open: isMenuOpen }]">
      <div class="menu-header">
        <h2>Menu</h2>
        <button @click="toggleMenu" class="close-button">✖</button>
      </div>
      <ul class="menu-items">
        <li @click="goTo('/')"><i class="icon">🏠</i><span>Inicio</span></li>
        <li @click="goTo('/catalogo')"><i class="icon">📦</i><span>Catálogo</span></li>
        <li @click="goTo('/promociones')"><i class="icon">🏷️</i><span>Promociones</span></li>
        <li @click="goTo('/calificanos')"><i class="icon">⭐</i><span>Califícanos</span></li>
        <li @click="goTo('/foro')"><i class="icon">💬</i><span>Foro</span></li>
        <li @click="goTo('/conocenos')"><i class="icon">ℹ️</i><span>Conócenos</span></li>
        <li @click="goTo('/encuentranos')"><i class="icon">📍</i><span>Encuéntranos</span></li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  // ✅ Prop para cambiar estilo cuando se usa dentro del header
  props: {
    modoHeader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    goTo(ruta) {
      this.$router.push(ruta);
      this.toggleMenu();
    }
  }
}
</script>

<style scoped>
/* ✅ Solo visible en móviles */
@media (min-width: 992px) {
  .menu-mobile {
    display: none;
  }
}

.menu-mobile {
  font-family: 'Segoe UI', sans-serif;
}

/* 🔘 Botón hamburguesa base */
.hamburger-button {
  top: 20px;
  left: 20px;
  z-index: 1200;
  background: white;
  color: #1035ad;
  font-size: 26px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 10px 14px;
}

/* 🔘 Estilo cuando se usa en el header (inline) */
.hamburger-button.modo-header {
  position: static;
  box-shadow: none;
  font-size: 22px;
  padding: 6px 10px;
  background: transparent;
  color: #000;
}

/* 🔲 Fondo oscuro al abrir menú */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1190;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
}

/* 📋 Menú lateral */
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
</style>
