<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Pichon\ChatServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    (int) ($_ENV['WS_PORT'] ?? 8081)
);

echo "WebSocket server running on port " . ($_ENV['WS_PORT'] ?? 8081) . "...\n";
$server->run();
