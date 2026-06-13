<?php
require __DIR__ . '/session.php';       
header("Content-Type: application/json");
$conexion = require "./db.php";
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirm  = $_POST["confirmPassword"];
$alias    = $_POST["alias"];
if ($password != $confirm) {
    echo json_encode(["error" => "Las contraseñas no coinciden"]);
    exit;
}
$sql = "SELECT id FROM usuario WHERE username = '$username'";
$resultado = mysqli_query($conexion, $sql);
if (mysqli_num_rows($resultado) > 0) {
    echo json_encode(["error" => "El username ya existe"]);
    exit;
}
$query = "SELECT id FROM usuario WHERE email = '$email'";
$resultado2 = mysqli_query($conexion, $query);
if (mysqli_num_rows($resultado2) > 0) {
    echo json_encode(["error" => "El correo ya está en uso"]);
    exit;
}
$hash = password_hash($password, PASSWORD_BCRYPT);
$imgPath = null;
if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] === UPLOAD_ERR_OK) {
    $ext = strtolower(pathinfo($_FILES["imagen"]["name"], PATHINFO_EXTENSION));
    $allowed = ["jpg", "jpeg", "png", "gif", "webp"];
    if (in_array($ext, $allowed)) {
        $filename =  time() . "_" . bin2hex(random_bytes(4)) . "." . $ext;
        $imgDir = __DIR__ . "/img/";
        if(!is_dir($imgDir)){
            mkdir($imgDir, 0755, true);
        }
        move_uploaded_file($_FILES["imagen"]["tmp_name"], __DIR__ . "/img/" . $filename);
        $imgPath =  $filename;
    }
}

$sql = "INSERT INTO usuario (username, email, password, alias, img) VALUES ('$username', '$email', '$hash', '$alias', '$imgPath')";
if (mysqli_query($conexion, $sql)) {
    $idUsuario = mysqli_insert_id($conexion);
    $sql2 = "INSERT INTO perfil (id) VALUES ($idUsuario)";
    if (mysqli_query($conexion, $sql2)) {
        echo json_encode([
            "success" => true,
            "message" => "Usuario creado correctamente"
        ]);
    } else {
        echo json_encode([
            "error" => "Error al crear el perfil"
        ]);
    }
} else {
    echo json_encode(["error" => "Error al crear usuario"]);
}


?>