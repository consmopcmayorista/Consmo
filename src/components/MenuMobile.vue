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
        <li>
          <button @click="toggleBuscarModal">🔍 Buscar</button>
        </li>
        <li><a href="/calificanos">⭐ Califícanos</a></li>
        <li><a href="/foro">💬 Foro</a></li>
        <li><a href="/conocenos">ℹ️ Conócenos</a></li>
        <li><a href="/encuentranos">📍 Encuéntranos</a></li>
      </ul>
    </nav>

    <!-- Modal de búsqueda -->
    <div v-if="isBuscarModalOpen" class="buscar-modal">
      <div class="buscar-modal-content">
        <button class="close-button" @click="toggleBuscarModal">✖️</button>
        <!-- search wrapper  -->
        <div class="search_wrap">
          <!-- search input box  -->
          <div class="search d-flex">
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
            <div class="search_submit">
              <RouterLink
                :to="{ name: 'catalogo_cat', query: { busqueda: busqueda } }"
                @click="ocultarSugerencias"
              >
                <button>
                  <span class="icon">
                    <span>Buscar</span>
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
import { ref } from 'vue'
import { useRouter } from "vue-router"
import axios from 'axios'

export default {
  setup() {
    const isMenuOpen = ref(false);
    const isBuscarModalOpen = ref(false);
    const busqueda = ref('');
    const producto_buscado = ref([]);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const toggleBuscarModal = () => {
      isBuscarModalOpen.value = !isBuscarModalOpen.value;
    };

    const filtrarProductos = async () => {
      if (busqueda.value.length <= 2) {
        producto_buscado.value = [];
        return;
      }

      try {
        const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${busqueda.value}&id=24`;
        const response = await axios.get(url);
        const productos = response.data.productos || [];
        const busquedaMinus = busqueda.value.toLowerCase();
        const palabrasClave = busquedaMinus.split(" ").filter(Boolean);

        const coincidenciasExactas = productos.filter(p => {
          const tituloLower = p.titulo ? p.titulo.toLowerCase() : "";
          const idproLower = p.idpro ? p.idpro.toLowerCase() : "";
          return (
            tituloLower.includes(busquedaMinus) ||
            idproLower.includes(busquedaMinus)
          );
        });

        const coincidenciasParciales = productos.filter(p => {
          const tituloLower = p.titulo ? p.titulo.toLowerCase() : "";
          const idproLower = p.idpro ? p.idpro.toLowerCase() : "";
          const todasAparecen = palabrasClave.every(pal =>
            tituloLower.includes(pal) || idproLower.includes(pal)
          );
          return todasAparecen && !coincidenciasExactas.includes(p);
        });

        let combinado;
        if (coincidenciasParciales.length > 0 && coincidenciasExactas.length > 0) {
          combinado = [
            ...coincidenciasExactas,
            { separator: true },
            ...coincidenciasParciales
          ];
        } else {
          combinado = [...coincidenciasExactas, ...coincidenciasParciales];
        }

        producto_buscado.value = removeDuplicatesById(combinado);

      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    const ocultarSugerencias = () => {
      setTimeout(() => {
        producto_buscado.value = [];
      }, 200);
    };

    const removeDuplicatesById = (list) => {
      const seen = new Set();
      return list.filter(item => {
        if (item.separator) return true;
        if (!item.id) return true;
        if (seen.has(item.id)) {
          return false;
        } else {
          seen.add(item.id);
          return true;
        }
      });
    };

    return {
      isMenuOpen,
      isBuscarModalOpen,
      busqueda,
      producto_buscado,
      toggleMenu,
      toggleBuscarModal,
      filtrarProductos,
      ocultarSugerencias
    };
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
  height: 60%;
  background: white;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
  transition: bottom 0.4s ease-in-out;
  z-index: 1000;
  border-radius: 20px 20px 0 0;
  padding-top: 20px;
  overflow-y: auto; /* habilitacion de scroll si hay varias */
}

.mobile-menu.open {
  bottom: 0;
}

.mobile-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.mobile-menu li {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-menu a,
.mobile-menu button {
  text-decoration: none;
  color: #007bff;
  font-size: 20px;
  font-weight: bold;
  display: block;
  transition: color 0.3s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-menu a:hover,
.mobile-menu button:hover {
  color: #0056b3;
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
  width: 90%;
  max-width: 500px;
  max-height: 80%; /* Evita que el modal sobresalga de la pantalla */
  overflow-y: auto; /* Permite el scroll si el contenido es muy grande */
  position: relative;
}

/* Botón para cerrar el modal */
.close-button {
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #007bff;
}

.search_wrap {
  width: 100%;
}

.search_input input {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
}

.search_submit button {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.search_result_product {
  margin-top: 20px;
}

.single_sresult_product {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-decoration: none;
  color: black;
}

.single_sresult_product:hover {
  background-color: #f1f1f1;
}

.sresult_img img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.sresult_content {
  flex: 1;
}

.price {
  color: #007bff;
}
</style>