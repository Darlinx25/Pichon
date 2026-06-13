<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require "./db.php";
$id_usuario = usuarioId();              
$query = $conexion->prepare(
    "SELECT u.id, u.username, u.alias, u.img FROM contactos c JOIN usuario u ON u.id = c.id_contacto WHERE c.id_usuario = ?"
);
$query->bind_param("i", $id_usuario);
$query->execute();
$resultado = $query->get_result();
$users = [];
while ($row = $resultado->fetch_assoc()) {
    $users[] = $row;
}
echo json_encode($users);