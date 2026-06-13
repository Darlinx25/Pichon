<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require "./db.php";
$search = $_GET['search'] ?? '';
$query = $conexion->prepare(
    "SELECT id, alias, img
     FROM usuario
     WHERE alias LIKE CONCAT('%', ?, '%')
     LIMIT 30"
);
$query->bind_param("s", $search);
$query->execute();
$resultado = $query->get_result();
$users = [];
while ($row = $resultado->fetch_assoc()) {
    $users[] = $row;
}
echo json_encode($users);