<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; 

$info_factura=array();
$info_factura = json_decode($_POST['factura']);

$ref = $_POST['ref'];
$id_empresa = $_POST['id_empresa'];
$id_pedido = $_POST['id_pedido'];
$id_cliente = $_POST['id_cliente'];


$array_datos_cliente=array();
        
        foreach ($info_factura->cliente as $dato){
            
              array_push($array_datos_cliente, $dato);
            
}

        
$array_datos_cliente_envio=array();
        
foreach ($info_factura->info_cliente_envio as $dato){
            
              array_push($array_datos_cliente_envio, $dato);
            
   }

 $array_productos=array();
        
        foreach ($info_factura->productos as $dato){
            if($dato->idpro!==""){
              array_push($array_productos, $dato);
            }
        }
          
         

      
      $vendedor="Pagina Web";
      $cliente=$data3[1];
      $usuario=$data3[5];
       $telefono=$data3[3];
        $direccion=$data3[4].",".$data3[8].",".$data3[7];
   
      
      $id_usuario=$data3[0];
    

      

      date_default_timezone_set("America/Bogota");
      $fecha = new DateTime('NOW');
      $fecha1=$fecha->format('d-m-Y');
          
      $hora1 = $fecha->format('H:i:s');
     
     
     $sumador=0;  
     $valortexto3="";
     //*** registrar DETALLE  pedido
     

  
     foreach ($array_productos as $valor) {
           $monto= $valor ->valor;
           $cant=  $valor->cant;
           $iditem=$valor-> idpro;
           $detalle=$valor-> titulo;
           $iva=$valor-> iva;
           $impuesto=$valor-> impuesto;
           $impuesto =number_format($impuesto,2, ",", ".");
            $valor_p=$valor-> precio;
            $monto2=$valor-> precio;
            $valor_p =number_format($valor_p,2, ",", ".");
          // $tags=$valor-> tags;
           
           $valortexto =number_format($monto,2, ",", ".");
           $sub_total=$monto2* $cant;
           $valortexto2 =number_format($sub_total,2, ",", ".");
           $sumador=$sumador+ $sub_total;
           $valortexto3 =number_format($sumador,2, ",", ".");
           
            $salida.="<tr  style='font-size: 9px;'>
            <td  style='border: 1px solid black; text-align: center; ' >$iditem</td>
					            <td style='border: 1px solid black;' >$detalle</td>
					            
					            <td style='border: 1px solid black; text-align: right;' >$valortexto</td>
					             <td style='border: 1px solid black; text-align: right;' >$iva%</td>
					             <td style='border: 1px solid black; text-align: right;' >$impuesto</td>
					             <td style='border: 1px solid black; text-align: right;' >$valor_p</td>
					            
					            <td style='border: 1px solid black; text-align: center;' >$cant</td>
					            <td style='border: 1px solid black; text-align: right;' >$valortexto2</td>
					           
  
                            </tr>";
                            
                       
         
         
      
           
        }
    
 
    
    $nropedido=$ref;

$to =   $array_datos_cliente[0]->email;
$subject = "Hola " .$array_datos_cliente[0]->nombres.",  Recibimos tu Pedido de la pagina web, N°" .$nropedido;
$subject2 = "Hola, tiene una venta  de la pagina web, N°" .$nropedido .$array_datos_cliente[0]->nombres;
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
			            
			            <h1>Gracias por tu Pedido  ".$array_datos_cliente[0]->nombres."</h1>
			             <b>direccion:</b><span>". $array_datos_cliente[0]->direccion." </span></br>
				          <b>Telefono:</b><span>". $array_datos_cliente[0]->tel."</span></br>
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
				              	
				              		<p>Ver pedido en pdf   <a href='https://whatsapp-nube.com/reportesFPDF-main/factura_web.php?id_empresa=" . $id_empresa . "&id=" . $id_pedido . "&id_cliente=" . $id_cliente . "'>Aqui</a>.</p>
				              
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
         			    <tr style='background-color: #A8BCCD; font-size: 10px;' >
              			<td style='border: 1px solid black; text-align: center;'>Codigo</td>
              			<td style='border: 1px solid black; text-align: center;'>Detalles</td>
                        
              			<td style='border: 1px solid black; text-align: center;'>Precio</td>
              			<td style='border: 1px solid black; text-align: center;'>Iva</td>
              				<td style='border: 1px solid black; text-align: center;'>T. Iva</td>
              				<td style='border: 1px solid black; text-align: center;'>T. Precio</td>
	      		    	<td style='border: 1px solid black; text-align: center;'>Cantidad</td>
                        <td style='border: 1px solid black; text-align: center;'>SubTotal</td>
            		
            		
            		
            		</tr>";
   
    $body.=$salida;
       $body.="<tr><td></td><td style='border: 1px solid black; text-align: left; font-size: 8px;'>Total Pedido</td><td></td><td></td><td></td><td></td><td></td><td style='border: 1px solid black; text-align: right; font-size: 8px;'>$valortexto3</td></tr></thead></table>
					        	 <h3>Informacion de Envio Cliente Cliente:</h3>
				           
				       
				         <b>direccion:</b><span>". $array_datos_cliente_envio[0]->direccion." </span></br>
				          <b>Telefono:</b><span>". $array_datos_cliente_envio[0]->tel."</span></br>
				           <b>Recibe:</b><span>". $array_datos_cliente_envio[0]->nombres." ".$array_datos_cliente_envio[0]->apellidos."</span></br>
				              <b>Ciudad- Departamento:</b><span>". $array_datos_cliente_envio[0]->ciudad." - ".$array_datos_cliente_envio[0]->departamento."</span></br>
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
                                           <a href='consmopcmayorista.com'  style='font-size: 22px; margin-top: 0; color:#fff;'> Consmo PC Mayorista</a>
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


$mail = new PHPMailer(true);



     try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'send.one.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'comprasweb@consmopcmayorista.com'; // Cambia por tu correo
    $mail->Password = 'consmo2025'; // Cambia por tu contraseña o clave de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Configuración del correo
    $mail->setFrom('comprasweb@consmopcmayorista.com', 'Consmo PC Mayorista');
    $mail->addAddress($to, $cliente_nombre); // Destinatario
    $mail->addReplyTo('consmopcmayorista2017@gmail.com', 'Soporte');
    $mail->addCC('consmopcmayorista2017@gmail.com', 'Soporte');	
    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = "Confirmacion de Pedido Nro $nropedido";
    $mail->Body = $body;

    // Enviar el correo
    $mail->send();
    echo 'Correo enviado correctamente';
} catch (Exception $e) {
    echo "Error al enviar el correo: {$mail->ErrorInfo}";
}

?>


