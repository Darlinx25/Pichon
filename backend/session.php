<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_name('PICHON_SESSION');
session_start();
$allowed_origins = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:8082'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
function requiereAutenticacion(): void {
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(["error" => "No autenticado"]);
        exit;
    }
}
function usuarioId(): int {
    return (int)($_SESSION['user_id'] ?? 0);
}
function usuarioDatos(): array {
    return [
        'id'       => $_SESSION['user_id'] ?? 0,
        'username' => $_SESSION['username'] ?? '',
        'alias'    => $_SESSION['alias'] ?? '',
        'img'      => $_SESSION['img'] ?? null,
        'email'    => $_SESSION['email'] ?? ''
    ];
}