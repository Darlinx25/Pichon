<?php
require __DIR__ . '/session.php';
header('Content-Type: application/json');
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$id1 = usuarioId();                     
$id2 = (int)$_GET['id_contacto'];       
$result = mysqli_query($conexion, "SELECT id_chat FROM chat 
    WHERE (id_usuario1 = $id1 AND id_usuario2 = $id2) 
       OR (id_usuario1 = $id2 AND id_usuario2 = $id1) LIMIT 1");
$row = mysqli_fetch_assoc($result);
$id_chat = $row ? (int)$row['id_chat'] : null;
if (!$id_chat) {
    mysqli_query($conexion, "INSERT INTO chat (id_usuario1, id_usuario2) VALUES ($id1, $id2)");
    $id_chat = (int)mysqli_insert_id($conexion);
}
$result = mysqli_query($conexion, "SELECT id_mensaje, id_usuario, contenido, fecha 
    FROM mensaje WHERE id_chat = $id_chat ORDER BY fecha ASC");
$messages = [];
while ($row = mysqli_fetch_assoc($result)) {
    $messages[] = [
        'id_mensaje' => (int)$row['id_mensaje'],
        'id_usuario' => (int)$row['id_usuario'],
        'contenido' => $row['contenido'],
        'fecha' => $row['fecha'],
    ];
}
echo json_encode(['id_chat' => $id_chat, 'messages' => $messages]);