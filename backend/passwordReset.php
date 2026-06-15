<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
$conexion = require "./db.php";

$password = $_POST["password"];
$confirm  = $_POST["confirmPassword"];
if ($password != $confirm) {
    echo json_encode(["error" => "Las contraseñas no coinciden."]);
    exit;
}
$token = $_POST["token"];
$query = $conexion->prepare("SELECT id FROM usuario WHERE token = ? AND activado = 1");
$query->bind_param("s", $token);
$query->execute();
$resultado = $query->get_result();
if ($usuario = $resultado->fetch_assoc()) {
    $hash = password_hash($password, PASSWORD_BCRYPT);
    $update = $conexion->prepare("UPDATE usuario SET password = ? WHERE id = ?");
    $update->bind_param("si", $hash, $usuario['id']);
    if ($update->execute()) {
        echo json_encode(["success" => true, "message" => "Cambio de contraseña exitoso."]);
    } else {
        echo json_encode(["error" => "Error al cambiar contraseña."]);
    }
} else {
    echo json_encode(["error" => "Token inválido."]);
}