Vue.component('tarjeta_contacto',{
 
 template:
 `<div >
           <div class="footer_contact" v-for="(dato, index) of contacto">
                                    <h5>-{{dato.nom_sucursal}}</span></h5>
                                    
                                        <span class="icn"><i class="las la-map-marker-alt"></i></span>

                                        {{dato.contactanos_direccion}}
                                    </p>
                                    <p class="phn">
                                        <span class="icn"><i class="las la-phone"></i></span>
                                       {{dato.contactanos_numero_celular}}
                                    </p>
                                 
            </div>
          
          
</div>`,
 
 data(){
   
   return{
       
      
   }   
 },
   mounted () {
       
    // this.cargar_clientes_inicio()
      
       
       
   },
   
 props:['contacto'],
 
  methods:{
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




