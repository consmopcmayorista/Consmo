<?php

require('fpdf/fpdf.php');
date_default_timezone_set('America/El_Salvador');
global $info_empresa ;
global $info_empresa2;
global $get;
global $nropedido;  

class PDF extends FPDF
{
function Header()
{
    
    
    $jsonData = $_POST['productos'];
    $info_empresa = json_decode($jsonData);
    //$info_empresa = json_decode($_POST['productos'], true);
    $nropedido=$_POST['referencia_pago'];
   
    
    
  

    
   // $nropedido=$info_empresa->reference;
    
  
   
    //$conex5=conectar();
    //$resultado5=$conex5->query($sql);
  



    $this->setY(12);
    $this->setX(10);
    
   // $this->Image('logo.png',25,5,33);
    
    $this->SetFont('Arial', 'B', 9);
   
    $this->Text(75, 15, utf8_decode('Consmo PC Mayorista SAS'));
    $this->Text(77, 21, utf8_decode('CALLE 48C Nº 65A-24 '));
    $this->Text(88,27, utf8_decode('Tel: +57 301 5681832'));
    $this->Text(78,33, utf8_decode('comprasweb@consmopcmayorista.com'));
    
    $this->Image('https://consmopcmayorista.com/assets/images/120x24.png',150,10,45);
    
    //información de # de factura
    $this->SetFont('Arial','B',7);   
    $this->Text(130,53, utf8_decode('Pedido N°:'));
    $this->SetFont('Arial','',7);  
    $this->Text(150,53, $nropedido);
      //información de # de factura
    $this->SetFont('Arial','B',7);   
    $this->Text(130,46, utf8_decode($info_empresa->cliente[0]->tip_doc_cliente .": ". $info_empresa->cliente[0]->rut_cliente));
    
    
    // Agregamos los datos del cliente
    $this->SetFont('Arial','B',7);    
    $this->Text(10,40, utf8_decode('Fecha:'));
    $this->SetFont('Arial','',7);    
    $this->Text(25,40, $info_empresa->fecha_fac);
    
     // Agregamos los datos de la factura
    $this->SetFont('Arial','B',7);    
    $this->Text(10,46, utf8_decode('Telefono:'));
    $this->SetFont('Arial','',7);    
    $this->Text(25,46,utf8_decode($info_empresa->cliente[0]->tel));
    
    // Agregamos los datos de la factura
    $this->SetFont('Arial','B',7);    
    $this->Text(10,52, utf8_decode('Forma Pago:'));
    $this->SetFont('Arial','',7);    
    $this->Text(25,52, "Pagado por Wompi");
    
    
    
    // Agregamos los datos de la factura
    $this->SetFont('Arial','B',7);    
    $this->Text(10,43, utf8_decode('Cliente:'));
    $this->SetFont('Arial','',7);    
    $this->Text(25,43, utf8_decode($info_empresa->cliente[0]->nombres) . utf8_decode($info_empresa->cliente[0]->apellidos));
    
    // Agregamos los datos de la factura
    $this->SetFont('Arial','B',7);    
    $this->Text(10,49, utf8_decode('Direccion:'));
    $this->SetFont('Arial','',7);    
    $this->Text(25,49, utf8_decode($info_empresa->cliente[0]->direccion) . utf8_decode($info_empresa->cliente[0]->ciudad));
    
   
    
    $this->Ln(70);
}

function Footer()
{
     $this->SetFont('helvetica', 'B', 8);
        $this->SetY(-15);
        $this->Cell(95,5,utf8_decode('Página ').$this->PageNo().' / {nb}',0,0,'L');
        $this->Cell(95,5,date('d/m/Y | g:i:a') ,00,1,'R');
        $this->Line(10,287,200,287);
        $this->Cell(0,5,utf8_decode("Desarrolado por colcodec © Todos los derechos reservados."),0,0,"C");
        
}


}


    $jsonData2 = $_POST['productos'];
    $info_empresa2 = json_decode($jsonData2);
 
 $get=$info_empresa2->productos;

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 20);
$pdf->SetTopMargin(15);
$pdf->SetLeftMargin(10);
$pdf->SetRightMargin(10);



$pdf->setY(60);$pdf->setX(135);
    $pdf->Ln();
// En esta parte estan los encabezados
    $pdf->SetFont('Arial','B',6);
    $pdf->Cell(15, 7, utf8_decode('Cod'),1,0,'C',0);
    $pdf->Cell(65, 7, utf8_decode('Descripcion'),1,0,'C',0);
    
    $pdf->Cell(15, 7, utf8_decode('Precio'),1,0,'C',0);
     $pdf->Cell(10, 7, utf8_decode('Iva'),1,0,'C',0);
     $pdf->Cell(15, 7, utf8_decode('Impuesto'),1,0,'C',0);
     $pdf->Cell(15, 7, utf8_decode('T Precio'),1,0,'C',0);
    $pdf->Cell(15, 7, utf8_decode('Cant'),1,0,'C',0);
    $pdf->Cell(15, 7, utf8_decode('Total'),1,1,'C',0);
   
    $pdf->SetFont('Arial','',5);

//Aqui inicia el for con todos los productos
   $sumacant=0; 
   $sumatotal=0;
   $valortexto4=0;
   $valortexto3=0;
  foreach ($get as $fila2) {
   
  
	//$fecha = fechaNormal($datos[$x]['codigo']);
	$codigo = $fila2->idpro;
    
	$detalle =substr($fila2->titulo, 0, 44);  
	$monto=$fila2->valor;
	$iva=$fila2->iva;
	$impuesto=$fila2->impuesto;
	$valortexto4=$valortexto4+$impuesto;
	$impuesto=number_format($impuesto,2, ",", ".");
	
	$precio=$fila2->precio;

	$valortexto1=number_format($monto,2, ",", ".");
    

	$cant = $fila2->cant;
	$sumacant=$sumacant+ $cant;
	$totalprecio = $cant * $precio;
	$valortexto2=number_format($totalprecio,2, ",", ".");
	$totalmonto = $totalprecio;
    $precio=number_format($precio,2, ",", ".");
	$sumatotal=$sumatotal +$totalmonto;
    $pdf->Cell(15, 7, utf8_decode($codigo),1,0,'L',0);
    $pdf->Cell(65, 7, utf8_decode($detalle),1,0,'L',0);
   
    $pdf->Cell(15, 7, utf8_decode($valortexto1),1,0,'R',0);
    $pdf->Cell(10, 7, utf8_decode($iva."%"),1,0,'R',0);
    $pdf->Cell(15, 7, utf8_decode($impuesto),1,0,'R',0);
    $pdf->Cell(15, 7, utf8_decode($precio),1,0,'R',0);
    $pdf->Cell(15, 7, utf8_decode($cant),1,0,'C',0);
    $pdf->Cell(15, 7, utf8_decode($valortexto2),1,1,'R',0);


 
 }

 



//// Apartir de aqui esta la tabla con los subtotales y totales

$pdf->Ln(10);
        $sub_total_fact=$sumatotal-$valortexto4;
         $sub_total_fact=number_format($sub_total_fact,2, ",", ".");
        $valortexto4=number_format($valortexto4,2, ",", ".");
        $valortexto3=number_format($sumatotal,2, ",", ".");
        $pdf->setX(95);
         $pdf->SetFont('Arial','B',6);
        $pdf->Cell(40,6,'Subtotal',1,0);
         $pdf->SetFont('Arial','',5);
        $pdf->Cell(15,6,$sub_total_fact,'1',1,'R');
        $pdf->setX(95);
         $pdf->SetFont('Arial','B',6);
        $pdf->Cell(40,6,'Descuento',1,0);
         $pdf->SetFont('Arial','',5);
        $pdf->Cell(15,6,'0','1',1,'R');
        $pdf->setX(95);
         $pdf->SetFont('Arial','B',6);
        $pdf->Cell(40,6,'Iva',1,0);
         $pdf->SetFont('Arial','',5);
        $pdf->Cell(15,6,$valortexto4,'1',1,'R');
        $pdf->setX(95);
         $pdf->SetFont('Arial','B',6);
        $pdf->Cell(40,6,'Total',1,0);
         $pdf->SetFont('Arial','',5);
        $pdf->Cell(15,6,$valortexto3,'1',1,'R');
 



$pdf->Output();
?>