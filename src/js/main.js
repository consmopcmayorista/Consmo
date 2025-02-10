   $(window).on('load', function() {
        cargar_arreglo_car();
        
        $('#js-preloader').addClass('loaded');


  
    const btnDepartamentos = document.getElementById('btn-departamentos'),
    	  btnCerrarMenu = document.getElementById('btn-menu-cerrar'),
    	 
    	  contenedorEnlacesNav = document.querySelector('#menu .contenedor-enlaces-nav'),
    	
    	  esDispositivoMovil = () => window.innerWidth <= 800;
    
    if (btnDepartamentos){
        btnDepartamentos.addEventListener('mouseover', () => {
            if(!esDispositivoMovil()){
            	grid.classList.add('activo');
            }
        });
    }
    
    grid.addEventListener('mouseleave', () => {
    	if(!esDispositivoMovil()){
    		grid.classList.remove('activo');
    	}
    });

    document.querySelector('#menu .contenedor-botones-menu .btn-menu-cerrar').addEventListener('click', (e) => {
	e.preventDefault();
	grid.classList.remove('activo');
	btnCerrarMenu.classList.remove('activo');
});


    document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
    	elemento.addEventListener('mouseenter', (e) => {
    		if(!esDispositivoMovil()){
    			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
    				categoria.classList.remove('activo');
    				if(categoria.dataset.categoria == e.target.dataset.categoria){
    					categoria.classList.add('activo');
    				}
    			});
    		};
    	});
    });
    
    // EventListeners para dispositivo movil.
    document.querySelector('#btn-menu-barras').addEventListener('click', (e) => {
    	e.preventDefault();
    	
    	if(contenedorEnlacesNav.classList.contains('activo')){
    		contenedorEnlacesNav.classList.remove('activo');
    		document.querySelector('body').style.overflow = 'visible';
    		
    	} else {
    		contenedorEnlacesNav.classList.add('activo');
    		document.querySelector('body').style.overflow = 'hidden';
    	}
    });
    
    // Click en boton de todos los departamentos (Para version movil).
    btnDepartamentos.addEventListener('click', (e) => {
    	e.preventDefault();
    	grid.classList.add('activo');
    	btnCerrarMenu.classList.add('activo');
    });
    
    // Boton de regresar en el menu de categorias
    document.querySelector('#btn-regresar').addEventListener('click', (e) => {
    	e.preventDefault();
    	grid.classList.remove('activo');
       btnCerrarMenu.classList.remove('activo');
    });
    
    document.querySelectorAll('#menu .categorias a').forEach((elemento) => {
    	elemento.addEventListener('click', (e) => {
    		if(esDispositivoMovil()){
    		//	contenedorSubCategorias.classList.add('activo');
    			document.querySelectorAll('#menu .subcategoria').forEach((categoria) => {
    				categoria.classList.remove('activo');
    				if(categoria.dataset.categoria == e.target.dataset.categoria){
    					categoria.classList.add('activo');
    				}
    			});
    		}
    	});
    });
    
    // Boton de regresar en el menu de categorias
    document.querySelectorAll('#btn-regresar').forEach((boton) => {
    	boton.addEventListener('click', (e) => {
    		e.preventDefault();
    		//contenedorSubCategorias.classList.remove('activo');
    	});
    });
    
    btnCerrarMenu.addEventListener('click', (e)=> {
    	e.preventDefault();
    	document.querySelectorAll('#menu .activo').forEach((elemento) => {
    		elemento.classList.remove('activo');
    	});
    	document.querySelector('body').style.overflow = 'visible';
    });
    
});
//fin del load window
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow');
            } else {
                $('.fixed-top').removeClass('bg-white shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-white shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
   // $('[data-toggle="counter-up"]').counterUp({
     //   delay: 10,
     //   time: 2000
    //});


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
			0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });



  
})(jQuery);

		const prototipoCarrito = {
	  agregarProducto: function(producto){
		if(!this.productos){
		 this.productos = [producto]
		} else {
		 this.productos.push(producto);
		}
	  },
	  
	  
	
	  obtenerPrecioTotal: function(){
		return this.productos.reduce((total, p) => total + p.precio, 0);
	  }
	
	  
	}
	
	

//carrito de compras


function agregar_producto_car(){
    
    let cant1=new Intl.NumberFormat().format($('#cantidades_producto').html());
    let cant2=new Intl.NumberFormat().format($('#cantidadesx').val());
   //  document.getElementById("cantidades_producto").innerHTML=1;
	if($('#cantidades_producto').html()!=""){
	    
	    let maximo=mod_cantidades(cant1, cant2);
	    
		if(maximo===false){ 
		  
    		const id=document.getElementById('item_producto').value;
    		//const referencia=document.getElementById('referencia').value
    		const detalle=document.getElementById('detalle').value
    		const precio=document.getElementById('precio').value;
    		const foto=document.getElementById('foto').value;
    		const tags=document.getElementById('tags').value;
    		const existencia=document.getElementById('cantidadesx').value;
    		cargar_carro( id, detalle, precio,  foto, "Agregado_ppl", tags, existencia);
    		
    		$('#cantidades_producto').val('1');
    	
    		$('#myModal3').modal('hide');	
		}
		}else{
		    alert("Coloque la cantidad a Comprar");
		}
		
		
	}


function mod_cantidades(cant1, cant2){
   let maximo = false;
   
   
     if(parseInt(cant1)>parseInt(cant2)){
	        
	        document.getElementById("cantidades_producto").value = cant2;
	        
	        alert('La cantidad solicitada de este Producto, es superior a la cantidad  disponible de mismo. Se modificó su solicitud, a la cantidad disponible');
	   
	   
	       maximo=true;
	      
	      
	  }
	  
	  
	  
	  return maximo;
}

function 	imprimir_carro_vacio(){
    let valores=`<ul classs=hopping-cart-items">
                              <li class="clearfix">
                               
                                <span class="item-quantity">No hay Productos en tu Carrito!</span>
                                <br/>
                                <br/><br/>
                              </li>

                            </ul>`
    document.getElementById("total_ticket").innerHTML=0;
	document.getElementById("muestra").innerHTML=valores;
}
function imprimir_carrito(arreglo_car, total){
      var valores='';
     
     var cantidad_valores= arreglo_car.productos.length
     //document.querySelector('.pops2').innerHTML= cantidad_valores,
     
     
   valores+="<ul class='shopping-cart-items'>";
  
         arreglo_car.productos.forEach((datos)=>{

    	 var codigo1 = datos.id;
    	 var codigo2 = '"'+codigo1+'"';
         var descripcion1 = datos.descripcion+ " ("+codigo1+")";
          var descripcion2 = '"'+descripcion1+'"';
          
         var precio1 = datos.precio;
         
         var cant1 = datos.cant;
         var foto1 = datos.foto;
         var subtotal1=precio1*cant1;
         precio1=new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 3 }).format(datos.precio) ; 
          subtotal1=new Intl.NumberFormat('es-ES', { maximumSignificantDigits: 3 }).format(subtotal1);
         
         
         valores+= ` 
                              <li class="clearfix">
                                <img src='${foto1}' alt="" />
                                <span class="item-name">${descripcion1}</span>
                                <span class="item-price">$ ${precio1}</span>
                                <span class="item-quantity">/ Cantidad: ${cant1}</span>
                              </li>
                              
                              
                        
                             
                            `;
    	
     /*   valores+="<div class='border border-top-0 border-right-0 border-left-0 rounded' style='background:#fff'><div><a style='cursor: pointer; '><p onclick='ver_detalle("+codigo1+");' class='text-center' style='font-size: 20px;'>"+descripcion1+"</p></a></div><table style='table-layout: fixed; '><tr><td ><img class='' src='"+foto1+"' style='height: 140px; width: 130px;'></td> <td style='	text-align:right, justify-content: right, 	align-items: right;'><div class='p-4'><a  onclick='restar_car("+codigo2+", "+descripcion2+");'  style=' text-align:center; border-radius: 50px; cursor: pointer;  font-size: 3em;' ><i   class='fa-solid fa-minus'></i></a></div><a  onclick='sumar_car("+codigo2+" , "+descripcion2+");' style=' text-align:center;border-radius: 50px; cursor: pointer; border: 1px ; width: 10px; height:40px; font-size: 2em;'><i class='fa-solid fa-plus'></i></a></td><td style='text-align:center;'><table><tr><td> <span class='' style='font-size: 16px; text-align:left;'>Precio:<br/> $"+precio1+" X </span><span class='' style='font-size: 16px; text-align:left;'>"+cant1+"</span></td></tr><tr><td  class='p-2'  align='center'><span class='' style='font-size: 16px; text-align:left;'>Subtotal: <br/>$"+subtotal1+"</span></td></tr><tr><td class='p-3' align='right;' style='width:100%'><a  onclick='eliminar_mostrar("+codigo2+");'><span class='' style='cursor: pointer; font-size: 18px; ' >Eliminar</span></a></td></tr></table></td></tr></table></div>";*/
    })
      
      total_monto=new Intl.NumberFormat().format(total);
        
   
        
   
     valores+="</ul>";
     
      document.getElementById("total_ticket").innerHTML=total_monto;
	  document.getElementById("muestra").innerHTML=valores;

     //document.getElementById("monto_total").innerHTML="| " + "$"+total_monto;
    

}

 function mensaje_add_car(descripcion, id , operacion, cant){
	
	let valores ="";
	
	valores +="<div class='alert alert-primary' role='alert'>Se ha "+operacion+" "+cant+" "+descripcion+" al carrito de compra </div>";
	document.getElementById("container_success").innerHTML=valores;
	setTimeout(function(){ document.getElementById("container_success").innerHTML=""; }, 3000);
	
	
	}


	function cargar_arreglo_car() {
	//const  arreglo_cliente=JSON.parse(localStorage.getItem('cliente')); 
	const  arreglo_usuario=JSON.parse(localStorage.getItem('usuario')); 
	if (localStorage.getItem("ticket") != null) { 
	   
	
	const  arreglo_car=JSON.parse(localStorage.getItem('ticket'));  
		
	  
	const total_pedido =arreglo_car.productos.reduce((total, item)=>total + parseInt(item.precio * item.cant), 0);   
	
	imprimir_carrito(arreglo_car,  total_pedido);
	}else{
	    
	imprimir_carro_vacio();
	}
	}
	

    function cargar_carro(id, descripcion, precio, foto, operacion, tags, existencia) {
          precio = parseFloat(precio.toFixed(2)); // Limita "precio" a 2 decimales
          tags = parseFloat(tags.toFixed(2)); // Limita "tags" a 2 decimales

        
        if (operacion=='Agregado_ppl') {    	
        var cant = new Number($('#cantidades_producto').html());
        
        operacion="Agregado ";
        }else{
         if (operacion=='Agregado') {
            var cant =1;
         }else{ 
            var cant =-1;
         }  
     
        }
	
	
	   const arreglo_car=JSON.parse(localStorage.getItem('ticket'));  
		
	   
	   var estructura;
	
	   const carrito = Object.create(prototipoCarrito);
	  
	  
		if (!arreglo_car) {
			
		   const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags,
			   existencia
			 };
	
		   
		   carrito.agregarProducto(producto);
			//var estructura =  id+ ";" +  descripcion+ ";" +  precio+ ";" +  cant + ";" +foto;  
	   }else{
			  const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags,
			   existencia
			 };
	
				 let cantidad=0;
				 let indice;
			   let encontrado=false;
			   arreglo_car.productos.forEach((datos, index)=>{
					   if (datos.id==id) {
						
						 cantidad= datos.cant;
						 indice=index;
						 encontrado=true;
					   }
				   
			   })
			   
	
				if (encontrado) {
					 
					 arreglo_car.productos[indice].cant=parseInt(cant) + parseInt(cantidad);
					 
					 
	
				}else{
					//carrito.agregarProducto(producto);
	
					arreglo_car.productos.push(producto);
				}	
			 
				 arreglo_car.productos.forEach((datos)=>{
				 carrito.agregarProducto(datos);
	
			    })	
	
			
	
	
			
			
	
			
		   }
		   //console.log(arreglo_car);
		  localStorage.setItem('ticket', JSON.stringify(carrito)); 
		  cargar_arreglo_car() ; 
	
		  mensaje_add_car(descripcion, id , operacion, cant);
	  
	}
 
 
 
  function cargar_me_gusta( id, descripcion, precio,  foto, operacion, tags, existencia) {
        if (operacion=='Agregado_ppl') {    	
        var cant = 1;
        
        operacion="Agregado ";
        }else{
         if (operacion=='Agregado') {
            var cant =1;
         }else{ 
            var cant =-1;
         }  
     
        }
	
	
	   const arreglo_car=JSON.parse(localStorage.getItem('me_gusta'));  
		
	   
	   var estructura;
	
	   const me_gusta = Object.create(prototipomegusta);
	  
	  
		if (!arreglo_car) {
			
		   const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags
			 };
	
		   
		   me_gusta.agregar_me_gusta(producto);
			//var estructura =  id+ ";" +  descripcion+ ";" +  precio+ ";" +  cant + ";" +foto;  
	   }else{
			  const producto={
			   id,
			   descripcion,
			   precio,
			   foto,
			   cant,
			   tags
			 };
	
				 let cantidad=0;
				 let indice;
			   let encontrado=false;
			   arreglo_car.productos.forEach((datos, index)=>{
					   if (datos.id==id) {
						
						 cantidad= datos.cant;
						 indice=index;
						 encontrado=true;
					   }
				   
			   })
			   
	
				if (encontrado) {
					 
					 arreglo_car.productos[indice].cant=parseInt(cant) + parseInt(cantidad);
					 
					 
	
				}else{
					//carrito.agregarProducto(producto);
	
					arreglo_car.productos.push(producto);
				}	
			 
				 arreglo_car.productos.forEach((datos)=>{
				 me_gusta.agregar_me_gusta(datos);
	
			    })	
	
			
	
	
			
			
	
			
		   }
		   console.log(arreglo_car);
		  localStorage.setItem('ticket', JSON.stringify('me_gusta')); 
		  
	
		  
	  
	}
	
	
 function imprimir_carrito_checkout(arreglo_car, total){
    
      var valores='';
  
        var cant_productos = 0;
         arreglo_car.productos.forEach((datos)=>{
        
    	 var codigo1 = datos.id;
    	 var codigo2 = '"'+codigo1+'"';
         var descripcion1 = datos.descripcion;
          var descripcion2 = '"'+descripcion1+'"';
         var precio1 = datos.precio;
         
         var cant1 = datos.cant;
         var foto1 = datos.foto;
         var subtotal1=precio1*cant1;
         precio1=new Intl.NumberFormat().format(datos.precio);
         subtotal1=new Intl.NumberFormat().format(subtotal1);
          
         valores+=`<div class="single_shop_cart d-flex align-items-center flex-wrap">
                            <div class="cart_img mb-4 mb-md-0">
                                <img loading="lazy" src='${foto1}'  alt="product">
                            </div>
                            <div class="cart_cont">
                                <a href="product-view.html">
                                    <h5>${descripcion1}</h5>
                                </a>
                                <p class="price">${precio1}</p>
                               
                            </div>
                            <div class="cart_qnty d-flex align-items-center ms-md-auto">
                                <div class="cart_qnty_btn">
                                    <i class="las la-minus"></i>
                                </div>
                                <div class="cart_count">${cant1}</div>
                                <div class="cart_qnty_btn">
                                    <i class="las la-plus"></i>
                                </div>
                            </div>
                            <div class="cart_price ms-auto">
                                <p>${subtotal1}</p>
                            </div>
                            <div class="cart_remove ms-auto">
                                 <i class="icon-trash"></i>
                            </div>
                        </div>`
          
          
          
        /*valores+="<li class='list-group-item d-flex justify-content-between lh-sm'><div><h6 class='my-0'>Producto:</h6><small class='text-muted'>"+descripcion1+"</small></div><span class='text-muted'>"+precio1+"X"+cant1+"</span></br><span class='text-muted'>Subtotal $"+subtotal1+"</span></li>"; */
    	
        cant_productos++;
    })
    
      total_monto=new Intl.NumberFormat().format(total);
        
   
        
   
    
      
      
    //  document.getElementById("cant_productos").innerHTML=cant_productos;
    //  document.getElementById("total_productos").innerHTML=total_monto;
      
     
	  document.getElementById("lista_productos").innerHTML=valores;
       document.getElementById("casilla_monto").innerHTML="$"+total_monto;  
      // document.getElementById("variablexValor").value=suma;
     document.getElementById("monto_total").innerHTML="$"+total_monto;
    

}

async function actualizar_precios2(){
      	const  arreglo_ticket=JSON.parse(localStorage.getItem('ticket')); 
	    const arreglo_producto = arreglo_ticket.productos;


   	
    
     try {
       
      const url ='https://www.iventas.net/consmo/ajaxconsultarinventario.php?usuario=sistemas&password=2022is';
    
      const response = await axios.get(url);  
      if(response.data.productos){  
      
         
                arreglo_ticket.productos.forEach((item) => {
                   
                     let idpro_carrito=item.id;
                     
                      response.data.productos.forEach(producto => {
                      let idpro=producto.idpro;
                      let codigo =producto.idpro;
                      let tags=producto.tags;
                       if(idpro===idpro_carrito){
                         //let total_precio= new Intl.NumberFormat().format(precio);  
                         let precio;
                         let primera_letra = codigo[0]; 
                       
                         if (primera_letra==="C"){    
                            if(tags==="F"){
                                  precio=producto.lp3neto;
                            }else if(tags==="R"){
                                  precio=producto.lp3;
                            }    
                         }else{
                             if(tags==="F"){
                                  precio=producto.lp1neto;
                            }else if(tags==="R"){
                                  precio=producto.lp1;
                            }
                             
                         } 
                         let total_precio= precio;
                       
                          
                          //reamos un nuevo carrito para sustituir
                        
                          item.precio=total_precio
                           //item.cant=2;
                           
                           
                           
                       }
                      
                       
                     
        
    		    	});
                });	
               console.log(arreglo_ticket);
               localStorage.setItem('ticket', JSON.stringify(arreglo_ticket)); 
               
 
      
    }
        const  arreglo_car=JSON.parse(localStorage.getItem('ticket'));  
    	const total_pedido =arreglo_car.productos.reduce((total, item)=>total + parseInt(item.precio * item.cant), 0); 
    	imprimir_carrito_checkout(arreglo_car,  total_pedido);
         
     } catch (error) {
         
         
    console.error(error);
  }
}   