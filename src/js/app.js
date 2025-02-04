const mercadopago = new MercadoPago("APP_USR-421818bf-7b2d-47eb-b0b5-7b5f9403f0b9", {
  locale: "es-CO", // Cambia según tu región: 'es-AR', 'pt-BR', 'en-US'
});
let get=[]  
const app = new Vue({
    el: '#app',
    data(){
         
     
     
     return{
        nombre_site:"hola",
         valor_reemplazo:`Login & Registro`,  
         datos_ticket:JSON.parse(localStorage.getItem('ticket')),
        dominio:(document.domain).replace("www.", ''),
        id_empresa:"24",
         logo:null,
         contacto:null,
         info: null, 
         categorias:null,
         categorias_alea:[],
         productos_alea:[],
           productos_alea2:[],
         producto_mostrar:[],
         productos1:[],
         productos2:[],
         banner:[],
         redes_social:[],
         categoria_mostrar:[],
         email_contacto:null,
         whatsapp:null,
         menu:null,
	key:'pub_prod_9wIwn1BalWuArwEFMlC6YucoX2TBK0Nf',
         info_factura:new Object(),
         info_imprimir:new Object(),
         producto_imprimir:[],
         info_cliente:[],
         info_cliente_envio:[],
         lista_productos:null,
         productos:[],
        
         mensaje_cotizar:"Hola,vi en tu pagina este producto y  requiero cotizarlo:",
         cant_pagina: 0,
         cant_maxima_pag:20,
          pagina:1,
         filtro_activo:"Todos",
         filtro_categorgorias:[],
          texto_categoria:"portafolio.html?Pag=",
         repetidos_categorias:[], 
          categoriasSeleccionadas: [], 
         
         
         url_whatsapp: "https://api.whatsapp.com/send?phone=",
         texto_whatsapp:"&text=",
         
            banner1:"",
         banner2:"",
          banner3:"",
           banner4:"",
            banner5:"",
             banner6:"",
               titulo2:"",
         titulo1:"",
          titulo3:"",
           titulo4:"",
            titulo5:"",
             titulo6:"",
             ticket:[],
             total:0,
             iva:0,
             subtotal:0,
             fechaHoy: new Date().toISOString().substr(0, 10),
             rut_cliente:"",
             tip_doc_cliente:"",
             tipo_documento_womp:"",
             nombre_cliente:"",
             apellido_cliente:"",
             email_cliente:"",
             tel_cliente:"",
             direccion_cliente:"",
             direccion_cliente2:"",
             ciudad_cliente:"",
             departamento_cliente:"",
            
             e_rut_cliente:"",
             e_tip_doc_cliente:"",
             e_nombre_cliente:"",
             e_apellido_cliente:"",
             e_email_cliente:"",
             e_tel_cliente:"",
             e_direccion_cliente:"",
             e_direccion_cliente2:"",
             e_ciudad_cliente:"",
             e_departamento_cliente:"",
             reference : this.generatref(),
             checkbox : document.getElementById('shipto'),
             referencia_pago:"",
             cantidades:1,
             productos_new:[],
             primer_new:"",
             segundo_new:"",
             tercero_new:"",
             cuarto_new:"",
             categorias_s_f:"", 
              categoria:"", 
             lista_me_gusta:[],
              arreglo_me_gusta:[],
             cant_me_gusta:"",
             cant_en_carrito:"", 
             producto_buscado:"", 
             busqueda:"",
              id_producto_show: null,
              imagenMostrada:"",
              imagenCargada: false,
              mostrarPreloader: true,
                 informacionVisita:new Object(),
                 mostrarModal:false, 
                  preferenceId: null,
                  categorias_hijo:[],
                  selectedIndex: null,
                  oferta:''
     }
     
    
    },
    mounted() {
    this.cargar_detalles();
    var arreglo_carrito = JSON.parse(localStorage.getItem('ticket'));

    if (arreglo_carrito && arreglo_carrito.productos) {
      this.cant_en_carrito = arreglo_carrito.productos.length;
    } else {
      this.cant_en_carrito = 0; // Otra acción por defecto si no hay productos
    }
    
    
  },
    beforeMount () {
         var rutaArchivo = window.location.pathname;
         let urlSearchParams=""
         var arreglo_me_gusta = JSON.parse(localStorage.getItem('me_gusta'));

            if (arreglo_me_gusta && arreglo_me_gusta.productos) {
              this.cant_me_gusta = arreglo_me_gusta.productos.length;
               this.lista_me_gusta=arreglo_me_gusta.productos
            } else {
              this.cant_me_gusta = 0; // Otra acción por defecto si no hay productos
            }
            
              var arreglo_carrito = JSON.parse(localStorage.getItem('ticket'));

            if (arreglo_carrito && arreglo_carrito.productos) {
              this.cant_en_carrito = arreglo_carrito.productos.length;
            } else {
              this.cant_en_carrito = 0; // Otra acción por defecto si no hay productos
            }
            
       
       
         
         
            
        
         if(this.datos_ticket!== null){
           //this.buscar_matriz()
         this.ticket=this.datos_ticket.productos
         
         this.cargar_detalles()
         this.total=  this.ticket.reduce((acumulador, actual) => acumulador + (actual.cant*parseFloat(actual.precio)), 0);
         
         this.subtotal=parseFloat(this.total)/1.19
         this.iva=this.total - this.subtotal
         
        }else{
            // window.location.href =('https://colcodec.com/catalogo_express/canales/pos/signup.html')
        }
        //	console.log('https://pos-nube/api_web/api_web.php?dominio='+this.dominio)
        
     axios
        .get('https://whatsapp-nube.com/api_web/api_web_catalogo_new.php?dominio='+this.dominio+'&id='+this.id_empresa)
        .then(response => ( this.categorias=response.data.categorias, 
               console.log(response.data),
                 this.contacto=response.data.contacto, 
                //this.email_contacto=response.data.contacto[0].contactanos_email, 
                 this.redes_social=response.data.redes[0], 
                 this.whatsapp=response.data.whatsapp,
                this.banner=response.data.info_banner, 
                this.productos=this.actualizarProductosConIvaCero(response.data.productos2),
                this.productos=this.filteredProductos1(this.productos),
                this.productos_alea=this.shuffleArray(this.filteredProductos1(this.productos)).sort(function(){return 0.5 - Math.random()}),
                this.productos_alea2=this.shuffleArray(this.filteredProductos1(this.productos)).sort(function(){return 0.9 - Math.random()}),
                this.primer_new = this.productos_alea2[0],
                 this.segundo_new = this.productos_alea2[1],
                  this.tercero_new = this.productos_alea2[2],
                   this.cuarto_new = this.productos_alea2[3],
                   
                   
                this.categorias_alea=this.categorias,
                 this.categorias_s_f=this.filteredProductos1(this.categorias),
                 
                 //const productosAleatorios2 = shuffleArray(productosCopia);
                this.productos1=this.shuffleArray(this.productos),
                this.cant_pagina=Math.ceil( this.productos1.length /this.cant_maxima_pag),
                this.productos2=this.shuffleArray(this.productos),
                this.repetidos_categorias =this.cantidad_productos(this.productos),
                
                this.buscar_consulta_heredada(),
               // this.filtro_categorgorias=this.buscar_categoria_espe("",1),
                
                this.llenar_satisfactorio(this.id_empresa, rutaArchivo),
              
               urlSearchParams = new URLSearchParams(window.location.search),
                 this.id_producto_show = urlSearchParams.get("producto"),
             this.buscar_productos_single(this.id_producto_show),
             
             console.log(response.data),
             
             console.log( this.categorias_s_f),
             this.mostrarPreloader = false
          // Oculta el desbordamiento de body
           
               
               
                
                
     
    

    ))
            this.obtenerInformacionVisita();   
         
                 
     setTimeout(()=>{
         
          console.log('https://whatsapp-nube.com/api_web/api_reg_visitante.php?id='+this.id_empresa+'&data_visitante='+ JSON.stringify(this.informacionVisita)+'&dominio='+this.dominio)
          axios
                .get('https://whatsapp-nube.com/api_web/api_reg_visitante.php?id='+this.id_empresa+'&data_visitante='+ JSON.stringify(this.informacionVisita)+'&dominio='+this.dominio)
               .then(resp=>(
                   
                    console.log(resp.data)
                   
                ))
          
    },10000)
    
    
    },
    
    update:{
             
            
            
           
    },
   
    methods:{
	    formatLine(text, start, maxLength) {
      if (!text) return '';
      const words = text.split(' ');
      let line = '';
      let length = 0;

      for (const word of words) {
        if (length + word.length + 1 > maxLength) {
          // Si al agregar la palabra excede el límite, detenemos
          break;
        }
        line += (line.length > 0 ? ' ' : '') + word; // Agrega un espacio solo si no es la primera palabra
        length += word.length + 1; // Ajusta la longitud con el espacio
      }
      return line.trim();
    },
        seleccionarCategoria(dato, index) {
          this.selectedIndex = index; // Actualiza el índice seleccionado
          this.buscar_categoria(dato, 1); // Llama a tu función existente
        },
         async createPreference() {
   
      if(this.nombre_cliente!=="" && this.apellido_cliente!=="" && this.email_cliente!=="" && this.tel_cliente!=="" && this.rut_cliente!==""  && (parseFloat(this.total)>0)  && this.direccion_cliente!=="" && this.ciudad_cliente!=="" && this.departamento_cliente!=="" ){
   
        try {
            const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer APP_USR-7356213481155701-093016-4251fb339cb3b7a903e4c020629793de-292963841'
                },
                body: JSON.stringify({
                    items: this.ticket.map(element => ({
                        title: element.descripcion,
                        quantity: element.cant,
                        currency_id: 'COP',  // Moneda de peso colombiano
                        unit_price: Math.round(element.precio)  // Precio redondeado
                    })),
                    payer: {
                    name: this.nombre_cliente,
                    surname: this.apellido_cliente,
                    email: this.email_cliente,
                    phone: {
                        area_code: this.tel_cliente.slice(0, 3),
                        number: this.tel_cliente.slice(3)
                    },
                    identification: {
                        type: this.tip_doc_cliente,
                        number: this.rut_cliente
                    },
                    address: {
                        zip_code: "",
                        street_name: this.direccion_cliente,
                        street_number: ""
                    }
                    },
                    back_urls: {
                        success: 'https://www.tusitio.com/success',
                        failure: 'https://www.consmopcmayorista.com/checkout.html',
                        pending: 'https://www.tusitio.com/pending'
                    },
                    auto_return: 'approved'
                })
            });
    
            const result = await response.json();
    
            if (response.ok && result.init_point) {
                this.actualizar_datos()
                const successUrl = `/order-completed.html?id=${result.id}`;
                console.log(`URL de éxito: ${successUrl}`);
                window.location.href = result.init_point; // Esto inicia el proceso de pago
            } else {
                console.error('Error al crear la preferencia:', result);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
        
        
      }else{
          alert('Por favor Llene toda la Información Facturacion y Envio')
      }
    
    
},

    
    
    createCheckoutButton(preferenceId) {
      const bricksBuilder = mercadopago.bricks();

      const renderComponent = async (bricksBuilder) => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create(
          'wallet',
          'button-checkout', // ID o clase del contenedor donde se mostrará el botón de pago
          {
            initialization: {
              preferenceId: preferenceId
            },
            callbacks: {
              onError: (error) => console.error(error),
              onReady: () => {
                console.log('Botón de pago listo');
              }
            }
          }
        );
      };

      window.checkoutButton = renderComponent(bricksBuilder);
    },

        
        cerrarModal() {
      this.mostrarModal = false;
    },
         obtenerInformacionVisita() {
    let informacion = {};

    // Obtener la fecha y hora actual
    const fechaActual = new Date();
    informacion.fecha = fechaActual.toLocaleDateString();
    informacion.hora = fechaActual.toLocaleTimeString();

    // Obtener la URL actual
    informacion.urlActual = window.location.href;

    // Obtener la URL de la página anterior
    informacion.paginaAnterior = document.referrer;

    // Obtener la dirección IP del visitante mediante una petición HTTP
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            informacion.direccionIP = data.ip;
            // Utilizar la dirección IP para obtener la ubicación geográfica del visitante
            fetch(`https://ipapi.co/${data.ip}/json/`)
                .then(response => response.json())
                .then(data => {
                    informacion.ciudad = data.city;
                    informacion.pais = data.country_name;
                    // Obtener las coordenadas geográficas (latitud y longitud)
                    const latitud = data.latitude;
                    const longitud = data.longitude;
                    informacion.coordenadas = { latitud, longitud };

                    // Mostrar las coordenadas en Google Maps
                   // this.mostrarMapa(latitud, longitud);
                })
                .catch(error => console.error('Error al obtener la ubicación:', error));
        })
        .catch(error => console.error('Error al obtener la dirección IP:', error));

    // Detectar si el visitante se conecta desde un celular o un computador
    informacion.tipoDispositivo = /Mobile/.test(navigator.userAgent) ? 'Celular' : 'Computadora';

    this.informacionVisita= informacion;
},

 mostrarMapa(latitud, longitud) {
    // Crear un objeto LatLng con las coordenadas
    const coordenadas = { lat: parseFloat(latitud), lng: parseFloat(longitud) };

    // Crear un mapa centrado en las coordenadas
    const mapa = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 12,
        center: coordenadas
    });

    // Crear un marcador en las coordenadas
    new google.maps.Marker({
        position: coordenadas,
        map: mapa
    });
},
        
        
filtrarProductos() {
      // Filtrar productos en función del valor de búsqueda
    this.producto_buscado = this.productos.filter((producto) => {
      if (this.categoria !== "") {
        
        return producto.categoria === this.categoria && (producto.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || producto.idpro.toLowerCase().includes(this.busqueda.toLowerCase()))
      } else {
        return producto.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || producto.idpro.toLowerCase().includes(this.busqueda.toLowerCase()) 
      }
    }).slice(0, 20);
},
        shuffleArray(array) {
          let currentIndex = array.length, randomIndex, temporaryValue;
        
          // Mientras queden elementos sin barajar...
          while (currentIndex !== 0) {
            // Selecciona un elemento sin barajar restante...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // E intercambia el elemento actual con el elemento seleccionado al azar
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
        
          return array;
        },
    cargar_me_gusta(id, descripcion, precio, foto, operacion, tags) {
      // Paso 1: Verifica si existe arreglo_car en el almacenamiento local
      const arreglo_car = JSON.parse(localStorage.getItem("me_gusta")) || { productos: [] };

      // Paso 2: Si no existe arreglo_car, crea un nuevo arreglo
      if (!arreglo_car) {
        arreglo_car.productos = [];
      }

      // Paso 3: Verifica si hay un valor con el mismo id
      const productoExistente = arreglo_car.productos.find(
        (producto) => producto.id === id
      );

      // Paso 4: Si existe un producto con el mismo id, no hace nada
      if (productoExistente) {
        return;
      }
 
 
     
      
      const producto = {
          id,
          descripcion,
          precio: parseFloat(precio.toFixed(2)), // Limita a 2 decimales
          foto,
          cant: 1, 
          tags:parseFloat(tag.toFixed(2)), // Limita a 2 decimales
        };

      arreglo_car.productos.push(producto);
      
      
        
         
      // Paso 6: Actualiza localStorage
       localStorage.setItem("me_gusta", JSON.stringify(arreglo_car));
       
         var arreglo_me_gusta = JSON.parse(localStorage.getItem('me_gusta'));

            if (arreglo_me_gusta && arreglo_me_gusta.productos) {
              this.cant_me_gusta = arreglo_me_gusta.productos.length;
               this.lista_me_gusta=arreglo_me_gusta.productos
            } else {
              this.cant_me_gusta = 0; // Otra acción por defecto si no hay productos
            }
            
            
    },    
        
    quitar_item_Carrito(id){
        if (this.ticket) {
            // Crear un nuevo objeto nuevo_ticket
            let nuevo_ticket = {
              productos: []
            };
        
            // Copiar los productos que no coinciden con el id
            nuevo_ticket.productos = this.ticket.filter(item => item.id !== id);
        
        
            localStorage.setItem('ticket', JSON.stringify(nuevo_ticket));
             var arreglo_carrito = JSON.parse(localStorage.getItem('ticket'));
              
          this.ticket=arreglo_carrito.productos
           this.actualizarTotales()
          this.cargar_detalles()
            // Asignar nuevo_ticket a this.ticket
            
          }
    },
    
    actualizarTotales() {
     
      this.total = this.ticket.reduce((acumulador, actual) => acumulador + (actual.cant * parseFloat(actual.precio)), 0);
      this.subtotal = parseFloat(this.total) / 1.19;
      this.iva = this.total - this.subtotal;
      
      console.log(this.total)
    },

  
         
        filtered_new(productos) {
          productos.sort((a, b) => {
    
            const dateA = new Date(a.fecha_ing);
            const dateB = new Date(b.fecha_ing);
            return dateA - dateB;
          });
        
          
          return productos.slice(0, 4);
        },
        
         filteredProductos1(array) {
             console.log(array)
             return array.map(dato => {
            if (dato.imagen === '') {
              dato.imagen = '/assets/images/sin_imagen.png'; // Asignar imagen por defecto
            }
            return dato; // Retornar el objeto modificado
          });
           //derogado  
         //return array.filter(dato => dato.imagen !== '');
        },
        
         actualizarProductosConIvaCero(array) {
            // Filtrar y actualizar los productos
            const productosActualizados = array
                .filter(producto => producto.existencia > 0) // Filtrar productos con existencia > 0
                .map(producto => { // Mapear para actualizar los precios
                    
                        producto.pt1 = parseFloat(producto.pt1) * 1.19; // Aplicar IVA del 19%
                    
                    return producto; // Retornar el producto actualizado
                });
        
            return productosActualizados; // Retornar el nuevo array
        }, 
                    
    decrementar() {
        if (this.cantidades > 1) {
            this.cantidades--;
        } else {
            console.log("No se puede disminuir más. El mínimo es 1.");
        }
    },
    incrementar() {
        if (this.cantidades < this.producto_mostrar.existencia) {
            this.cantidades++;
            console.log(`maximo: ${this.producto_mostrar.existencia}.`);
        } else {
            console.log(`No se puede incrementar más. Máximo permitido: ${this.producto_mostrar.existencia}.`);
        }
    },
     obtenerCantidad(id) {
        const producto = this.ticket.find(item => item.id === id);
        return producto ? producto.cant : 0;
    },
    decrementar2(id) {
        if (this.ticket) {
            const producto = this.ticket.find(item => item.id === id);
            if (producto && producto.cant > 1) {
                producto.cant--;
                localStorage.setItem('ticket', JSON.stringify({ productos: this.ticket }));
                this.actualizarTotales();
                this.cargar_detalles();
            } else {
                console.log("No se puede disminuir más. El mínimo es 1.");
            }
        }
    },
    incrementar2(id, existencia) {
        if (this.ticket) {
            const producto = this.ticket.find(item => item.id === id);
            if (producto && producto.cant < existencia) {
                producto.cant++;
                localStorage.setItem('ticket', JSON.stringify({ productos: this.ticket }));
                this.actualizarTotales();
                this.cargar_detalles();
            } else {
                console.log(`No se puede incrementar más. Máximo permitido: ${existencia}.`);
            }
        }
    },
    llenar_satisfactorio: async function (id, rutaArchivo) {
      if (rutaArchivo === "index.html") {
          document.querySelector('.product_quickview').classList.add('active');
          document.body.style.overflowY = 'hidden';
      }
  
      if (rutaArchivo.includes('order-completed.html')) {
          if (this.datos_ticket !== null) {
              const urlSearchParams = new URLSearchParams(window.location.search);
              let referenciaURL = urlSearchParams.get("id");
  
              if (!referenciaURL || referenciaURL === "null") {
                  const ultimoPedido = await this.obtenerUltimoPedido();
  
                  if (ultimoPedido && !isNaN(ultimoPedido) && parseInt(ultimoPedido) > 0) {
                      this.referencia_pago = (parseInt(ultimoPedido) + 1).toString(); // Inicia en 1
                  } else {
                      this.referencia_pago = "1"; // Número inicial si no hay datos válidos
                  }
              } else {
                  this.referencia_pago = referenciaURL;
              }
  
              this.facturar_pedido(id);
          } else {
              window.location.href = "carrito.html";
          }
      }
  },
  
  llamar_ultima: async function () {
      const ultimo_pedido = await this.obtenerUltimoPedido();
      console.log("Último pedido:", ultimo_pedido);
  },
  
  async obtenerUltimoPedido() {
      try {
          const response = await axios.get('https://whatsapp-nube.com/api_web/api_ultimo_pedido.php?id_empresa=24');
          const ultimoPedido = response.data.nrofactura;
          console.log('Último número de factura:', ultimoPedido);
          return ultimoPedido; // Devuelve el número directamente
      } catch (error) {
          console.error('Error al obtener el último pedido:', error);
          return 0; // Devuelve 0 si hay un error
      }
  },
  
  actualizar_datos: async function () {
      if (this.nombre_cliente && this.apellido_cliente && this.email_cliente && this.tel_cliente && this.direccion_cliente && this.rut_cliente && parseFloat(this.total) > 0) {
          const ultimoPedido = await this.obtenerUltimoPedido();
  
          if (ultimoPedido && parseInt(ultimoPedido) > 0) {
              this.reference = (parseInt(ultimoPedido) + 1).toString();
          } else {
              this.reference = "1"; // Inicia desde 1
          }
  
          // Código original...
          this.info_factura.reference = this.reference;
          this.info_factura.cliente = this.info_cliente;
          // Otros datos de facturación
          const arrayJson = JSON.stringify(this.info_factura);
          localStorage.setItem("facturacion_web", arrayJson);
  
          const form = document.getElementById('wompi');
          form.submit();
      } else {
          alert("Llene los campos obligatorios");
      }
  },
  
        
        pagoContraEntrega: async function() {
            if (this.nombre_cliente !== "" && this.apellido_cliente !== "" && this.email_cliente !== "" && this.tel_cliente !== "" && this.direccion_cliente !== "" && this.rut_cliente !== "" && (parseFloat(this.total) > 0)) {
        
                // Obtener el número de factura desde la API
                const ultimoPedido = await this.obtenerUltimoPedido();
                if (ultimoPedido === null || ultimoPedido === "null") {
                    this.reference = "REF-00001";
                } else {
                    const referenciaFormateada = (parseInt(ultimoPedido) + 1).toString().padStart(5, '0');
                    this.reference = `REF-${referenciaFormateada}`;
                }
        
                this.info_cliente.push({
                    "nombres": this.nombre_cliente,
                    "apellidos": this.apellido_cliente,
                    "email": this.email_cliente,
                    "tel": this.tel_cliente,
                    "direccion": this.direccion_cliente + this.direccion_cliente2,
                    "ciudad": this.ciudad_cliente,
                    "departamento": this.departamento_cliente,
                    "tip_doc_cliente": this.tip_doc_cliente,
                    "rut_cliente": this.rut_cliente
                });
        
                var checkbox = document.getElementById('shipto');
                if (checkbox.checked) {
                    this.info_cliente_envio.push({
                        "nombres": this.e_nombre_cliente,
                        "apellidos": this.e_apellido_cliente,
                        "email": this.e_email_cliente,
                        "tel": this.e_tel_cliente,
                        "direccion": this.e_direccion_cliente + this.e_direccion_cliente2,
                        "ciudad": this.e_ciudad_cliente,
                        "departamento": this.e_departamento_cliente
                    });
                } else {
                    this.info_cliente_envio.push({
                        "nombres": this.nombre_cliente,
                        "apellidos": this.apellido_cliente,
                        "email": this.email_cliente,
                        "tel": this.tel_cliente,
                        "direccion": this.direccion_cliente + this.direccion_cliente2,
                        "ciudad": this.ciudad_cliente,
                        "departamento": this.departamento_cliente
                    });
                }
        
                this.info_factura.reference = this.reference;
                this.info_factura.cliente = this.info_cliente;
                this.info_factura.info_cliente_envio = this.info_cliente_envio;
                this.info_factura.descuento = 0;
                this.info_factura.sub_total_factura_bruto = this.subtotal;
                this.info_factura.total_descuento = 0;
                this.info_factura.sub_total_factura = this.subtotal;
                this.info_factura.imp_iva_factura = this.iva;
                this.info_factura.total_factura = this.total;
                this.info_factura.form_pago = "1";
                this.info_factura.nota = "Compra ejecutada por página web, facturada para contra entrega.";
                this.info_factura.fecha_fac = this.fechaHoy;
                this.info_factura.fecha_vencimiento = this.fechaHoy;
        
                var arrayJson = JSON.stringify(this.info_factura);
                localStorage.setItem("facturacion_web", arrayJson);
        
                window.location.href = "https://www.consmopcmayorista.com/order-completed.html";
            } else {
                alert("Llene los campos obligatorios");
            }
        },
        
        recogerEnPuntoDeVenta: async function() {
            if (this.nombre_cliente !== "" && this.apellido_cliente !== "" && this.email_cliente !== "" && this.tel_cliente !== "" && (parseFloat(this.total) > 0)) {
        
                // Obtener el número de factura desde la API
                const ultimoPedido = await this.obtenerUltimoPedido();
                if (ultimoPedido === null || ultimoPedido === "null") {
                    this.reference = "REF-00001";
                } else {
                    const referenciaFormateada = (parseInt(ultimoPedido) + 1).toString().padStart(5, '0');
                    this.reference = `REF-${referenciaFormateada}`;
                }
        
                this.info_cliente.push({
                    "nombres": this.nombre_cliente,
                    "apellidos": this.apellido_cliente,
                    "email": this.email_cliente,
                    "tel": this.tel_cliente,
                    "direccion": this.direccion_cliente + (this.direccion_cliente2 || ""),
                    "ciudad": this.ciudad_cliente,
                    "departamento": this.departamento_cliente,
                    "tip_doc_cliente": this.tip_doc_cliente,
                    "rut_cliente": this.rut_cliente
                });
        
                this.info_factura.reference = this.reference;
                this.info_factura.cliente = this.info_cliente;
                this.info_factura.descuento = 0;
                this.info_factura.sub_total_factura_bruto = this.subtotal;
                this.info_factura.total_descuento = 0;
                this.info_factura.sub_total_factura = this.subtotal;
                this.info_factura.imp_iva_factura = this.iva;
                this.info_factura.total_factura = this.total;
                this.info_factura.form_pago = "3";
                this.info_factura.nota = "Compra ejecutada por página web, facturada para recogida en punto de venta.";
                this.info_factura.fecha_fac = this.fechaHoy;
                this.info_factura.fecha_vencimiento = this.fechaHoy;
        
                var arrayJson = JSON.stringify(this.info_factura);
                localStorage.setItem("facturacion_web", arrayJson);
        
                window.location.href = "https://www.consmopcmayorista.com/order-completed.html";
            } else {
                alert("Por favor, completa todos los campos obligatorios");
            }
        },
        


      
         
         enviarFormulario: function() {
        
         },     
        orden_lista_producto(lista){
             return shuffle(lista)
           
        },
        banner_existe: function(id, matrix) {
            let datos=matrix.info_banner[id];
        if(datos){
            return datos.imagen_banne_ppl
                                 
        }else{
            return ""
        }
        
        
        
	  },
	  banner_titulo: function(id, matrix) {
	       let datos=matrix.info_banner[id];
        if(datos){
            return datos.titulo_banner

                                 
        }else{
             return ""
        }
        
        
        
	  },
	  
	   generatref() {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let length=30
          let reference = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            reference += characters[randomIndex];
          }
          return reference;
        },
	  buscar_producto_search: function(){
	      let contenido=document.getElementById("search").value
	      window.location.href = this.texto_categoria+contenido;

	  },
	  
      buscar_productos: function(id) {
            this.cantidades=1
            
       let get={};
      
        let valor=this.productos1
        get=(valor.filter(e => (`${e.id} `.includes(id))));
        get.pt2 = Math.round(parseInt(get.pt2));
        this.producto_mostrar=get[0]
       
       
       
       
       
       
       
        console.log(this.producto_mostrar)
        this.imagenCargada=true
         this.imagenMostrada= this.producto_mostrar.imagen 
          document.querySelector('.product_quickview').classList.add('active');
          
          // Oculta el desbordamiento de body
          document.body.style.overflowY = 'hidden';
        
	  },
 buscar_productos_single: function(id) {
       if (window.location.pathname === '/product-view.html') {
         const urlSearchParams = new URLSearchParams(window.location.search);  	
	 oferta = urlSearchParams.get("of")              
           this.cantidades=1
           let get=[];
          
          
           
            let valor=this.productos1
           
            get=(valor.filter(e => (`${e.id} `.includes(id))));
            this.imagenCargada = true;
            this.producto_mostrar=get[0]
             if(oferta){
              this.producto_mostrar.pt1 = this.producto_mostrar.pt4
            }
            console.log(this.producto_mostrar)
            this.imagenMostrada= this.producto_mostrar.imagen 
       }
        
        
	  },
	  cambiarImagen(nuevaImagen) {
            this.imagenMostrada = nuevaImagen;
     },
	 paginar(pagina) {
   
    this.pagina = pagina; // Actualiza la página actual
    // Enfoca el elemento principal (contenido)
      const contentElement = document.querySelector("#select_orden");
      if (contentElement) {
        contentElement.focus();
      }

      // Desplaza la página hacia arriba
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Desplazamiento suave
      });
    
  },
 buscar_consulta_heredada(){
      const urlSearchParams = new URLSearchParams(window.location.search);
      const categorie = urlSearchParams.get("Pag");
       const criterio = urlSearchParams.get("criterio");
       const criterio2 = urlSearchParams.get("criterio2");
       console.log("las categories" , categorie)
       
       if(criterio==="categoria"){
            this.categoriasSeleccionadas=categorie
           this.buscar_categoria_heredada(categorie, "1")
          
       }else if(criterio==="producto"){
           
       
               this.buscar_productos_select(categorie, "1")
           console.log(categorie)
           
           
           
           
       }else  if(criterio==="categoria_in"){
            this.buscar_productos_select2(categorie, "1", criterio2)
           console.log(criterio2)
          console.log("holaaaaa")
       }
       
       
 }, 
redirigirAListaDeProductos(filtrarProductos) {
    // Puedes obtener este valor de alguna manera
   let dato_buscar=""
    // Construye la URL de destino
     let url ='' 
     
    if (this.busqueda===""){
       dato_buscar = this.categoria 
       
       url= 'shop-list.html?Pag=' + dato_buscar + '&criterio=categoria';
    }else{
       var  dato_buscar1 = this.categoria 
       
       if(dato_buscar1===""){
        dato_buscar =this.busqueda
         url = 'shop-list.html?Pag=' + dato_buscar + '&criterio=producto';
         
       }else{
         dato_buscar =this.busqueda
         url = 'shop-list.html?Pag=' + dato_buscar + '&criterio=categoria_in' + '&criterio2=' + dato_buscar1;
       }
    }
    
    
     
        // Redirige a la URL
        window.location.href = url;
      },	  

buscar_productos_select: function(categoria, pagina) {
  // Realizar la consulta basada en las categorías seleccionadas
  let get=[]
  let valor = this.productos;
    
  if (categoria.length > 0) {
    // Filtrar productos por categoría
    get=(valor.filter(e => (`${e.titulo.toLocaleUpperCase()} ${e.idpro.toLocaleUpperCase()}`.includes(categoria.toLocaleUpperCase()))));
   
  }
 /* const columnaCategorias = document.getElementById("columna_categorias");
  columnaCategorias.style.display = "none";*/
  // Actualizar otras propiedades según la consulta
  this.filtro_activo = categoria;
  this.productos_alea = get;
  this.cant_pagina = Math.ceil(get.length / this.cant_maxima_pag);
  this.pagina = pagina;
  this.imagenCargada = true; 
},

buscar_productos_select2: function(categoria, pagina, criterio2) {
  // Realizar la consulta basada en las categorías seleccionadas
  let get=[]
  let valor = this.productos;
  
  
   
 
      const resultado = this.categorias_alea
      .filter(lacategoria => lacategoria.cat_padre === criterio2)
      .map(lacategoria => lacategoria.categoria);
    
    // Agrega la variable 'criterio2' al inicio de 'resultado'
    resultado.unshift(criterio2);
    console.log(resultado)
    // Realiza el filtro de productos, buscando productos cuyo `e.linea` contenga alguna de las categorías en `resultado`
    // y cuyo título o ID contengan la cadena `categoria`.
    get = valor.filter(e => {
      return resultado.some(cat => e.linea.toLocaleUpperCase().includes(cat.toLocaleUpperCase())) &&
             (`${e.titulo.toLocaleUpperCase()} ${e.idpro.toLocaleUpperCase()}`.includes(categoria.toLocaleUpperCase()));
    });
 
  /*const columnaCategorias = document.getElementById("columna_categorias");
  columnaCategorias.style.display = "none";*/
  // Actualizar otras propiedades según la consulta
  this.filtro_activo = categoria;
  this.productos_alea = get;
  this.cant_pagina = Math.ceil(get.length / this.cant_maxima_pag);
  this.pagina = pagina;
  this.imagenCargada = true; 
},


 buscar_categoria_heredada: function(categoria, pagina) {
 let get =[]
  let valor = this.productos;
   // Filtrar las categorías para obtener solo el campo 'categoria'
const resultado = this.categorias_alea
  .filter(lacategoria => lacategoria.cat_padre === categoria)
  .map(lacategoria => lacategoria.categoria); // Extrae solo 'categoria'

// Agregar la variable 'categoria' al inicio de 'resultado'
    resultado.unshift(categoria);

// Filtrar 'valor' usando 'resultado'
 //get = valor.filter(e => resultado.some(cat => e.linea.toLocaleUpperCase().includes(cat.toLocaleUpperCase())));
get = valor.filter(e => resultado.some(cat => e.linea.toLocaleUpperCase() === cat.toLocaleUpperCase()));


  /*const columnaCategorias = document.getElementById("columna_categorias");
  columnaCategorias.style.display = "none";*/
  this.filtro_activo = categoria;
  this.productos_alea = get;
  this.cant_pagina = Math.ceil(get.length / this.cant_maxima_pag);
  this.pagina = pagina;
  this.imagenCargada = true; 
  this.categorias_hijo=resultado
},

buscar_categoria: function(categoria, pagina) {
 console.log(categoria)
 

  // Realizar la consulta basada en las categorías seleccionadas
  let get = this.productos;
  
    get = get.filter(e => categoria.includes(e.linea));
  

  // Actualizar otras propiedades según la consulta
  this.filtro_activo = categoria;
  this.productos_alea = get;
  this.cant_pagina = Math.ceil(get.length / this.cant_maxima_pag);
  this.pagina = pagina;
  this.imagenCargada = true; 
},

	  
buscar_categoria_espe: function(categoria, pagina) {
	    const urlSearchParams = new URLSearchParams(window.location.search);
        const categorie = urlSearchParams.get("Pag");
        
        
        if(categorie!==null){
	    if (categoria==="por_producto"){   
	       let valor_casilla = this.busqueda
	       //this.filtro_activo=categoria  
	         
	        let get={};
	         let valor=this.productos_alea 
	        
	         get=(valor.filter(e => (`${e.titulo.toLocaleUpperCase()} ${e.idpro.toLocaleUpperCase()}`.includes(valor_casilla.toLocaleUpperCase()))));
	          console.log(get)
	          this.cant_pagina=Math.ceil(get.length/this.cant_maxima_pag)
              this.pagina=pagina
	           this.filtro_categorgorias=get 
           return get
	    }else if(categoria===""){
	        
	       
            if (categorie!==""){
                 
	        this.filtro_activo=categorie    
	        let get={};
	        let valor=this.productos1
	        
	         get=(valor.filter(e => (`${e.linea.toLocaleUpperCase()} ${e.idpro.toLocaleUpperCase()} `.includes(categorie.toLocaleUpperCase()))));
	          this.productos_alea=get 
	          this.cant_pagina=Math.ceil(get.length/this.cant_maxima_pag)
              this.pagina=pagina
	         
           return get
	    }  

        
        } 
        }
	  },
	  
cantidad_productos: function(categorias) {
    let repetidos = {};

    categorias.forEach(function(producto) {
        repetidos[producto.linea] = (repetidos[producto.linea] || 0) + 1;
    });

    // Convierte las claves en un array y ordénalas alfabéticamente
    const clavesOrdenadas = Object.keys(repetidos).sort();

    // Crea un nuevo objeto para almacenar los resultados ordenados
    const repetidosOrdenados = {};

    // Llena el objeto ordenado con las claves y valores ordenados
    clavesOrdenadas.forEach(function(clave) {
        repetidosOrdenados[clave] = repetidos[clave];
    });

    console.log(repetidosOrdenados);
    return repetidosOrdenados;
},

        
        
        cotizar_pro_ws: function(producto, codigo){
            let url=this.url_whatsapp+this.whatsapp[0].codigo+this.whatsapp[0].whatsapp+this.texto_whatsapp+"Hola requiero Cotizar el producto: "+producto+" codigo:"+codigo;
            window.open(url, '_blank');
        },
       
        
        
          /* capturar_imagen: function(categoria2){
             console.log(categoria2)
            const categoria_array = (this.productos).filter(function(element){
              return element.linea === categoria2;
            });
            
          
           if(categoria_array.length>0){
           let valor_aleatorio=Math.random() * categoria_array.length
           console.log(Math.floor(valor_aleatorio));
              let imagen= categoria_array[Math.floor(valor_aleatorio)].imagen
            
            
                return imagen
            }else{
                return "https://antioquenadebasculas.com/img/libros-galeria-2.png"
            }
        },
        
        cantidad_productos: function(categoria2){
            let repetidos = [];
        
         (this.lista_productos_alea).forEach(function(producto){
             
           repetidos[producto.linea] = (repetidos[producto.linea] || 0) + 1;
           
         })
         
          repetidos.forEach(element => {
               if(element[categoria2]){
                    return categoria2
               }
            })
         
        
        },*/ 
		   
		cliente(){
            let get=[]; 
            empezar()
            async function empezar(){
              var url=``;
              const response = await axios.get(url); 
              get=response.cliente_web
              console.log(get)
            } 
        }, 
        onWindowLoad() {
            
        },
        
        cargar_detalles(){
         this.producto_imprimir=[]
            if(this.ticket){
             this.ticket.forEach(element => {
             let valor = element.precio  / 1.19; 
             let iva = element.precio  - valor
             let total = element.precio * element.cant
                 
             this.producto_imprimir.push({"id":element.id, "idpro":element.tags, "titulo":element.descripcion, "cant":element.cant, "valor":valor, "desc":0, "tot_desc":0, "valor_desc":valor, "iva":19,  "impuesto":iva, "precio":element.precio,"total":total, 'lista_precio':[] })
             
             })
             
              this.info_factura.productos= this.producto_imprimir; 
              
            }
        },
        
         enviar_email: async function(id, id_pedido, id_cliente) {
                   
                    this.info_imprimir=JSON.parse(localStorage.getItem('facturacion_web'))
                    console.log(this.info_imprimir)
                    var arrayJson=JSON.stringify(this.info_imprimir);
                     const formData = new FormData();
                           formData.append('factura', arrayJson);
                           formData.append('ref', id);
                           formData.append('id_empresa', this.id_empresa);
                            formData.append('id_pedido', id_pedido);   
                             formData.append('id_cliente', id_cliente);   
                   
                    const URL = `/mail/enviar_pedi.php`
                     const res = await axios.post(URL,
                                formData, 
                                {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                    
                    localStorage.removeItem("ticket");
                   localStorage.removeItem("facturacion_web");
                   
              
        },    
        
        
                facturar_pedido: async function (id) {
            try {
                this.info_imprimir = JSON.parse(localStorage.getItem('facturacion_web')) || {};
                if (!this.info_imprimir || Object.keys(this.info_imprimir).length === 0) {
                    console.error("Datos de facturación no encontrados en localStorage");
                    return;
                }
        
                const arrayJson = JSON.stringify(this.info_imprimir);
                const formData = new FormData();
                formData.append('factura', arrayJson);
                formData.append('id', '24');
                formData.append('documento', "8");
                formData.append('referencia_pago', this.referencia_pago);
        
                const URL = `https://whatsapp-nube.com/api_web/api_pos_pedido_web.php`;
        
                const res = await axios.post(URL, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
        
                // Manejo de respuesta
                this.total = this.info_imprimir.total_factura;
        
                const id_pedido = res.data[1];
                const id_cliente = res.data[2];
        
                if (!id_pedido || !id_cliente) {
                    console.error("ID de pedido o cliente no devueltos por la API");
                    return;
                }
        
                this.enviar_email(this.referencia_pago, id_pedido, id_cliente);
            } catch (error) {
                console.error("Error al facturar el pedido:", error);
            }
        },
         imprimir_listado: async function() {
                    
                    var arrayJson=JSON.stringify(this.info_imprimir);
                    const formdata = new FormData();
                    formdata.append('productos', arrayJson);
                    formdata.append('referencia_pago', this.referencia_pago);
                    
                    
                    const url = './reporte/pedidos.php';
                    fetch(url, {
                      method: 'POST',
                      body: formdata
                    }).then(response => {
                      if (response.ok) {
                        return response.blob();
                      }
                      throw new Error('Error en la respuesta del servidor');
                    }).then(blob => {
                      const fileURL = URL.createObjectURL(blob);
                      window.open(fileURL, '_blank');
                    }).catch(error => {
                      console.error('Error:', error);
                    });
                                        
              
        },
    },
    computed:{
        

       
        lista_categoria_alea: function(){
          let repetidos = {};
          let lista_categoria= this.categorias_alea.sort(function(){return 0.5 - Math.random()});
            
            
                
        }, 
        lista_productos_alea: function(){
          return this.productos_alea.sort(function(){return 0.5 - Math.random()});
        },
        
        lista_productos_alea_2: function(){
          return this.productos.sort(function(){return 1 - Math.random() * 8});
        }
        
        
        },
          
    created() {
       
       
    }
    
    
    
    
    
})
