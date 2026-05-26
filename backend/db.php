<?php
$servidor = "127.0.0.1";
$usuario = "pichon_user";
$contrasena = "pichon_pass";
$base_datos = "pichon_db";


$conexion = mysqli_connect($servidor, $usuario, $contrasena, $base_datos);

if (!$conexion) {
    echo "Error crítico de conexión: " . mysqli_connect_error();
}
if($conexion){
    echo "ANduvo ";
}

$sql = "SELECT * FROM usuario";
$resultado = mysqli_query($conexion, $sql);
$filas = mysqli_fetch_all($resultado, MYSQLI_ASSOC);
mysqli_close($conexion);

echo "<pre>";
print_r($filas);
echo "</pre>";


?>