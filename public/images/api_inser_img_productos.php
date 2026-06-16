<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Api-Key");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$name = '';
$url = '';
$respuesta = 'error';

// Usamos ruta absoluta para evitar fallos de ubicación
$path = __DIR__ . "/img/productos/ppl/";

if (!file_exists($path)) {
    mkdir($path, 0777, true);
}

if (!empty($_FILES)) {
    $file_key = key($_FILES);
    if ($file_key !== null) {
        $item = $_FILES[$file_key];
        $filename = is_array($item['name']) ? $item['name'][0] : $item['name'];
        $tmp_name = is_array($item['tmp_name']) ? $item['tmp_name'][0] : $item['tmp_name'];
        
        $destination = $path . $filename;

        if (move_uploaded_file($tmp_name, $destination)) {
            $respuesta = 'ok';
            $name = $filename;
            // Retorna la URL pública correcta del servidor de imágenes
            $url = "https://consmopcmayorista.com/images/img/productos/ppl/" . $filename;
        } else {
            $error = error_get_last();
            $respuesta = 'error_mover_archivo: ' . ($error ? $error['message'] : 'Desconocido');
        }
    }
}

echo json_encode([
    "name" => $name,
    "url" => $url,
    "status" => $respuesta
]);
