<template>
    <div class="notfound-container">
      <div class="notfound-content">
        <!-- Ilustración SVG inline -->
        <div class="illustration">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="16" height="12" rx="2" ry="2" stroke="#fdd835" stroke-width="2" fill="white"/>
            <circle cx="8" cy="12" r="1.5" fill="#ff6b6b"/>
            <circle cx="16" cy="12" r="1.5" fill="#42b983"/>
            <path d="M12 6V3" stroke="#fdd835" stroke-width="2" stroke-linecap="round"/>
            <rect x="10" y="16" width="4" height="2" fill="#999"/>
          </svg>
        </div>
  
        <!-- Texto principal -->
        <h1 class="animated-404">404</h1>
        <p>Oops... la página que buscas no existe.</p>
  
        <!-- Botones de acción -->
        <div class="button-group">
          <router-link to="/" class="home-button">Volver al inicio</router-link>
          <router-link to="/catalogo" class="secondary-button">Ir al catálogo</router-link>
          <a
            href="https://wa.me/573015537673?text=Hola%2C%20necesito%20ayuda%20con%20una%20p%C3%A1gina%20que%20no%20carga."
            target="_blank"
            class="whatsapp-button"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Sin lógica necesaria
  </script>
  
  <style scoped>
  .notfound-container {
    min-height: 100vh;
    background: radial-gradient(circle at top, #fceabb, #f8b500);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #2c3e50;
    text-align: center;
  }
  
  .notfound-content {
    width: 100%;
    max-width: 460px;
    padding: 30px 20px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .illustration {
    margin-bottom: 10px;
  }
  
  .animated-404 {
    font-size: 5rem;
    font-weight: 900;
    color: #f39c12;
    text-shadow: 0 0 10px #f1c40f;
    animation: bounce 1.5s ease-in-out infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #555;
    margin: 0;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }
  
  .home-button,
  .secondary-button,
  .whatsapp-button {
    display: block;
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 10px;
    text-decoration: none;
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .home-button {
    background-color: #f1c40f;
    color: #2c3e50;
  }
  .home-button:hover {
    transform: scale(1.05);
  }
  
  .secondary-button {
    background-color: #ffffff;
    border: 2px solid #f39c12;
    color: #2c3e50;
  }
  .secondary-button:hover {
    background-color: #fdf5d4;
    transform: scale(1.05);
  }
  
  .whatsapp-button {
    background-color: #25d366;
    color: white;
  }
  .whatsapp-button:hover {
    background-color: #1ebe57;
    transform: scale(1.05);
  }
  
  @media (min-width: 768px) {
    .button-group {
      flex-direction: row;
      justify-content: center;
    }
    .home-button,
    .secondary-button,
    .whatsapp-button {
      width: auto;
      flex: 1;
    }
  }
  </style>