<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$conexion = require __DIR__ . '/db.php';
$data = json_decode(file_get_contents('php://input'), true);

$id_usuario = (int)($data['id_usuario'] ?? 0);
$id_contacto = (int)($data['id_contacto'] ?? 0);

if (!$id_usuario || !$id_contacto) {
    echo json_encode(["error" => "Faltan parámetros"]);
    exit;
}

$stmt = $conexion->prepare("DELETE FROM contactos WHERE id_usuario = ? AND id_contacto = ?");
$stmt->bind_param("ii", $id_usuario, $id_contacto);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Contacto eliminado"]);
} else {
    echo json_encode(["error" => "Error al eliminar contacto: " . $conexion->error]);
}