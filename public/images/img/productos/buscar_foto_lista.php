<?php
header("Access-Control-Allow-Origin: *");

// Escanea el directorio 'ppl' y obtiene la lista de archivos
$arrFiles = scandir('ppl');

$urls = array(); // Crear un array para almacenar las URLs

foreach ($arrFiles as $fileItem) {
    $url = $fileItem;
    $urls[] = $url; // Agregar la URL al array
}

// Convertir el array de URLs a formato JSON
$jsonData = json_encode($urls);

// Guardar los datos JSON en un archivo de texto
file_put_contents('urls.json', $jsonData);


echo json_encode($arrFiles);
?>