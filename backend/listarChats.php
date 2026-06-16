<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require "./db.php";
$id_usuario = usuarioId(); 
$query = $conexion->prepare("
    SELECT
        u.id,
        u.username,
        u.alias,
        u.img,
        MAX(m.fecha) AS ultima_fecha
    FROM usuario u
    JOIN chat c
        ON (u.id = c.id_usuario1 OR u.id = c.id_usuario2)
    JOIN mensaje m
        ON m.id_chat = c.id_chat
    WHERE u.id != ?
      AND (? = c.id_usuario1 OR ? = c.id_usuario2)
    GROUP BY u.id, u.username, u.alias, u.img
    ORDER BY MAX(m.fecha) DESC
");
$query->bind_param("iii", $id_usuario, $id_usuario, $id_usuario);
$query->execute();
$resultado = $query->get_result();
$users = [];
while ($row = $resultado->fetch_assoc()) {
    $users[] = $row;
}
echo json_encode($users);