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
        <li class="centered-list-item">
          <button @click="toggleBuscarModal">🔍 Buscar</button>
        </li>
        <li><a href="/catalogo">📦 Catalogo</a></li>
        <li><a href="/calificanos">⭐ Califícanos</a></li>
        <li><a href="/foro">💬 Foro</a></li>
        <li><a href="/conocenos">ℹ️ Conócenos</a></li>
        <li><a href="/encuentranos">📍 Encuéntranos</a></li>
      </ul>
    </nav>

    <!-- Modal de búsqueda -->
    <div v-if="isBuscarModalOpen" class="buscar-modal">
      <button class="close-button" @click="toggleBuscarModal">✖️</button>
      <div class="buscar-modal-content">
        <!-- search wrapper  -->
        <div class="search_wrap">
          <!-- search input box  -->
          <div class="search d-flex">
            <div class="search_input">
              <input
                type="text"
                placeholder="Buscar"
                v-model="busqueda"
                @input="filtrarProductos"
                autocomplete="off"
                @blur="ocultarSugerencias"
              />
            </div>
            <div class="search_submit">
              <button @click="buscarProductos">
                <span class="icon">
                  <i class="las la-search"></i>
                </span>
              </button>
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
import axios from 'axios'

export default {
  data() {
    return {
      isMenuOpen: false,
      isBuscarModalOpen: false,
      busqueda: '',
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
    async filtrarProductos() {
      // Si la búsqueda es de 2 caracteres o menos, vacía y retorna
      if (this.busqueda.length <= 2) {
        this.producto_buscado = []
        return
      }

      try {
        // Armar la URL con la búsqueda y el id_empresa
        const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${this.busqueda}&id=24`
        console.log("Consultando:", url)

        // Petición a la API
        const response = await axios.get(url)
        // Se asume que la API retorna { productos: [...] }
        const productos = response.data.productos || []
        console.log("Productos recibidos:", productos)

        // Convertir la búsqueda a minúsculas
        const busquedaMinus = this.busqueda.toLowerCase()
        // Separar las palabras de la búsqueda (ej: "casa nueva" => ["casa", "nueva"])
        const palabrasClave = busquedaMinus.split(" ").filter(Boolean)

        // Coincidencias EXACTAS: si en título o en idpro se incluye la frase completa
        const coincidenciasExactas = productos.filter(p => {
          const tituloLower = p.titulo ? p.titulo.toLowerCase() : ""
          const idproLower = p.idpro ? p.idpro.toLowerCase() : ""
          return (
            tituloLower.includes(busquedaMinus) ||
            idproLower.includes(busquedaMinus)
          )
        })

        // Coincidencias PARCIALES: cada palabra debe aparecer en alguno de los dos campos,
        // pero NO es coincidencia exacta de la frase completa
        const coincidenciasParciales = productos.filter(p => {
          const tituloLower = p.titulo ? p.titulo.toLowerCase() : ""
          const idproLower = p.idpro ? p.idpro.toLowerCase() : ""
          // Cada palabra debe aparecer en titulo o en idpro
          const todasAparecen = palabrasClave.every(pal =>
            tituloLower.includes(pal) || idproLower.includes(pal)
          )
          // Se excluyen los que ya están en exactas
          return todasAparecen && !coincidenciasExactas.includes(p)
        })

        // Combinar resultados, insertando un separador si hay ambas coincidencias
        let combinado
        if (coincidenciasParciales.length > 0 && coincidenciasExactas.length > 0) {
          combinado = [
            ...coincidenciasExactas,
            { separator: true },
            ...coincidenciasParciales
          ]
        } else {
          combinado = [...coincidenciasExactas, ...coincidenciasParciales]
        }

        // Elimina duplicados por id (función que debes tener implementada)
        this.producto_buscado = this.removeDuplicatesById(combinado)

      } catch (error) {
        console.error("Error al obtener productos:", error)
      }
    },
    ocultarSugerencias() {
      // Esperamos un micro-tick para ver si el usuario clicó en un resultado
      // con un pequeño setTimeout
      setTimeout(() => {
        this.producto_buscado = []
      }, 200)
    },
    removeDuplicatesById(list) {
      const seen = new Set()
      return list.filter(item => {
        // Si es el separador especial `{ separator: true }`, déjalo
        if (item.separator) return true

        // Si no tiene `id`, lo dejamos pasar 
        if (!item.id) return true

        if (seen.has(item.id)) {
          return false
        } else {
          seen.add(item.id)
          return true
        }
      })
    },
    buscarProductos() {
      if (this.busqueda.length > 2) {
        this.filtrarProductos();
      }
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
  overflow-y: auto; /* habilitacion de scrol si hay varias */
  max-height: 50%;
}

.mobile-menu.open {
  bottom: 0;
}
/* estilos para scroll */
.mobile-menu::-webkit-scrollbar {
  width: 6px;
}

.mobile-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
}

.mobile-menu li {
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.mobile-menu a,
.mobile-menu button {
  text-decoration: none;
  color: #ffffff;
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

.centered-list-item {
  display: flex;
  justify-content: center;
  align-items: center;
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
  transition: max-height 0.4s ease-in-out;
}

.buscar-modal-content.expanded {
  max-height: 80%; /* Ajusta el tamaño del contenedor expandido */
}

/* Botón para cerrar el modal */
.close-button {
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  color: #007bff;
}

.search_wrap {
  width: 100%;
}

.search_input {
  position: relative;
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

.search_submit {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.search_submit button {
  background: #007bff;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
}

.search_result_product {
  margin-top: 20px;
  max-height: 500px; /* Ajusta el tamaño del contenedor */
  overflow-y: auto;
}

.search_result_product::-webkit-scrollbar {
  width: 6px;
}

.search_result_product::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
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