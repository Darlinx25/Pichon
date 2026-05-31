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
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];

$sql = "SELECT id, username, password, alias, img FROM usuario WHERE username = '$username'";
$resultado = mysqli_query($conexion, $sql);
if (mysqli_num_rows($resultado) == 0) {
    echo json_encode(["error" => "Credenciales inválidas"]);
    exit;
}
$user = mysqli_fetch_assoc($resultado);
if (!password_verify($password, $user["password"])) {
    echo json_encode(["error" => "Credenciales inválidas"]);
    exit;
}
echo json_encode([
    "success" => true,
    "user" => [
        "id"       => $user["id"],
        "username" => $user["username"],
        "alias"    => $user["alias"],
        "img"      => $user["img"]
    ]
]);