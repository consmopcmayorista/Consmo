<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
  // include_once 'api_clientes_w.php';
   $url=array();
 //$informacion=$_FILES;
  $nom_productos=$_POST['ref_producto'];
     
     
     // Count total files
    $countfiles = count($_FILES['files']['name']);


    $count = 0;
    for($i=0;$i < $countfiles;$i++){

       // File name
       $filename = $_FILES['files']['name'][$i];
        
       // File path
       $path = $upload_location.$filename;

       // file extension
       $file_extension = pathinfo($path, PATHINFO_EXTENSION);
       $file_extension = strtolower($file_extension);
         $file_ext = pathinfo($filename,PATHINFO_EXTENSION);
       // Valid file extensions
       $valid_ext = array("jpg","png","jpeg");

       // Check extension
       if(in_array($file_extension,$valid_ext)){
        $name=$nom_productos."-".$i.".".$file_ext;
          $path="img/productos/"; 
         $fecha=time();
          array_push($url, "https://consmopcmayorista.com/images/img/productos/multiplex/".$name."?v=". $fecha);
          // Upload file
            
          move_uploaded_file($_FILES['files']['tmp_name'][$i], $path.$name);
            
        }
        

    } 

    
    $respuesta="ok";

 echo json_encode(array($uploadedFiles, $url, $respuesta));
    //$api = new ApiProductos();
    //$dominio = $_GET['dominio'];
    
   
     //echo $dominio;
   //$api->getAll_pos($dominio);
        
   
?>