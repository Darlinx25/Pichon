<?php
require __DIR__ . '/session.php';
header('Content-Type: application/json');
requiereAutenticacion();
$conexion = require __DIR__ . '/db.php';

if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['error' => 'No se recibió el archivo']);
    exit;
}

$idChat = (int)$_POST['id_chat'];
$idDestinatario = (int)$_POST['id_destinatario'];
$idUsuario = usuarioId();

$ext = strtolower(pathinfo($_FILES['archivo']['name'], PATHINFO_EXTENSION));
$allowed_img = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
$tipo = in_array($ext, $allowed_img) ? 'image' : 'file';

$filename = time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
$archivosDir = __DIR__ . '/archivos/';
if (!is_dir($archivosDir)) {
    mkdir($archivosDir, 0755, true);
}
move_uploaded_file($_FILES['archivo']['tmp_name'], $archivosDir . $filename);

$nombreOriginal = mysqli_real_escape_string($conexion, $_FILES['archivo']['name']);

mysqli_query($conexion, "INSERT INTO mensaje (id_chat, id_usuario, contenido, tipo, archivo, fecha, leido)
    VALUES ($idChat, $idUsuario, '$nombreOriginal', '$tipo', '$filename', NOW(), 0)");

$idMensaje = mysqli_insert_id($conexion);
$result = mysqli_query($conexion, "SELECT * FROM mensaje WHERE id_mensaje = $idMensaje");
$mensaje = mysqli_fetch_assoc($result);

echo json_encode([
    'id_mensaje' => (int)$mensaje['id_mensaje'],
    'id_usuario' => (int)$mensaje['id_usuario'],
    'id_chat'    => (int)$mensaje['id_chat'],
    'contenido'  => $mensaje['contenido'],
    'fecha'      => $mensaje['fecha'],
    'leido'      => (int)$mensaje['leido'],
    'tipo'       => $mensaje['tipo'],
    'archivo'    => $mensaje['archivo'],
]);