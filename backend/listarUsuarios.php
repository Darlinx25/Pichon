<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require "./db.php";
$query = $conexion->prepare("SELECT id, username, alias, img FROM usuario");
$query->execute();
$resultado = $query->get_result();
$users = [];
while ($row = $resultado->fetch_assoc()) {
    $users[] = $row;
}
echo json_encode($users);