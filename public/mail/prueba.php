<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php'; // Asegúrate de que este archivo exista si usas Composer

$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Servidor SMTP de Gmail
    $mail->SMTPAuth   = true;
    $mail->Username   = 'yormangsl@gmail.com'; // Tu dirección de correo de Gmail
    $mail->Password   = 'fkwtxxijxphtqqqb'; // Contraseña de aplicación de Gmail
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Cifrado TLS
    $mail->Port       = 587; // Puerto SMTP de Gmail

    // Configuración del correo
    $mail->setFrom('yormangsl@gmail.com', 'Tu Nombre o Empresa'); // Remitente
    $mail->addAddress('colcodec@gmail.com', 'Destinatario'); // Destinatario
    $mail->addReplyTo('yormangsl@gmail.com', 'Información'); // Dirección para responder

    // Contenido del correo
    $mail->isHTML(true); // Establecer formato HTML
    $mail->Subject = 'Prueba de correo con PHPMailer y SMTP';
    $mail->Body    = '<h1>Hola!</h1><p>Este es un correo enviado usando PHPMailer con Gmail.</p>';
    $mail->AltBody = 'Este es el mensaje en texto plano para clientes que no soportan HTML';

    // Enviar el correo
    $mail->send();
    echo 'Correo enviado correctamente';
} catch (Exception $e) {
    echo "Error al enviar el correo: {$mail->ErrorInfo}";
}
?>

