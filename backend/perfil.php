<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
$conexion = require __DIR__ . '/db.php';
$id = (int)$_GET['id'];
$result = mysqli_query($conexion,
    "SELECT u.id, u.username, u.email, u.alias, u.img,
            p.genero, p.fecha_nacimiento, p.idioma, p.estado
     FROM usuario u
     LEFT JOIN perfil p ON u.id = p.id
     WHERE u.id = $id"
);
$perfil = mysqli_fetch_assoc($result);
echo json_encode($perfil ?: ["error" => "Perfil no encontrado"]);