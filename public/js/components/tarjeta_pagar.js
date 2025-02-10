Vue.component('tarjeta_pagar',{
 
 template:
 `<div >
          
          
        
</div>`,
 
 data(){
   
   return{
       
      
   }   
 },
   mounted () {
       
    // Crea el elemento <script> del widget de Wompi
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', 'pub_test_MFEbXB2SZThygGSFm8ijWxplFT3MMwA3');
    script.setAttribute('data-currency', 'COP');
    script.setAttribute('data-reference', this.reference);
     script.setAttribute('data-amount-in-cents', '7890000');
    // Agrega otros atributos y configuraciones del widget según tus necesidades

    // Agrega el script del widget al contenedor
    document.getElementById('wompi-widget').appendChild(script);
      
    
       
   },
   
 props:['reference'],
   
  methods:{
      
       onCompleteTransaction() {
      // Aquí puedes realizar cualquier acción necesaria después de completar la transacción
      console.log('La transacción se ha completado');
      console.log('Realizar acciones adicionales aquí');
    },
     /* cargar_clientes(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  municipio, departamento, direccion, email, tipo_precio, telefono1  ){
         this.select_cliente(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  municipio, departamento, direccion, email, tipo_precio, telefono1  );
         
         
     },
     
     cargar_clientes_inicio(){
           
           var arreglo=JSON.parse(localStorage.getItem('cliente')); 
           
           if(arreglo){
           
           this.select_cliente_pendiente(arreglo.id, arreglo.tipo_persona, arreglo.nombre, arreglo.tipo_documento, arreglo.rut_cedula, arreglo.municipio, arreglo.departamento, arreglo.direccion,arreglo.email, arreglo.tipo_precio, arreglo.telefono1)
           
             //this.$refs.actualizar_precio.load() 
           }
       },
      
      
      select_cliente_pendiente(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  municipio, departamento, direccion, email, tipo_precio, telefono1  ){
                let arreglo=[]
               //  this.info_cliente=arreglo.push(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  minicipio, departamento, direccion, email, tipo_precio, telefono1 );
               
                let salida ="";
                salida+='<span class="d-block">Documento: '+rut_cedula+'</span><p class="d-block">Nombre: '+nombre+'</p><p class="d-block">Direccion: '+direccion+'</p><span class="d-block">'+municipio+'- '+departamento+'</span><span class="d-block">Telefono: '+telefono1+'</span>'
                ;
                
                    
                
                document.getElementById("datos_clientes").innerHTML= salida;
                
 
      },
      
           calcular_precio(){
            if(JSON.parse(localStorage.getItem('cliente'))){
             var arreglo=JSON.parse(localStorage.getItem('cliente'));  
             //this.cliente_id=arreglo.id
             this.nuevo_precio =arreglo.tipo_precio
            
            }
        }, 
        select_cliente(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  municipio, departamento, direccion, email, tipo_precio, telefono1 ){
                        let arreglo=[]
                       //  this.info_cliente=arreglo.push(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  minicipio, departamento, direccion, email, tipo_precio, telefono1 );
                       
                        let salida ="";
                        salida+='<span class="d-block">Documento: '+rut_cedula+'</span><p class="d-block">Nombre: '+nombre+'</p><p class="d-block">Direccion: '+direccion+'</p><span class="d-block">'+municipio+'- '+departamento+'</span><span class="d-block">Telefono: '+telefono1+'</span>'
                        ;
                        
                            
                        
                        document.getElementById("datos_clientes").innerHTML= salida;
                        
                        cargar_cliente(id, tipo_persona, nombre,  tipo_documento, rut_cedula,  municipio, departamento, direccion, email, tipo_precio, telefono1 );
                        
                         var modal = document.getElementById("myModal4");
                 
                         modal.style.display = "none";
                         this.calcular_precio();
        }*/
    }
    
})




