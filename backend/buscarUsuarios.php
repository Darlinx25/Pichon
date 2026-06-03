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

header('Content-Type: application/json');
echo json_encode($users);