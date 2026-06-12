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
$conexion = require __DIR__ . '/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$idChat = (int)$data['id_chat'];
$idUsuario = (int)$data['id_usuario'];
mysqli_query($conexion, "
    UPDATE mensaje SET leido = 1
    WHERE id_chat = $idChat
    AND id_usuario != $idUsuario
    AND leido = 0
");
echo json_encode(['success' => true]);