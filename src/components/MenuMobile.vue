<template>
  <div class="menu-mobile">
    <!-- Ícono de menú hamburguesa -->
    <button @click="toggleMenu" class="hamburger">
      &#9776;
    </button>

    <!-- fondo oscuro cuando lo abrimos -->
    <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>

    <!-- menu con scrol -->
    <nav :class="{'mobile-menu': true, 'open': isMenuOpen}">
      <ul>
        <li><a href="/">🏠 Inicio</a></li>
        <li><a href="/catalogo">📦 Catalogo</a></li>
        <li><a href="/calificanos">⭐ Califícanos</a></li>
        <li><a href="/foro">💬 Foro</a></li>
        <li><a href="/conocenos">ℹ️ Conócenos</a></li>
        <li><a href="/encuentranos">📍 Encuéntranos</a></li>

      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
/* estilo para celu */
@media (min-width: 769px) {
  .menu-mobile {
    display: none;
  }
}

/* boton hamburguesa */
.hamburger {
  font-size: 32px;
  cursor: pointer;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 15px;
  left: 5px;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
}

.hamburger:hover {
  transform: scale(1.1);
  background: #0056b3;
}

/*  fondo oscuro */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  transition: opacity 0.3s ease;
}

/*  menu degradado y scrol */
.mobile-menu {
  position: fixed;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(135deg, #007bff, #6610f2);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
  transition: bottom 0.4s ease-in-out;
  z-index: 1000;
  border-radius: 20px 20px 0 0;
  padding-top: 20px;
  overflow-y: auto; /* habilitacion de scrol si hay varias */
  max-height: 50%;
}

/* mostrar menu */
.mobile-menu.open {
  bottom: 0;
}

/* estilos para scroll */
.mobile-menu::-webkit-scrollbar {
  width: 6px;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.mobile-menu ul {
  list-style-type: none;
  padding: 20px;
  margin: 0;
  text-align: center;
}

.mobile-menu li {
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.mobile-menu a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: block;
  transition: color 0.3s ease;
}

.mobile-menu a:hover {
  color: #ffd700;
}

/*  */
@media (max-width: 768px) {
  .mobile-menu {
    width: 100%;
  }
}
</style>
