<template>
  <!-- 🔍 FILA del logo + buscador -->
  <div class="search_mobile_row d-lg-none d-flex align-items-center gap-2 w-100 px-3">

    <!-- 🔍 Input + botón + contenedor relativo para mostrar sugerencias debajo -->
    <div class="search_mobile_input d-flex align-items-center flex-grow-1 position-relative">
      <input
        type="text"
        class="form-control"
        placeholder="Estoy buscando..."
        v-model="busqueda"
        @input="filtrarProductos"
        @keydown.enter="redirigirAListaDeProductos(busqueda)"
        @blur="ocultarSugerencias"
      />
      <button class="btn-buscar" @click="redirigirAListaDeProductos(busqueda)" aria-label="Buscar">
        <i class="las la-search"></i>
      </button>

      <!-- 📦 Sugerencias (ahora dentro del contenedor para posicionarlas debajo del input) -->
      <div v-if="producto_buscado.length" class="suggestions-box">
        <div
          v-for="(dato, index) in producto_buscado"
          :key="index"
          class="suggestion-item"
          @mousedown.prevent="redirigirProducto(dato.id)"
        >
          <img :src="dato.imagen" class="suggestion-img" />
          <div class="suggestion-text">
            <span class="titulo">{{ dato.titulo }}</span>
            <span class="precio">
              ${{ Math.round(parseFloat(dato.pt1)).toLocaleString() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter();
    const busqueda = ref("");
    const producto_buscado = ref([]);

    const filtrarProductos = async () => {
      if (busqueda.value.length <= 2) {
        producto_buscado.value = [];
        return;
      }
      try {
        const url = `https://whatsapp-nube.com/api_web/api_web_catalogo_new_producto_varios.php?texto=${busqueda.value}&id=24`;
        const res = await axios.get(url);
        const productos = res.data.productos || [];
        const query = busqueda.value.toLowerCase();
        const palabras = query.split(" ").filter(Boolean);

        const exactas = productos.filter(p => p.titulo?.toLowerCase().includes(query) || p.idpro?.toLowerCase().includes(query));
        const parciales = productos.filter(p => palabras.every(pal => p.titulo?.toLowerCase().includes(pal) || p.idpro?.toLowerCase().includes(pal)) && !exactas.includes(p));

        producto_buscado.value = [...new Set([...exactas, ...parciales])];
      } catch (e) {
        console.error("Error búsqueda:", e);
      }
    };

    const redirigirAListaDeProductos = (termino) => {
      if (termino.trim().length > 0) {
        router.push({ name: 'catalogo_cat', query: { busqueda: termino } });
        producto_buscado.value = [];
      }
    };

    const redirigirProducto = (id) => {
      router.push({ name: 'producto', query: { producto: id } });
      producto_buscado.value = [];
    };

    const ocultarSugerencias = () => {
      setTimeout(() => (producto_buscado.value = []), 200);
    };

    return {
      busqueda,
      producto_buscado,
      filtrarProductos,
      redirigirAListaDeProductos,
      redirigirProducto,
      ocultarSugerencias
    };
  }
};
</script>

<style scoped>

@media (max-width: 991px) {
  /* 🔷 Contenedor principal de la fila logo + buscador */
  .search_mobile_row {
    background: #000000;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  /* 🔍 Contenedor del input + botón de búsqueda */
  .search_mobile_input {
    background: white;
    border-radius: 10px;
    padding: 4px;
    position: relative; /* 💡 Necesario para que suggestions-box se posicione relativo a este */
  }

  /* 🔤 Input del buscador */
  .search_mobile_input .form-control {
    border: none;
    border-radius: 8px 0 0 8px;
    padding: 8px 10px;
    font-size: 14px;
    width: 100%;
  }

  /* 🔘 Botón de buscar */
  .btn-buscar {
    background: #000;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 0 8px 8px 0;
    font-size: 18px;
    cursor: pointer;
  }

  /* 📦 Contenedor de sugerencias */
  .suggestions-box {
    position: absolute;
    top: 100%; /* ⬇ Aparece justo debajo del input */
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 8px;
    margin-top: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    max-height: 280px;
    overflow-y: auto;
    z-index: 10;
  }

  /* 🔹 Elemento individual sugerido */
  .suggestion-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }

  .suggestion-item:hover {
    background: #f9f9f9;
  }

  /* 🖼 Imagen del producto sugerido */
  .suggestion-img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 10px;
    border-radius: 5px;
  }

  /* 📄 Contenido textual del producto sugerido */
  .suggestion-text {
    display: flex;
    flex-direction: column;
  }

  .suggestion-text .titulo {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .suggestion-text .precio {
    font-size: 13px;
    color: #009688;
  }
}
</style>
