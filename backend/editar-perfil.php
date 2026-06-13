<?php
require __DIR__ . '/session.php';
header("Content-Type: application/json");
requiereAutenticacion();
$conexion = require "./db.php";
$id = usuarioId();                      
$email = $_POST["email"] ?? '';
$alias = $_POST["alias"] ?? '';
$genero = $_POST["genero"] ?? '';
$fecha_nacimiento = !empty($_POST["fecha_nacimiento"]) ? "'" . $_POST["fecha_nacimiento"] . "'" : "NULL";
$idioma = $_POST["idioma"] ?? '';
$estado = $_POST["estado"] ?? '';
$resultOld = mysqli_query($conexion, "SELECT img FROM usuario WHERE id=$id");
$oldRow = mysqli_fetch_assoc($resultOld);
$oldImg = $oldRow['img'] ?? null;
$imgPath = null;
if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
    $allowed = ["jpg", "jpeg", "png", "gif", "webp"];
    if (in_array($ext, $allowed)) {
        $filename = time() . "_" . bin2hex(random_bytes(4)) . "." . $ext;
        $imgDir = __DIR__ . "/img/";
        if (!is_dir($imgDir)) {
            mkdir($imgDir, 0755, true);
        }
        move_uploaded_file($_FILES["imagen"]["tmp_name"], __DIR__ . "/img/" . $filename);
        $imgPath = $filename;
    }
}
if ($imgPath && $oldImg && $oldImg !== $imgPath) {
    $oldFile = __DIR__ . "/img/" . $oldImg;
    if (file_exists($oldFile)) {
        unlink($oldFile);
    }
}
if ($imgPath) {
    $sql1 = "UPDATE usuario SET email='$email', alias='$alias', img='$imgPath' WHERE id=$id";
} else {
    $sql1 = "UPDATE usuario SET email='$email', alias='$alias' WHERE id=$id";
}
$sql2 = "UPDATE perfil SET genero='$genero', fecha_nacimiento=$fecha_nacimiento, idioma='$idioma', estado='$estado' WHERE id=$id";
if (mysqli_query($conexion, $sql1) && mysqli_query($conexion, $sql2)) {
    $_SESSION['alias'] = $alias;
    $_SESSION['email'] = $email;
    if ($imgPath) $_SESSION['img'] = $imgPath;
    echo json_encode(["success" => true, "message" => "Perfil actualizado correctamente"]);
} else {
    if ($imgPath) {
        unlink(__DIR__ . "/img/" . $imgPath);
    }
    echo json_encode(["error" => "Error al actualizar el perfil: " . mysqli_error($conexion)]);
}