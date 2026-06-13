<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$data = json_decode(file_get_contents('php://input'), true);
$idChat = (int)$data['id_chat'];
$idUsuario = usuarioId();               
mysqli_query($conexion, "
    UPDATE mensaje SET leido = 1
    WHERE id_chat = $idChat
    AND id_usuario != $idUsuario
    AND leido = 0
");
echo json_encode(['success' => true]);