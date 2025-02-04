<template>
  <div class="forum">
    <div class="forum-header">
      <h1 class="forum-title">Foro de Apoyo</h1>
      <p class="forum-subtitle">Comparte y aprende con nuestra comunidad</p>
    </div>
    <div v-if="posts.length" class="posts-grid">
      <div 
        v-for="(post, index) in posts" 
        :key="post.id" 
        class="post-card" 
        :class="{'featured': index % 5 === 0}"
        @click="viewPost(post.id)"
      >
        <div class="post-image-container">
          <img :src="post.thumbnail" :alt="post.title" class="post-thumbnail" />
          <div class="post-category">{{ post.category }}</div>
        </div>
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-description">{{ truncateDescription(post.description) }}</p>
          <div class="post-meta">
            <span class="post-date">
              <i class="fas fa-calendar-alt"></i> {{ formatDate(post.date) }}
            </span>
            <span class="post-comments">
              <i class="fas fa-comments"></i> {{ post.commentCount || 0 }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <p>Cargando publicaciones...</p>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foro",
  data() {
    return {
      posts: [],
    };
  },
  created() {
    this.loadPosts();
  },
  methods: {
    loadPosts() {
      fetch('/datos/publicaciones.json')
        .then(response => {
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response.json();
        })
        .then(data => {
          this.posts = data;
        })
        .catch(error => {
          console.error('Error al cargar las publicaciones:', error);
        });
    },
    viewPost(id) {
      this.$router.push(`/foro/${id}`);
    },
    truncateDescription(description, length = 100) {
      return description.length > length 
        ? description.slice(0, length) + '...' 
        : description;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('es-ES', options);
    }
  },
};
</script>

<style scoped>

.forum {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f5f5f5;
}

.forum-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #000b74, #1a237e);
  color: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 11, 116, 0.2);
  position: relative;
  overflow: hidden;
}

.forum-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
  transform: rotate(30deg);
}

.forum-title {
  font-size: 2.8rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  position: relative;
}

.forum-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  position: relative;
}

@media (max-width: 768px) {
  .forum-header {
    padding: 20px;
  }

  .forum-title {
    font-size: 2.2rem;
  }

  .forum-subtitle {
    font-size: 1.1rem;
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.post-card {
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.post-card.featured {
  grid-column: span 2;
  background-color: #e8f4fd;
}

.post-image-container {
  position: relative;
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-category {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(52, 152, 219, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.post-content {
  padding: 20px;
}

.post-title {
  font-size: 1.4rem;
  margin: 0 0 15px 0;
  color: #333;
}

.post-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
}

.post-date, .post-comments {
  display: flex;
  align-items: center;
}

.post-date i, .post-comments i {
  margin-right: 5px;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .post-card.featured {
    grid-column: span 1;
  }
}
</style>