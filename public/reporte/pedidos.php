<?php
require('fpdf/fpdf.php');
date_default_timezone_set('America/El_Salvador');

// Definimos la clase PDF que extiende de FPDF
class PDF extends FPDF {
    // Encabezado de página
    function Header() {
        // Recuperamos los datos enviados en POST
        $jsonData = isset($_POST['productos']) ? $_POST['productos'] : '';
        $info = json_decode($jsonData);
        $nropedido = isset($_POST['referencia_pago']) ? $_POST['referencia_pago'] : '---';

        // Configuración de posición y fuente
        $this->setY(12);
        $this->setX(10);
        $this->SetFont('Arial', 'B', 9);
        
        // Título e información de la empresa
        $this->Text(75, 15, utf8_decode('Consmo PC Mayorista SAS'));
        $this->Text(77, 21, utf8_decode('CALLE 48C Nº 65A-24'));
        $this->Text(88, 27, utf8_decode('Tel: +57 301 5681832'));
        $this->Text(78, 33, utf8_decode('comprasweb@consmopcmayorista.com'));
        $this->Image('https://consmopcmayorista.com/assets/images/120x24.png',150,10,45);
        
        // Mostrar el número de pedido
        $this->SetFont('Arial','B',7);   
        $this->Text(130,53, utf8_decode('Pedido N°:'));
        $this->SetFont('Arial','',7);  
        $this->Text(150,53, $nropedido);
        
        // Si existe información del cliente, mostrarla
        if(isset($info->cliente[0])){
            $cliente = $info->cliente[0];
            $this->SetFont('Arial','B',7);
            $this->Text(130,46, utf8_decode($cliente->tip_doc_cliente . ": " . $cliente->rut_cliente));
            $this->SetFont('Arial','B',7);    
            $this->Text(10,40, utf8_decode('Fecha:'));
            $this->SetFont('Arial','',7);    
            $this->Text(25,40, $info->fecha_fac);
            $this->SetFont('Arial','B',7);    
            $this->Text(10,43, utf8_decode('Cliente:'));
            $this->SetFont('Arial','',7);    
            $this->Text(25,43, utf8_decode($cliente->nombres . " " . $cliente->apellidos));
            $this->SetFont('Arial','B',7);    
            $this->Text(10,46, utf8_decode('Telefono:'));
            $this->SetFont('Arial','',7);    
            $this->Text(25,46, utf8_decode($cliente->tel));
            $this->SetFont('Arial','B',7);    
            $this->Text(10,49, utf8_decode('Direccion:'));
            $this->SetFont('Arial','',7);    
            $this->Text(25,49, utf8_decode($cliente->direccion . " " . $cliente->ciudad));
        }
        
        $this->Ln(70);
    }
    
    // Pie de página
    function Footer() {
        $this->SetFont('Helvetica','B',8);
        $this->SetY(-15);
        $this->Cell(95,5, utf8_decode('Página ').$this->PageNo().' / {nb}',0,0,'L');
        $this->Cell(95,5, date('d/m/Y | g:i:a'), 0,1,'R');
        $this->Line(10,287,200,287);
        $this->Cell(0,5, utf8_decode("Desarrolado por colcodec © Todos los derechos reservados."),0,0,"C");
    }
}

// Recuperar la información enviada desde el front end
$jsonData = isset($_POST['productos']) ? $_POST['productos'] : '';
$info = json_decode($jsonData);
if(!$info || !isset($info->productos)){
    die("No se encontraron datos de productos.");
}
$productos = $info->productos;

// Crear el objeto PDF
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 20);
$pdf->SetMargins(10,15,10);

// Encabezados de la tabla
$pdf->setY(60);
$pdf->setX(135);
$pdf->Ln();
$pdf->SetFont('Arial','B',6);
$pdf->Cell(15, 7, utf8_decode('Cod'), 1, 0, 'C');
$pdf->Cell(65, 7, utf8_decode('Descripcion'), 1, 0, 'C');
$pdf->Cell(15, 7, utf8_decode('Precio'), 1, 0, 'C');
$pdf->Cell(10, 7, utf8_decode('Iva'), 1, 0, 'C');
$pdf->Cell(15, 7, utf8_decode('Impuesto'), 1, 0, 'C');
$pdf->Cell(15, 7, utf8_decode('T Precio'), 1, 0, 'C');
$pdf->Cell(15, 7, utf8_decode('Cant'), 1, 0, 'C');
$pdf->Cell(15, 7, utf8_decode('Total'), 1, 1, 'C');
$pdf->SetFont('Arial','',5);

// Variables para acumular totales
$sumacant = 0; 
$sumatotal = 0;
$valortexto4 = 0;  // total de impuesto
$valortexto3 = 0;  // total de la suma

foreach ($productos as $fila) {
    $codigo = $fila->idpro;
    $detalle = substr($fila->titulo, 0, 44);  
    $monto = $fila->valor;
    $iva = $fila->iva;
    $impuesto = $fila->impuesto;
    $valortexto4 += $impuesto;
    $impuestoF = number_format($impuesto, 2, ",", ".");
    $precio = $fila->precio;
    $valortexto1 = number_format($monto, 2, ",", ".");
    $cant = $fila->cant;
    $sumacant += $cant;
    $totalprecio = $cant * $precio;
    $valortexto2 = number_format($totalprecio, 2, ",", ".");
    $totalmonto = $totalprecio;
    $precioF = number_format($precio, 2, ",", ".");
    $sumatotal += $totalmonto;
    
    $pdf->Cell(15, 7, utf8_decode($codigo), 1, 0, 'L');
    $pdf->Cell(65, 7, utf8_decode($detalle), 1, 0, 'L');
    $pdf->Cell(15, 7, utf8_decode($valortexto1), 1, 0, 'R');
    $pdf->Cell(10, 7, utf8_decode($iva."%"), 1, 0, 'R');
    $pdf->Cell(15, 7, utf8_decode($impuestoF), 1, 0, 'R');
    $pdf->Cell(15, 7, utf8_decode($precioF), 1, 0, 'R');
    $pdf->Cell(15, 7, utf8_decode($cant), 1, 0, 'C');
    $pdf->Cell(15, 7, utf8_decode($valortexto2), 1, 1, 'R');
}

$pdf->Ln(10);
$sub_total_fact = $sumatotal - $valortexto4;
$sub_total_factF = number_format($sub_total_fact, 2, ",", ".");
$valortexto4F = number_format($valortexto4, 2, ",", ".");
$valortexto3F = number_format($sumatotal, 2, ",", ".");

// Dibujar la tabla de totales
$pdf->setX(95);
$pdf->SetFont('Arial','B',6);
$pdf->Cell(40, 6, 'Subtotal', 1, 0);
$pdf->SetFont('Arial','',5);
$pdf->Cell(15, 6, $sub_total_factF, 1, 1, 'R');
$pdf->setX(95);
$pdf->SetFont('Arial','B',6);
$pdf->Cell(40, 6, 'Descuento', 1, 0);
$pdf->SetFont('Arial','',5);
$pdf->Cell(15, 6, '0', 1, 1, 'R');
$pdf->setX(95);
$pdf->SetFont('Arial','B',6);
$pdf->Cell(40, 6, 'Iva', 1, 0);
$pdf->SetFont('Arial','',5);
$pdf->Cell(15, 6, $valortexto4F, 1, 1, 'R');
$pdf->setX(95);
$pdf->SetFont('Arial','B',6);
$pdf->Cell(40, 6, 'Total', 1, 0);
$pdf->SetFont('Arial','',5);
$pdf->Cell(15, 6, $valortexto3F, 1, 1, 'R');

// Generar el PDF y enviarlo al navegador
$pdf->Output();
?>
