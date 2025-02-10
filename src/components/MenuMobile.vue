<template>
  <div class="menu-mobile">
    <!-- Ícono de menú hamburguesa -->
    <button @click="toggleMenu" class="hamburger">
      &#9776;
    </button>

    <!-- fondo oscuro cuando lo abrimos -->
    <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>

    <!-- menu con scroll -->
    <nav :class="{'mobile-menu': true, 'open': isMenuOpen}">
      <ul>
        <li><a href="/">🏠 Inicio</a></li>
        <li><a href="/catalogo">📦 Catalogo</a></li>
        <li><a href="/calificanos">⭐ Califícanos</a></li>
        <li><a href="/foro">💬 Foro</a></li>
        <li><a href="/conocenos">ℹ️ Conócenos</a></li>
        <li><a href="/encuentranos">📍 Encuéntranos</a></li>
        <!-- Nueva sección Buscar -->
        <li>
          <button @click="toggleBuscarModal">🔍 Buscar</button>
        </li>
      </ul>
    </nav>

    <!-- Modal de búsqueda -->
    <div v-if="isBuscarModalOpen" class="buscar-modal">
      <div class="buscar-modal-content">
        <!-- search wrapper  -->
        <div class="search_wrap">
          <!-- search input box  -->
          <div class="search d-flex">
            <div class="search_category">
              <select v-model="categoria">
                <option disabled value="">Categorias</option>
                <option v-for="dato in categorias_alfabetica" :key="dato.categoria" :value="dato.categoria">
                  {{ dato.categoria }}
                </option>
              </select>
            </div>
            <div class="search_input">
              <input
                type="text"
                placeholder="Buscar"
                id="show_suggest"
                v-model="busqueda"
                @input="filtrarProductos"
                autocomplete="off"
                @blur="ocultarSugerencias"
              />
            </div>
            <div class="search_subimt">
              <RouterLink
                :to="{ name: 'catalogo_cat', query: { categoria: categoria, busqueda: busqueda } }"
                @click="ocultarSugerencias"
              >
                <button>
                  <span class="icon">
                    <span class="d-none d-sm-inline-block">Buscar</span>
                    <i class="las la-search"></i>
                  </span>
                </button>
              </RouterLink>
            </div>

            <!-- search suggest -->
            <div :class="['search_suggest', { active: producto_buscado.length > 0 }]">
              <div class="search_result_product">
                <template v-for="(dato, index) in producto_buscado" :key="index">
                  <div v-if="dato.separator" class="separator" style="font-weight: bold; color: #aaa; text-align: center; margin: 5px 0;"></div>

                  <!-- Si es un producto normal -->
                  <RouterLink
                    v-else
                    :to="{ name: 'producto', query: { producto: dato.id } }"
                    class="single_sresult_product"
                    @click="ocultarSugerencias"
                  >
                    <div class="sresult_img">
                      <img :src="dato.imagen" />
                    </div>
                    <div class="sresult_content">
                      <h4>{{ dato.titulo }}</h4>
                      <div class="price">
                        <span class="org_price">
                          ${{ Math.round(parseFloat(dato.pt1)).toLocaleString() }}
                        </span>
                      </div>
                    </div>
                  </RouterLink>
                </template>
              </div>
            </div>
            <!-- FIN search_suggest -->
          </div> <!-- FIN .search.d-flex -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isBuscarModalOpen: false,
      categoria: '',
      busqueda: '',
      categorias_alfabetica: [], // Suponiendo que tienes esta data
      producto_buscado: [] // Suponiendo que tienes esta data
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    toggleBuscarModal() {
      this.isBuscarModalOpen = !this.isBuscarModalOpen;
    },
    filtrarProductos() {
      // Implementa tu lógica de filtrado aquí
    },
    ocultarSugerencias() {
      // Implementa tu lógica para ocultar sugerencias aquí
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

/* fondo oscuro */
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

/* menu degradado y scroll */
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
  overflow-y: auto; /* habilitacion de scroll si hay varias */
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

/* modal de búsqueda */
.buscar-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.buscar-modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
}
</style>