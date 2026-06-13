<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$userId = usuarioId();                  
$result = mysqli_query($conexion, "
    SELECT m.id_usuario AS id_remitente, COUNT(*) AS no_leidos
    FROM mensaje m
    JOIN chat c ON m.id_chat = c.id_chat
    WHERE (c.id_usuario1 = $userId OR c.id_usuario2 = $userId)
    AND m.id_usuario != $userId
    AND m.leido = 0
    GROUP BY m.id_usuario
");
$unread = [];
while ($row = mysqli_fetch_assoc($result)) {
    $unread[(int)$row['id_remitente']] = (int)$row['no_leidos'];
}
echo json_encode($unread);