<?php
header("Access-Control-Allow-Origin: *");
  // include_once 'api_clientes_w.php';
 
 //$informacion=$_FILES;
 
  //$informacion=$_FILES['name'][0];
     foreach($_FILES as $item){
         $name= "1.png";
         $tmp_name= $item['tmp_name'];
     }
    $path="img/logo/";
    move_uploaded_file($tmp_name, $path.$name);
 // $productos=array( $_post['formData']);
 $fecha=time();
 $url="https://consmopcmayorista.com/images/img/logo/1.png?v=". $fecha;
 
 echo json_encode(array($name, $url));
    //$api = new ApiProductos();
    //$dominio = $_GET['dominio'];
    
   
     //echo $dominio;
   //$api->getAll_pos($dominio);
        
   
?>