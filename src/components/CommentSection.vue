<template>
  <!-- Banner -->
  <div class="banner">
    <img src="/images2/banner_calificanos.png" alt="Encuéntranos Banner" class="banner-image">
  </div>
  <div class="rating-page section_padding_b">
    <div class="container">
      <h2 class="section_title_3 mb-4">Califícanos</h2>

      <!-- Formulario para agregar comentarios -->
      <form @submit.prevent="addComment" class="rating-form mb-5">
        <h3 class="form-title mb-4">Tu opinión importa</h3>
        <div class="form-group">
          <input
            v-model="newComment.user"
            type="text"
            class="form-control"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div class="form-group">
          <textarea
            v-model="newComment.text"
            class="form-control"
            placeholder="Escribe tu comentario"
            required
          ></textarea>
        </div>
        <div class="star-rating">
          <span
            v-for="star in 5"
            :key="star"
            :class="['star', { filled: star <= newComment.rating }]"
            @mouseover="hoverStar(star)"
            @mouseleave="resetHover"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
        <button type="submit" class="btn-submit">Enviar comentario</button>
      </form>

      <!-- Swiper para mostrar los comentarios -->
      <div v-if="comments.length === 0" class="text-center">
        No hay comentarios aún.
      </div>
      <div v-else class="comments-container">
        <swiper
          :slides-per-view="1"
          :space-between="20"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }"
        >
          <swiper-slide v-for="comment in comments" :key="comment.id">
            <div class="comment-card">
              <div class="star-rating static">
                <span
                  v-for="star in 5"
                  :key="star"
                  :class="['star', { filled: star <= comment.rating }]"
                >
                  ★
                </span>
              </div>
              <p class="comment-text">"{{ comment.text }}"</p>
              <h5>{{ comment.user }}</h5>
              <small>{{ formatDate(comment.date) }}</small>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      comments: [],
      newComment: {
        user: "",
        text: "",
        rating: 0,
      },
      hoverRating: 0,
    };
  },
  mounted() {
    // Cargar los comentarios desde la API
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get("http://localhost:3000/comments");
        this.comments = response.data;
      } catch (error) {
        console.error("Error al cargar los comentarios:", error);
      }
    },
    async addComment() {
      if (this.newComment.rating === 0) {
        alert("Por favor selecciona una calificación.");
        return;
      }
      const newEntry = {
        ...this.newComment,
        date: new Date(),
      };

      try {
        // Enviar el nuevo comentario a la API
        const response = await axios.post("http://localhost:3000/comments", newEntry);
        this.comments.push(response.data); // Agregar el comentario a la lista
        this.newComment = { user: "", text: "", rating: 0 }; // Limpiar el formulario
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
      }
    },
    setRating(star) {
      this.newComment.rating = star;
    },
    hoverStar(star) {
      this.hoverRating = star;
    },
    resetHover() {
      this.hoverRating = 0;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style scoped>
.rating-page {
  padding: 60px 0;
  background-color: #f9f9f9;
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.rating-form {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.star-rating {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 2rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.3s ease;
}

.star-rating .star {
  transition: transform 0.2s ease;
}

.star-rating .star:hover {
  transform: scale(1.3);
}

.star-rating .star.filled {
  color: #003cff;
}

.comment-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.comment-text {
  margin: 15px 0;
  font-size: 1rem;
  font-style: italic;
  color: #555;
}

.comments-container {
  padding: 20px 0;
}

.swiper-pagination {
  margin-top: 20px;
}
.banner-container {
  width: 100%;
  margin-bottom: 30px; /* Espacio entre el banner y el contenido siguiente */
  overflow: hidden; /* Para asegurarse de que la imagen no se desborde */
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover; /* Asegura que la imagen cubra todo el contenedor */
}
</style>