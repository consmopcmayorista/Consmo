<template>
    <div class="social-links-wrapper">
      <div class="social-links-container">
        <div class="card">
          <ul>
            <li class="iso-pro">
              <span></span>
              <span></span>
              <span></span>
              <a href="https://www.facebook.com/consmopcmedellin" target="_blank">
                <svg
                  viewBox="0 0 320 512"
                  xmlns="http://www.w3.org/2000/svg"
                  class="svg"
                >
                  <path
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
              <div class="text">Facebook</div>
            </li>
            <li class="iso-pro">
              <span></span>
              <span></span>
              <span></span>
              <a href="https://www.instagram.com/consmopcmayorista/" target="_blank">
                <svg
                  class="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  ></path>
                </svg>
              </a>
              <div class="text">Instagram</div>
            </li>
            <li class="iso-pro">
                <span></span>
                <span></span>
                <span></span>
                <a href="https://www.tiktok.com/@consmopcmayorista" target="_blank">
                    <img 
                    src="/images2/tiktok.svg" 
                    alt="TikTok" 
                    class="svg" 
                    />
                </a>
                <div class="text">TikTok</div>
                </li>

          </ul>
        </div>
      </div>
    </div>
  </template>
  
  
  

  
  <style scoped>
  .svg {
    color: #000b74;
  width: 60px;
  height: 60px;
  transition: all 0.3s;
  border-radius: 50%; /* Si necesitas mantener el estilo circular */
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3),
    inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
}

/* From Uiverse.io by MijailVillegas */ 
.social-links-wrapper {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1000;
}

.social-links-container {
  margin-right: -10px; /* Ajusta la distancia del borde derecho */
}

.card {
  max-width: fit-content;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  gap: 1rem;
  backdrop-filter: blur(15px);
  background: rgba(173, 173, 173, 0.05); /* Hacemos el contenedor más transparente por defecto */
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.192),
    inset 0 0 5px rgba(255, 255, 255, 0.274), 0 5px 5px rgba(0, 0, 0, 0.164);
  transition: 0.5s;
}

.card:hover {
  background: rgba(173, 173, 173, 0.2); /* Hacemos el contenedor más oscuro al pasar el cursor */
}

.card ul {
  padding: 1rem;
  display: flex;
  list-style: none;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}

.card ul li {
  cursor: pointer;
}

.svg {
  transition: all 0.3s;
  /* if you find some problems change w - h : 30px*/
  padding: 1rem;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  color: #000000;
  fill: currentColor;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3),
    inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
}

.text {
  opacity: 0;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.3s;
  color: rgb(255, 174, 0);
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  z-index: 9999;
  box-shadow: 5px 0 1px rgba(153, 153, 153, 0.2),
    10px 0 1px rgba(153, 153, 153, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.3),
    inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.082);
  right: 100%; /* Cambiamos la posición a la izquierda del ícono */
  white-space: nowrap; /* Evita que el texto se rompa en varias líneas */
}

/*isometric prooyection*/
.iso-pro {
  transition: 0.5s;
  position: relative; /* Añadimos esto para posicionar los elementos hijos */
}

.iso-pro:hover a > .svg {
  transform: translate(-15px, -15px); /* Cambiamos a valores negativos para mover hacia la izquierda */
  border-radius: 100%;
}

.iso-pro:hover .text {
  opacity: 1;
  transform: translate(-10px, -2px) skew(-5deg); /* Ajustamos para que aparezca a la izquierda */
}

.iso-pro:hover .svg {
  transform: translate(-15px, -15px); /* Ajustamos para mover hacia la izquierda y arriba */
}

.iso-pro span {
  opacity: 0;
  position: absolute;
  color: #1877f2;
  border-color: #1877f2;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3),
    inset 0 0 5px rgba(255, 255, 255, 0.5), 0 5px 5px rgba(0, 0, 0, 0.164);
  border-radius: 50%;
  transition: all 0.3s;
  height: 60px;
  width: 60px;
  left: 0; /* Añadimos esto para posicionar los spans desde la izquierda */
  top: 0; /* Añadimos esto para posicionar los spans desde arriba */
}

.iso-pro:hover span:nth-child(1) {
  opacity: 0.2;
  transform: translate(-5px, -5px);
}

.iso-pro:hover span:nth-child(2) {
  opacity: 0.4;
  transform: translate(-10px, -10px);
}

.iso-pro:hover span:nth-child(3) {
  opacity: 0.6;
  transform: translate(-15px, -15px);
}

/* Ajustamos la posición del contenedor para que esté más cerca del borde derecho */
.social-links-wrapper {
  right: 10px; /* Reducimos la distancia del borde derecho */
}
@media screen and (max-width: 768px) {
  .social-links-wrapper {
    top: auto;
    bottom: 190px; /* Ajustado para que esté más arriba */
    right: 0px; /* Ajustado para que esté más a la derecha */
    transform: none;
  }

  .card {
    padding: 0.5rem;
  }

  .card ul {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .svg {
    width: 40px;
    height: 40px;
    padding: 0.5rem;
  }

  .iso-pro span {
    width: 40px;
    height: 40px;
  }

  .text {
    font-size: 0.8em;
  }

  .iso-pro:hover a > .svg,
  .iso-pro:hover .svg,
  .iso-pro:hover span:nth-child(3) {
    transform: translate(-10px, -10px);
  }

  .iso-pro:hover span:nth-child(1) {
    transform: translate(-3px, -3px);
  }

  .iso-pro:hover span:nth-child(2) {
    transform: translate(-6px, -6px);
  }
}

/* Para pantallas aún más pequeñas */
@media screen and (max-width: 480px) {
  .social-links-wrapper {
    bottom: 60px; /* Ajustado para que esté más arriba en pantallas muy pequeñas */
    right: 10px; /* Ajustado para que esté más a la derecha, pero no tanto como en pantallas más grandes */
  }


  .svg {
    width: 30px;
    height: 30px;
    padding: 0.3rem;
  }

  .iso-pro span {
    width: 30px;
    height: 30px;
  }

  .text {
    font-size: 0.7em;
  }

  .iso-pro:hover a > .svg,
  .iso-pro:hover .svg,
  .iso-pro:hover span:nth-child(3) {
    transform: translate(-5px, -5px);
  }

  .iso-pro:hover span:nth-child(1) {
    transform: translate(-2px, -2px);
  }

  .iso-pro:hover span:nth-child(2) {
    transform: translate(-3px, -3px);
  }
}
/* Nueva media query para ajustes más finos en pantallas muy pequeñas */
@media screen and (max-width: 320px) {
  .social-links-wrapper {
    bottom: 50px; /* Aún más arriba para pantallas muy pequeñas */
    right: 5px; /* Ligeramente más a la izquierda para evitar problemas en pantallas muy estrechas */
  }

  .svg {
    width: 25px;
    height: 25px;
    padding: 0.2rem;
  }

  .iso-pro span {
    width: 25px;
    height: 25px;
  }

  .text {
    font-size: 0.6em;
  }
}

  </style>