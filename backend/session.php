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
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (preg_match('#^https?://(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?$#', $origin)) {
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