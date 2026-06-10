<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$conexion = require "./db.php";

$id_usuario = (int)($_GET['id_usuario'] ?? 0);

if (!$id_usuario) {
    echo json_encode(["error" => "Falta id_usuario"]);
    exit;
}

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