
let get=[]  
const app = new Vue({
    el: '#app',
    data(){
         
     
     
     return{
         datos_ticket:JSON.parse(localStorage.getItem('ticket')),
         
      
     }
     
    
    },
    mounted () {
       if(this.datos_ticket!== null){
           //this.buscar_matriz()
         console.log(this.datos_ticket)
         console.log('hola')
        }else{
            // window.location.href =('https://colcodec.com/catalogo_express/canales/pos/signup.html')
        }
     
                 
   
    },
    methods:{
        
    },
    computed:{
       
        
        },
          
    created() {
       
       
    }
    
    
    
    
    
})
