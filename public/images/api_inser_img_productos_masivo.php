<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
$upload_location = '/var/www/html/images/img/productos/ppl/'; // Ruta donde se guardarán los archivos

// Inicializa un arreglo vacío para las URL de los archivos subidos
$url = array();

// Obtiene el número de archivos en la solicitud
$countfiles = count($_FILES['file']['name']);



// Recorre los archivos
for ($i = 0; $i < $countfiles; $i++) {
    // Nombre del archivo original
    $filename = $_FILES['file']['name'][$i];

    // Ruta donde se guardará el archivo
    $path = $upload_location . $filename;

    // Extensión del archivo
    $file_extension = pathinfo($filename, PATHINFO_EXTENSION);
    $file_extension = strtolower($file_extension);

    // Extensiones de archivo válidas
    $valid_ext = array("JPG","jpg", "jpeg", "png", "PNG", "gif", "GIF");

    // Verifica si la extensión del archivo es válida
    if (in_array($file_extension, $valid_ext)) {
        $name = $nom_productos . "-" . $i . "." . $file_extension;

        // Mueve el archivo a la ubicación de destino
        move_uploaded_file($_FILES['file']['tmp_name'][$i], $upload_location . $filename);

        // Genera la URL del archivo subido
        $fecha = time();
        $url[] = "https://consmopcmayorista.com/images/img/productos/ppl/" . $filename;
    }
}

$respuesta = "ok";

// Devuelve una respuesta JSON que incluye las URLs de los archivos subidos
echo json_encode(array($url, $respuesta));
?>
