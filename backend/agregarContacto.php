<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$id_usuario = usuarioId();              
$id_contacto = (int)($data['id_contacto'] ?? 0);
if (!$id_contacto) {
    echo json_encode(["error" => "Falta id_contacto"]);
    exit;
}
$stmt = $conexion->prepare("INSERT IGNORE INTO contactos (id_usuario, id_contacto) VALUES (?, ?)");
$stmt->bind_param("ii", $id_usuario, $id_contacto);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Contacto agregado"]);
} else {
    echo json_encode(["error" => "Error al agregar contacto: " . $conexion->error]);
}