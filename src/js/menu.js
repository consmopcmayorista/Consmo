/***** menu principal pagina web*/


    let menu="";
    menu+=`<nav class="menu" id="menu">
    <div class="contenedor contenedor-botones-menu d-block d-sm-block d-md-none">
			<button id="btn-menu-barras" class="btn-menu-barras"><i class="fas fa-bars"></i></button>
			<button id="btn-menu-cerrar" class="btn-menu-cerrar"><i class="fas fa-times"></i></button>
		</div>

		<div class="contenedor contenedor-enlaces-nav d-block d-sm-block d-md-none">
			<div class="btn-departamentos" id="btn-departamentos">
				<p>Todos los <span>Departamentos</span></p>
				<i class="fas fa-caret-down"></i>
			</div>
 
			<div class="enlaces">
				<a href="#">Cuenta</a>
				<a href="#">Promociones</a>
				<a href="#">Mesa de Regalos</a>
				<a href="#">Ayuda</a>
			</div>
		</div>
    
    <div class="left dflex d-none d-sm-none d-md-block">
      <a href="#"><h1 class="mb-4 display-5 bg-light font-weight-semi-bold"><img :src=logo></h1></a>

    </div>
    <div class="searchBox dflex bg-secondary d-none d-sm-none d-md-block">
      <div class="box">
        <div class="dflex">
          
          <input type="text" />
          <button type="submit" class="search">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="right dflex" >
      
      <div class="item d-none d-sm-none d-md-block">
        <p>Hello,</p>
        <h5>Tu Cuenta <i class="fa fa-sort-desc"></i></h5>
      </div>
      <div class="item d-none d-sm-none d-md-block">
        <p>Ordens</p>
        <h5>& Comrpras</h5>
      </div>
      <div class="item"><i class="fa fa-shopping-cart fa-2x"></i>Cart</div>
    </div>
  </nav>
  <nav class="subnavigation bg-secondary d-none d-sm-none d-md-block">
    <ul class="submenu">
      <a href="#"><i class="fa fa-bars"></i>
        <li>Categorias</li>
      </a>
      <a href="#">
        <li>Tienda</li>
      </a>
      <a href="#">
        <li>Conocenos</li>
      </a>
     
      <a href="#">
        <li>Contactanos</li>
      </a>
      <a href="#">
        <li>Blogs</li>
      </a>
     
      <a href="#">
        <li>Redes Sociales</li>
      </a>
      <a href="#">
        <li>Novedades</li>
      </a>
      <a href="#">
        <li>Oportunidades</li>
      </a>
      <a href="#">
        <li class="li">Puedes comprarlo tambien por Mercadolibre</li>
        <img src="img/mercadolibre.png">
      </a>
    </ul>
    
  </nav>
 
  `;
   
  

    export {menu};


