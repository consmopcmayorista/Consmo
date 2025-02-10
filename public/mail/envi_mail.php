<?php

function enviar_email_cliente($nropedido,$cliente, $usuario_email, $salida, $direccion, $telefono, $valortexto3, $nombre_usuario){
$cliente=$cliente;
$nropedido=$nropedido;

$to =  $usuario_email;

$subject = "Hola $nombre_usuario, Hemos Recibido tu Pedido, N°" .$nropedido;
$body.="<body width='100%' style='margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;'>
	<center style='width: 100%; background-color: #f1f1f1;'>
    <div style='display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;'>
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style='max-width: 600px; margin: 0 auto;' class='email-container'>
    	<!-- BEGIN BODY -->
      <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>
      	<tr>
          <td valign='top' class='' style='padding: 1em 2.5em; background-color: #fff;'>
          	<table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
          		<tr>
          			  <td width='100%' class='' style='text-align: center; background-color: #0b2684;  color: #fff; font-size: 12px;font-weight: 700; '>
			            <h1>Consmo PC Mayorista</h1>
			           
			          </td>
			          
			          
			          
          		</tr>
          		<tr>
          			<td width='100%' class='' style='text-align: center; background-color: #fff; color: #0b2684; font-size: 12px;font-weight: 700; '>
			            
			            <h1>Recibistes un pedido del Cliente:  ".$cliente->nombres."</h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
		 <tr>
          <td valign='middle' class=''>
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'  style=' background-color: #fff;'>
            	<tr>
            	
                <td valign='middle' width='90%' class='' >
                  <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'>
                    <tr>
                      <td class='' style='background-color: #fff; height: 260px; text-align: left; padding: 20px 30px;'>

				         <h3>Datos Del cliente:</h3>
				           <b>Nombres:</b><span>  $factura->cliente->nombres</span><br>
				          <b>direccion:</b><span> $nropedido</span><br>
				         <b>direccion:</b><span> fsfsdf</span><br>
				          <b>Telefono:</b><span> sdfsdfsd</span><br>
				              	
                      </td>
                    </tr>
                  </table>
                </td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
		      <td class=''>
		        <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'  style=' background-color: #fff;'>
		          <tr>
		            <td class=''>
		            	<div class='' style='text-align: center; padding: 0 30px;'>
		              	</br>
				        <h1>Observa tu Pedido</h1>
				        
		              	<div>
		              	<table  style='table-layout: fixed; ' role='presentation' border='0' cellpadding='1' cellspacing='1'><thead  class=''>
         			    <tr style='background-color: #A8BCCD;' >
              			<td style='border: 1px solid black; text-align: center;'>Codigo</td>
              			<td style='border: 1px solid black; text-align: center;'>Detalles</td>
                        <td style='border: 1px solid black; text-align: center;'>Tags</td>
              			<td style='border: 1px solid black; text-align: center;'>Precio</td>
	      		    	<td style='border: 1px solid black; text-align: center;'>Cantidad</td>
                        <td style='border: 1px solid black; text-align: center;'>SubTotal</td>
            		
            		
            		
            		</tr>";  
    		
 
//$body.=$salida; 
            		
$body.="<tr><td></td><td style='border: 1px solid black; text-align: left;'>Total Pedido</td><td></td><td></td><td></td><td style='border: 1px solid black; text-align: right;'>564654646</td></tr></thead></table>
					
		            	</div>
		            
		            	<table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
		            		 <p><a style='border-radius: 12px;background-color: #0b2684; border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none; display: inline-block;font-size: 16px;' href='https://www.consmopcmayorista.com/systems/reportesFPDF-main/pedidos.php?nropedido=$nropedido&cliente=$cliente' >Ver en PDF</a></p>
                      
                        </table>
                      </td>
               </tr>
	</tr>	  
	
	 
	 
      <!-- 1 Column Text + Button : END -->
      </table>
      </br></br></br>
      </br></br></br>
      <table align='center' role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>
        <tr>
        	<td valign='middle' style='background-color: #0b2684;' class='footer email-section'>
        		<table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style='margin: auto;'>
        			<tr>
        				<td width='100%' style='text-align: center;'>
        					<p style='font-size: 22px; margin-top: 0; color:#fff;'>Sede Suramericana:Calle 48c No. 65A - 24, Medellín - Colombia</p>
						<p style='font-size: 22px; margin-top: 0; color:#fff;'>Sede Minorista: Calle 54 #57-19, Medellín - Colombia</p>
        				</td>
        			</tr>
        			<tr>
        				<td width='100%' style='text-align: center;'>
        					
        				</td>
        			</tr>
        			<tr>
        				<td width='100%' style='text-align: center;'>
        				<ul class='' style='display: inline-block;margin-right: 10px; padding: 20px 0 0 0;'>
                		
                		<a href='https://web.facebook.com/consmopcmayorista1' style='display: inline-block;margin-right: 10px;'><img src='https://mlnii3l4milz.i.optimole.com/UoArEwM.Q2LE~e482/w:auto/h:auto/q:90/process:9710/id:12f31cbb2ff40acd3315c9ae291f035c/https://www.consmopcmayorista.com/facebook.png' alt='' style='width: 24px; max-width: 600px; height: 24px; display: block;'></a>
                		<a href='https://www.instagram.com/consmopcmayorista/' style='display: inline-block;margin-right: 10px;'><img src='https://mlnii3l4milz.i.optimole.com/UoArEwM.Q2LE~e482/w:auto/h:auto/q:90/process:9711/id:095904dbdea2882a8d2f75906aada4c2/https://www.consmopcmayorista.com/Instagram.png' alt='' style='width: 24px; max-width: 600px; height: 24px; display: block;'></a>
                	</ul>
        			</td>
        				<tr>	<td width='100%' style='text-align: center; font-size: 12px; margin-top: 0; color:#fff;'> <p>Diseñado por: Bernstein</p></td></tr>
        			</tr>
            </table>
        	</td>
        </tr>
      </table>

    </div>
  </center>
</body>";
              		


// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <mail_interno@consmopcmayorista.com>' . "\r\n";


mail($to,$subject,$body,$headers);

echo'<script type="text/javascript">
       alert("Pedido Enviado");
        </script>';
}     
?>