<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit; }

$conexion = require __DIR__ . '/db.php';
$userId = (int)$_GET['id_usuario'];
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