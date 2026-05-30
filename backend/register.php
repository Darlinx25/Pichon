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

$stmt = mysqli_prepare($conexion, "SELECT id FROM usuario WHERE username = ?");
mysqli_stmt_bind_param($stmt, "s", $username);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);
if (mysqli_stmt_num_rows($stmt) > 0) {
    echo json_encode(["error" => "El username ya existe"]);
    exit;
}
mysqli_stmt_close($stmt);

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = mysqli_prepare($conexion, "INSERT INTO usuario (username, password, alias) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, "sss", $username, $hash, $alias);
if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Usuario creado correctamente"]);
} else {
    echo json_encode(["error" => "Error al crear usuario"]);
}
mysqli_stmt_close($stmt);

?>