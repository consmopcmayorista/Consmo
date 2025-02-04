<template>
  <div>
    <!-- Botón de "Volver al foro" arriba -->
    <div class="back-to-forum">
      <button @click="goBackToForum">Volver al Foro</button>
    </div>

    <div class="publication">
      <h1>{{ post.title }}</h1>
      <small>Publicado el: {{ post.date }}</small>
      <div v-if="post.content" class="post-content">
          <div v-for="(item, index) in post.content" :key="index">
            <!-- Manejo de texto y encabezados -->
            <template v-if="item.type === 'text'">
              <p v-if="!item.value.startsWith('###') && !item.value.startsWith('##') && !item.value.startsWith('#')">
                {{ item.value }}
              </p>
              <h2 v-if="item.value.startsWith('##') && !item.value.startsWith('###')">{{ item.value.slice(2).trim() }}</h2>
              <h3 v-if="item.value.startsWith('###')">{{ item.value.slice(3).trim() }}</h3>
            </template>
  
            <!-- Manejo de imágenes -->
            <template v-if="item.type === 'image'">
              <img :src="item.src" :alt="item.alt" class="post-image" />
            </template>
  
            <!-- Manejo de videos -->
            <template v-else-if="item.type === 'video'">
              <iframe
                :src="item.src"
                frameborder="0"
                allowfullscreen
                class="post-video"
              ></iframe>
            </template>
  
            <!-- Manejo de archivos (enlaces de descarga) -->
            <template v-else-if="item.type === 'file'">
              <a :href="item.src" download class="download-link">{{ item.text }}</a>
            </template>
          </div>
        </div>
        <div v-else>
          <p>Cargando publicación...</p>
        </div>
      </div>
  
      <!-- Botones de "Siguiente" y "Anterior" abajo -->
      <div class="navigation-buttons">
      <button v-if="previousId" @click="goToPost(previousId)">Anterior</button>
      <button v-if="nextId" @click="goToPost(nextId)">Siguiente</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Publicacion",
  props: ["id"],
  data() {
    return {
      post: null,
      previousId: null,
      nextId: null,
    };
  },
  created() {
      // Cargar el archivo JSON desde public/datos
      fetch('/datos/publicaciones.json')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Busca la publicación por su ID
          this.post = data.find((p) => p.id === parseInt(this.id));
          const currentIndex = data.findIndex((p) => p.id === parseInt(this.id));
  
          // Calcula los IDs de la publicación anterior y siguiente
          if (currentIndex > 0) {
            this.previousId = data[currentIndex - 1].id;
          }
          if (currentIndex < data.length - 1) {
            this.nextId = data[currentIndex + 1].id;
          }
        })
        .catch((error) => {
          console.error('Error al cargar la publicación:', error);
        });
    },
    methods: {
    goBackToForum() {
      this.$router.push("/foro");
    },
    goToPost(id) {
      this.$router.push(`/foro/${id}`);
    },
  },
};
  </script>
  
  <style scoped>
  /* Estilos generales para la publicación */
  .publication {
    padding: 20px;
    max-width: 900px;
    margin: auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .post-content {
    margin-top: 20px;
  }
  
  /* Botón de "Volver al foro" */
  .back-to-forum {
    text-align: left; /* Alinea el botón a la izquierda */
    max-width: 900px;
    margin: 20px auto;
  }
  
  .back-to-forum button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .back-to-forum button:hover {
    background-color: #0056b3;
  }
  
  /* Estilos para los botones de navegación */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  max-width: 900px;
}

.navigation-buttons button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.navigation-buttons button:hover {
  background-color: #0056b3;
}

.navigation-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
  
  /* Resto del estilo aquí... */
  
  
  /* Estilos para los encabezados */
  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  h2 {
    font-size: 1.8rem;
    color: #0056b3;
    margin-top: 30px;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-top: 20px;
    color: #333;
  }
  
  /* Estilo para el contenido de texto */
  .text-content {
    font-size: 1.1rem;
    color: #555;
    margin-bottom: 20px;
  }
  
  .post-image {
    width: 100%;
    max-width: 500px; /* Limita el tamaño máximo de las imágenes */
    height: auto; /* Mantiene la relación de aspecto */
    margin: 20px auto; /* Añade espacio entre las imágenes y las centra horizontalmente */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: block; /* Asegura que la imagen sea un bloque para que se centre */
  }
  
  .post-video {
    width: 100%;
    height: 400px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .download-link {
    display: inline-block;
    padding: 12px 30px;
    font-size: 1.1rem;
    font-weight: bold;
    color: white;
    background: linear-gradient(45deg, #ff7e5f, #feb47b); /* Gradiente de color */
    text-decoration: none;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* Transición suave */
    text-align: center;
    margin-top: 15px;
  }
  
  .download-link:hover {
    background: linear-gradient(45deg, #feb47b, #ff7e5f); /* Cambio en gradiente en hover */
    transform: translateY(-3px); /* Efecto de elevación al pasar el cursor */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Aumento de sombra */
  }
  
  .download-link:active {
    transform: translateY(1px); /* Efecto de presionar el botón */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Estilos para textos y elementos generales */
  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
  
  small {
    display: block;
    margin-top: 10px;
    color: #777;
  }
  
  @media (max-width: 768px) {
    .post-image {
      max-width: 100%; /* Hace que la imagen ocupe todo el ancho disponible en pantallas pequeñas */
    }
  
    .post-video {
      height: 300px; /* Reduce la altura del video en pantallas pequeñas */
    }
  }
  </style>
  