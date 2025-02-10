<template>
    <div class="main-container">
      <!-- Contenedor Contra Entrega -->
      <div class="delivery-container" @click="toggleInfo('delivery')">
        <div class="delivery-content">
          <div class="delivery-icon">
            <img src="/images2/camion.svg" alt="Camion de entrega" />
          </div>
          <div class="delivery-text">
            <h3>¡Envios contra entrega a nivel nacional!</h3>
            <p v-if="!isMobile || showDeliveryInfo">Compra y paga cuando recibas tu pedido en cualquier lugar.</p>
          </div>
        </div>
      </div>
  
      <!-- Contenedor Recoger en Tienda -->
      <div class="pickup-container" @click="toggleInfo('pickup')">
        <div class="pickup-content">
          <div class="pickup-icon">
            <img src="/images2/tienda.svg" alt="Recoge en tienda" />
          </div>
          <div class="pickup-text">
            <h3>¡Recoge tu pedido en nuestra tienda!</h3>
            <p v-if="!isMobile || showPickupInfo">Pidelo online y ven a recogerlo cuando lo necesites.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShippingOptions",
    data() {
      return {
        showDeliveryInfo: false,
        showPickupInfo: false,
        isMobile: false
      }
    },
    mounted() {
      this.checkIfMobile();
      window.addEventListener('resize', this.checkIfMobile);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkIfMobile);
    },
    methods: {
      toggleInfo(type) {
        if (this.isMobile) {
          if (type === 'delivery') {
            this.showDeliveryInfo = !this.showDeliveryInfo;
            this.showPickupInfo = false;
          } else {
            this.showPickupInfo = !this.showPickupInfo;
            this.showDeliveryInfo = false;
          }
        }
      },
      checkIfMobile() {
        this.isMobile = window.innerWidth <= 768;
      }
    }
  };
  </script>
  
  <style scoped>
  .main-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  .delivery-container,
  .pickup-container {
    width: 45%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.3s ease;
  }
  
  .delivery-container:hover,
  .pickup-container:hover {
    transform: scale(1.05);
  }
  
  .delivery-content,
  .pickup-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .delivery-icon,
  .pickup-icon {
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  
  .delivery-text,
  .pickup-text {
    flex: 1;
  }
  
  .delivery-text h3,
  .pickup-text h3 {
    font-size: 1.6rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  
  .delivery-text p,
  .pickup-text p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    .delivery-container,
    .pickup-container {
      width: calc(50% - 10px);
      padding: 10px;
    }
  
    .delivery-icon,
    .pickup-icon {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  
    .delivery-text h3,
    .pickup-text h3 {
      font-size: 1rem;
      margin-bottom: 5px;
    }
  
    .delivery-text p,
    .pickup-text p {
      font-size: 0.8rem;
      margin-bottom: 10px;
    }
  }
  </style>