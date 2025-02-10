<?php

$name =$_POST['name'];
$email =$_POST['email'];
$m_subject = $_POST['asunto'];
$message = strip_tags(htmlspecialchars($_POST['mensaje']));
$email_recibe="administracion@consmopcmayorista.com";


define('CLAVE', '6LeLlFooAAAAAGPH8sVP-0uca33CcrPiKNKaFneH');
	
	$token = $_POST['token'];
	$action = $_POST['action'];
	
	$cu = curl_init();
	curl_setopt($cu, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");
	curl_setopt($cu, CURLOPT_POST, 1);
	curl_setopt($cu, CURLOPT_POSTFIELDS, http_build_query(array('secret' => CLAVE, 'response' => $token)));
	curl_setopt($cu, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($cu);
	curl_close($cu);
	
	$datos = json_decode($response, true);





// título


//aleatoria
$codigo = rand(1000,9999);

// mensaje
$body = '
<html>
<head>
    <meta charset="UTF8" />
  <title>Solicitud de Informacion Cliente</title>
</head>
<body>
  <p>Un nuevo Cliente ha Solicitado Informacion!!!</p>
  <p>Aqui toda la inormacion que ha sido enviada</p> <br/>
<h2> Nombre del Cliente es: </h2><h3>'.$name.'</h3> <br/>
 <h2> Su email es: </h2> <h3>'.$email.'<h3> <br/>
<h2>Te ha enviado el siguiente mensaje:</h2> <br/><p> '.$message.'</p>
  
</body>
</html>
';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <mail_interno@consmopcmayorista.com>' . "\r\n";

if($datos['success'] === true && $datos['score'] >= 0.5){	


mail($email_recibe,$m_subject,$body,$headers);
$enviado=true;

  echo "<script type='text/javascript'>
				alert('Email enviado satisfactoriamente. Recibiras respuesta lo antes posible'); window.location.href = '../contact-us.html';
						

			    </script>";
}else{
   echo "<script type=\"text/javascript\">
    alert('El mensaje no ha podido enviarse. Por favor intente nuevamente más tarde.');
    window.location.href = '../contact-us.html';
   </script>"; 
}
?>