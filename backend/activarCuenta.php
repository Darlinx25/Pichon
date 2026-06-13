<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
$conexion = require "./db.php";
if (!isset($_GET['token'])) {
    echo json_encode(["error" => "Token no proporcionado"]);
    exit;
}

$token = $_GET['token'];
$query = $conexion->prepare("SELECT id FROM usuario WHERE token = ? AND activado = 0");
$query->bind_param("s", $token);
$query->execute();
$resultado = $query->get_result();
if ($usuario = $resultado->fetch_assoc()) {
    $update = $conexion->prepare("UPDATE usuario SET activado = 1 WHERE id = ?");
    $update->bind_param("i", $usuario['id']);
    if ($update->execute()) {
        echo json_encode(["success" => true, "message" => "Cuenta activada correctamente. Ya puedes iniciar sesión."]);
    } else {
        echo json_encode(["error" => "Error al activar la cuenta"]);
    }
} else {
    echo json_encode(["error" => "Token inválido o cuenta ya activada"]);
}