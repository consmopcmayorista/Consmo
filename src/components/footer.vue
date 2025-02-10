<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Acerca de nosotros</h4>
          <p>¡Consmo PC Mayorista - Tu Socio Tecnológico! Despega hacia la tecnología con nosotros. Somos la punta de lanza en la distribución de equipos tecnológicos para hogares y empresas.</p>
        </div>
        <div class="footer-col">
          <h4>Enlaces útiles</h4>
          <ul>
            <li><a href="/catalogo">Nuestro Catalogo</a></li>
            <li><a href="/calificanos">Calificanos</a></li>
            <li><a href="/encuentranos">Encuentranos</a></li>
            <li><a href="/conocenos">Sobre Nosotros</a></li>
          </ul>
        </div>
        <div class="footer-col">
      <h4>Síguenos</h4>
      <div class="social-links">
        <a href="https://www.facebook.com/consmopcmedellin"><i class="fab fa-facebook-f"></i></a>
        <a href="https://www.instagram.com/consmopcmayorista/"><i class="fab fa-instagram"></i></a>
        <a href="https://www.tiktok.com/@consmopcmayorista"><i class="fab fa-tiktok"></i></a>
        <a href="https://www.youtube.com/@ConsmoPcMayorista"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
        <div class="footer-col">
          <h4>Newsletter</h4>
          <form class="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" required>
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Consmo PC Mayorista SAS - Derechos Reservados</p>
      <p>Diseñado por <a href="https://www.colcodec.com" target="_blank">Colcodec</a></p>
    </div>
    <div class="waves">
      <div class="wave" id="wave1"></div>
      <div class="wave" id="wave2"></div>
      <div class="wave" id="wave3"></div>
      <div class="wave" id="wave4"></div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterInteractivo'
}
</script>

<style scoped>
.footer {
  background-color: #24262b;
  padding: 70px 0 0;
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1170px;
  margin: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.footer-col {
  width: 25%;
  padding: 0 15px;
}

.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}

.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255,255,255,0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}

.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}

.newsletter-form {
  display: flex;
  margin-top: 20px;
}

.newsletter-form input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 4px 0 0 4px;
}

.newsletter-form button {
  padding: 10px 20px;
  border: none;
  background-color: #e91e63;
  color: #ffffff;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
  transition: background-color 0.3s ease;
}

.newsletter-form button:hover {
  background-color: #d81b60;
}

.footer-bottom {
  background-color: #1a1c20;
  width: 100%;
  padding: 20px 0;
  text-align: center;
}

.footer-bottom p {
  font-size: 14px;
  word-spacing: 2px;
  text-transform: capitalize;
  color: #ffffff;
  margin: 5px 0;
}

.footer-bottom a {
  color: #e91e63;
  text-decoration: none;
}

.waves {
  position: relative;
  width: 100%;
  height: 100px;
  margin-bottom: -7px;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('https://i.imgur.com/ZAts69f.png');
  background-size: 1000px 100px;
}

#wave1 {
  z-index: 1000;
  opacity: 1;
  bottom: 0;
  animation: animateWave 4s linear infinite;
}

#wave2 {
  z-index: 999;
  opacity: 0.5;
  bottom: 10px;
  animation: animateWave_02 4s linear infinite;
}

#wave3 {
  z-index: 998;
  opacity: 0.2;
  bottom: 15px;
  animation: animateWave 3s linear infinite;
}
.footer-col p {
  color: #ffffff;
}

#wave4 {
  z-index: 997;
  opacity: 0.7;
  bottom: 20px;
  animation: animateWave_02 3s linear infinite;
}

@keyframes animateWave {
  0% {
    background-position-x: 1000px;
  }
  100% {
    background-position-x: 0px;
  }
}

@keyframes animateWave_02 {
  0% {
    background-position-x: 0px;
  }
  100% {
    background-position-x: 1000px;
  }
}

@media(max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media(max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>