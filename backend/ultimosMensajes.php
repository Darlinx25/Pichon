<?php
require __DIR__ . '/session.php';
header('Content-Type: application/json');
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$id1 = usuarioId();

$result = mysqli_query($conexion, "
    SELECT u.id, u.alias, u.img,
        m.contenido as ultimo_contenido, 
        m.tipo as ultimo_tipo,
        m.fecha as ultima_fecha,
        m.id_usuario as id_usuario_ultimo
    FROM chat c
    JOIN usuario u ON u.id = CASE WHEN c.id_usuario1 = $id1 THEN c.id_usuario2 ELSE c.id_usuario1 END
    JOIN (
        SELECT id_chat, contenido, tipo, fecha, id_usuario
        FROM mensaje m1
        WHERE m1.id_mensaje = (
            SELECT MAX(m2.id_mensaje) FROM mensaje m2 WHERE m2.id_chat = m1.id_chat
        )
    ) m ON m.id_chat = c.id_chat
    WHERE c.id_usuario1 = $id1 OR c.id_usuario2 = $id1
    ORDER BY m.fecha DESC
");

$chats = [];
while ($row = mysqli_fetch_assoc($result)) {
    $chats[] = [
    'id'              => (int)$row['id'],
    'alias'           => $row['alias'],
    'img'             => $row['img'],
    'ultimo_contenido'=> $row['ultimo_contenido'],
    'ultimo_tipo'     => $row['ultimo_tipo'],
    'ultima_fecha'    => $row['ultima_fecha'],
    'id_usuario_ultimo'=> (int)$row['id_usuario_ultimo'],
    ];
}
echo json_encode($chats);

?>