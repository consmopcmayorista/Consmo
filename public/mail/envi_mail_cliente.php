<?php

function enviar_email_cliente($ref,$array_datos_cliente, $array_datos_cliente_envio, $salida, $valortexto3, $fecha1,$hora1){

$nropedido=$ref;

$to =   $array_datos_cliente->email;
$subject = "Hola" .$array_datos_cliente->nombres.", Hemos Recibido tu Pedido de la pagina web, N°" .$nropedido;
$body="";
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
			            <h1>Pedidos por Pagina web</h1>
			           
			          </td>
			          
			          
			          
          		</tr>
          		<tr>
          			<td width='100%' class='' style='text-align: center; background-color: #fff; color: #0b2684; font-size: 12px;font-weight: 700; '>
			            
			            <h1>Gracias por tu Pedido  $array_datos_cliente->nombres</h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign='middle' class=''>
            <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'>
            	<tr>
            	
                <td valign='middle' width='90%' class='primary'>
                  <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%'>
                    <tr>
                      <td class='' style='background-color: #fff; height: 260px; text-align: left; padding: 20px 30px;'>
				              	
				              	<p>El pedido <b>N° $nropedido</b>, que has realizado,  va a ser revisado por nuestro personal en la  brevedad posible, una vez chequeado, preparado y facturado, recibirás una notificacion via email, y tu vendedor de confianza te va  contactar.</p>
				              	 <h3>Ubicacion Cliente:</h3>
				           
				       
				         <b>direccion:</b><span> $array_datos_cliente->direccion </span></br>
				          <b>Telefono:</b><span> $array_datos_cliente->tel</span></br>
				              	
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
		        <table role='presentation' cellspacing='0' cellpadding='0' border='0' width='100%' style=' background-color: #fff;'>
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
                        
              			<td style='border: 1px solid black; text-align: center;'>Precio</td>
	      		    	<td style='border: 1px solid black; text-align: center;'>Cantidad</td>
                        <td style='border: 1px solid black; text-align: center;'>SubTotal</td>
            		
            		
            		
            		</tr>";
     

$body.=$salida;

/*<table role='presentation' border='0' cellpadding='0' cellspacing='0' width='100%'>
		            	  <p><a style='border-radius: 12px; background-color: #0b2684;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none; display: inline-block;font-size: 16px;' href='https://www.consmopcmayorista.com/systems/reportesFPDF-main/pedidos.php?nropedido=$nropedido&cliente=$cliente' >Ver en PDF</a></p>
                      
                        </table>*/
$body.="<tr><td></td><td style='border: 1px solid black; text-align: left;'>Total Pedido</td><td></td><td></td><td></td><td style='border: 1px solid black; text-align: right;'>$valortexto3</td></tr></thead></table>
					
		            	</div>
		            
		            	
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
        					<p style='font-size: 22px; margin-top: 0; color:#fff;'> Medellín - Colombia</p>
					
        				</td>
        			</tr>
        			<tr>
        				<td width='100%' style='text-align: center;'>
        					
        				</td>
        			</tr>
        			<tr>
        				<td width='100%' style='text-align: center;'>
        					<ul class='' style='display: inline-block;margin-right: 10px; padding: 20px 0 0 0;'>
                		
                		<a href='https://web.facebook.com' style='display: inline-block;margin-right: 10px;'><img src='' alt='' style='width: 24px; max-width: 600px; height: 24px; display: block;'></a>
                		<a href='https://www.instagram.com' style='display: inline-block;margin-right: 10px;'><img src='' alt='' style='width: 24px; max-width: 600px; height: 24px; display: block;'></a>
                	</ul>
        				</td>
        					<tr>	<td width='100%' style='text-align: center; font-size: 12px; margin-top: 0; color:#fff;'> <p>Diseñado por: colcodec</p></td></tr>
        			</tr>
            </table>
        	</td>
        </tr>
      </table>

    </div>
  </center>
</body>";

/*
$message = "
<html>
<head>
<title>Cliente Haciendo Contacto </title>
</head>
<body>

<table>
<tr>
<th>Email del Cliente:</th>
<th>$email</th>
</tr>
<tr>
<th>Telefono del Cliente:</th>
<th>$tele</th>

</tr>
<tr>
<th>Nombre del Cliente:</th>
<th>$nombre</th>

</tr>

<tr>
<th>Mensaje del Cliente:</th>
<th>$mensaje</th>

</tr>

</table>
</body>
</html>
";*/

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <mail_interno@consmopcmayorista.com>' . "\r\n";


mail($to,$subject,$body,$headers);


 }        
?>