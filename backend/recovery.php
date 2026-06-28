<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
$conexion = require "./db.php";
$email = $_POST["email"];


$query = $conexion->prepare("SELECT id FROM usuario WHERE email = ? AND activado = 1");
$query->bind_param("s", $email);
$query->execute();
$resultado = $query->get_result();
if ($usuario = $resultado->fetch_assoc()) {
    $token = bin2hex(random_bytes(32));
    $update = $conexion->prepare("UPDATE usuario SET token = ? WHERE id = ?");
    $update->bind_param("si", $token, $usuario['id']);
    if ($update->execute()) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $baseUrl = $protocol . '://' . $_SERVER['HTTP_HOST'];
        mandarCorreoRecuperacion($email, $baseUrl, $token);
        echo json_encode(["success" => true, "message" => "Correo de recuperación enviado."]);
    } else {
        echo json_encode(["error" => "Error al enviar correo de recuperación."]);
    }
} else {
    echo json_encode(["error" => "Error al enviar correo de recuperación."]);
}

function mandarCorreoRecuperacion($userEmail, $website, $token) {
    //$website formato: http://website.com o http://localhost:4200
    $activationLink = $website . "/password-reset?token=" . $token;
    $to = $userEmail;
    $subject = "Cambia tu contraseña";
    $message = "Haz click en el link para cambiar tu contraseña:\n\n" . $activationLink;
    $headers = "From: no-reply@pichon.com";
    mail($to, $subject, $message, $headers);
}