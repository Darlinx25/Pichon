<?php
$servidor = "127.0.0.1";
$puerto = 3307;
$usuario = "pichon_user";
$contrasena = "pichon_pass";
$base_datos = "pichon_db";
$conexion = mysqli_connect($servidor, $usuario, $contrasena, $base_datos, $puerto);
if (!$conexion) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . mysqli_connect_error()]);
    exit;
}
return $conexion;
?>