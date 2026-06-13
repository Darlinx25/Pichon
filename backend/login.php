<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
$conexion = require "./db.php";
$data = json_decode(file_get_contents("php://input"), true);
$username = $data["username"];
$password = $data["password"];
$sql = "SELECT id, username, email, password, alias, img FROM usuario WHERE username = '$username'";
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
$_SESSION['user_id']  = (int)$user["id"];
$_SESSION['username'] = $user["username"];
$_SESSION['alias']    = $user["alias"];
$_SESSION['img']      = $user["img"];
$_SESSION['email']    = $user["email"];
echo json_encode([
    "success" => true,
    "user"    => usuarioDatos()
]);