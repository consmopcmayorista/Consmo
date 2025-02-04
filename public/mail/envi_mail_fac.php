<?php

function enviar_email($nropedido,$nrofactura, $email){
$nrofactura=$nrofactura;
$nropedido=$nropedido;
$email=$email;

$to = $email;
$subject = "Tu pedido ha sido Aprobado y Facturado";
$body="";
$body .= "<h2>Estimado cliente te informamos que tu pedido: $nropedido, ha sido facturado con  el numero de factura : $nrofactura</h2></br>
		<p>Ya estamos gestionando el envio de tu mercancia</p></br>";

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