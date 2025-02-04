<?php
header("Access-Control-Allow-Origin: *");

// Asegúrate de que el archivo ha sido enviado correctamente
if (!empty($_FILES) && isset($_FILES['file'])) {
    $file = $_FILES['file']; // Accede al archivo enviado

    // Verifica si el archivo tiene un nombre
    if (isset($file['name']) && !empty($file['name'])) {
        $nom_banner = $_POST['nom_banner'] ?? 'banner'; // Usa un nombre predeterminado si no se envía

        $file_ext = pathinfo($file['name'], PATHINFO_EXTENSION); // Obtén la extensión del archivo
        $name = $nom_banner . "." . $file_ext; // Genera el nombre completo del archivo
        $tmp_name = $file['tmp_name']; // Archivo temporal

        $path = "/var/www/html/images/img/banner/";

        // Mueve el archivo al directorio final
        if (move_uploaded_file($tmp_name, $path . $name)) {
            $respuesta = "ok";
            $fecha = time();
            $url = "https://consmopcmayorista.com/images/img/banner/"  . $name . "?v=" . $fecha;

            // Devuelve la respuesta como JSON
            echo json_encode([$name, $url, $respuesta]);
        } else {
            // Error al mover el archivo
            echo json_encode(["error" => "No se pudo mover el archivo al directorio especificado."]);
        }
    } else {
        // Error: Archivo no válido
        echo json_encode(["error" => "No se encontró un archivo válido."]);
    }
} else {
    // Error: No se envió ningún archivo
    echo json_encode(["error" => "No se enviaron archivos en la solicitud."]);
}
?>
