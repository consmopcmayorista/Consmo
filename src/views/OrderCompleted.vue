<template>
        <!-- breadcrumbs -->
        <div class="container">
        <div class="breadcrumbs">
            <a href="/"><i class="las la-home"></i></a>
            <a href="#" class="active">Compra Exitosa</a>
        </div>
    </div>

    <!-- order complete -->
    <div class="cart_area section_padding_b">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="order_complete">
                                <!-- image  -->
                                <div class="complete_icon">
                                    <img loading="lazy"  src="/assets/images/complete.png" alt="success">
                                </div>
                                <!-- description  -->
                                <div class="order_complete_content">
                                    <h4>Tu compra se ha realizado exitosamente. ¡Gracias por tu compra!</h4>
                                    <ul class="list-group">
            
            
                                  <li class="list-group-item">Referencia :{{referencia_pago}}</li>
                                    <li class="list-group-item">Monto: {{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total)}}</li>
                                  <li class="list-group-item">Fecha: {{fechaHoy}}</li>
                                  
                                </ul>
                                    <p>Recibirás un correo electrónico con la confirmación de tu compra y los detalles de envío.</p>
                                        <!-- button  -->
                                        <div class="order_complete_btn">
                                            <a @click="imprimir_listado" class="default_btn second rounded">Ver Compra</a>
                                        </div>
                                        <div class="order_complete_btn">
                                            <a href="/"   class="default_btn rounded">Volver a la página principal</a>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopList',
  mounted() {
    this.loadExternalScripts();
  },
  methods: {
    loadExternalScripts() {
      const scripts = [
        'https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
        'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
        '/js/app.js?v=0.4.71',
        '/js/components/tarjeta_contacto.js?v=0.0.50',
        '/assets/js/bootstrap.bundle.min.js',
        '/assets/js/jquery-3.5.1.min.js',
        '/assets/js/jquery-ui.min.js',
        '/assets/js/slick.min.js',
        '/assets/js/jquery.nice-select.min.js',
        '/assets/js/app.js?v=0.1.27',
        '/assets/js/main.js?v=0.1.67',
        '/js/script.js'
      ];

      scripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    }
  }
}
</script>