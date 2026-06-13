<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
if (empty($_SESSION['user_id'])) {
    echo json_encode(["authenticated" => false]);
    exit;
}
echo json_encode([
    "authenticated" => true,
    "user" => usuarioDatos()
]);