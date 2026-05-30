<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}
$conexion = require "./db.php";
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];
$confirm  = $data["confirmPassword"];
$alias    = $data["alias"];
if ($password != $confirm) {
    echo json_encode(["error" => "Las contraseñas no coinciden"]);
    exit;
}
$sql = "SELECT id FROM usuario WHERE username = '$username'";
$resultado = mysqli_query($conexion, $sql);
if (mysqli_num_rows($resultado) > 0) {
    echo json_encode(["error" => "El username ya existe"]);
    exit;
}
$hash = password_hash($password, PASSWORD_BCRYPT);
$sql = "INSERT INTO usuario (username, password, alias) VALUES ('$username', '$hash', '$alias')";
if (mysqli_query($conexion, $sql)) {
    echo json_encode(["success" => true, "message" => "Usuario creado correctamente"]);
} else {
    echo json_encode(["error" => "Error al crear usuario"]);
}
?>