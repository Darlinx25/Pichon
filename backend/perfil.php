<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';
$id = (int)$_GET['id'];
$usuario_actual = usuarioId();          
$result = mysqli_query($conexion,
    "SELECT u.id, u.username, u.email, u.alias, u.img,
            p.genero, p.fecha_nacimiento, p.idioma, p.estado
    FROM usuario u
    LEFT JOIN perfil p ON u.id = p.id
    WHERE u.id = $id"
);
$perfil = mysqli_fetch_assoc($result);
if ($perfil && $usuario_actual) {
    $result2 = mysqli_query($conexion,
        "SELECT 1 FROM contactos
        WHERE id_usuario = $usuario_actual AND id_contacto = $id"
    );
    $perfil['esContacto'] = mysqli_fetch_row($result2) ? true : false;
}
echo json_encode($perfil ?: ["error" => "Perfil no encontrado"]);