<?php
namespace Pichon;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
class ChatServer implements MessageComponentInterface
{
    protected \SplObjectStorage $clients;
    protected array $userConnections;
    public function __construct()
    {
        $this->clients = new \SplObjectStorage();
        $this->userConnections = [];
    }
    public function onOpen(ConnectionInterface $conn): void
    {
        $this->clients->attach($conn);
        $conn->userId = null;
    }
    public function onMessage(ConnectionInterface $from, $msg): void{
        $data = json_decode($msg, true);
        if (!$data || !isset($data['type'])) return;
        if ($data['type'] === 'auth') {
            $userId = (int)$data['userId'];
            $from->userId = $userId;
            if (!isset($this->userConnections[$userId])) {
                $this->userConnections[$userId] = [];
            }
            if (!in_array($from, $this->userConnections[$userId], true)) {
                $this->userConnections[$userId][] = $from;
            }
            return;
        }
        if ($data['type'] === 'file_notification') {
            $toId = (int)$data['to'];
            $fileMsg = [
                'id_mensaje' => (int)$data['id_mensaje'],
                'id_usuario' => (int)$data['fromId'],
                'id_chat'    => (int)$data['chatId'],
                'contenido'  => $data['contenido'],
                'fecha'      => $data['fecha'],
                'leido'      => 0,
                'tipo'       => $data['tipo'],
                'archivo'    => $data['archivo'],
            ];
            if (isset($this->userConnections[$toId])) {
    foreach ($this->userConnections[$toId] as $c) {
        $c->send(json_encode($fileMsg));
    }
}
            return;
        }
        if ($data['type'] !== 'message') return;
        $db = require __DIR__ . '/../db.php';
        $texto = mysqli_real_escape_string($db, $data['data']);
        $chatId = (int)$data['chatId'];
        $fromId = (int)$data['fromId'];
        $toId = (int)$data['to'];
        mysqli_query($db, "INSERT INTO mensaje (id_chat, id_usuario, contenido, fecha, leido) 
            VALUES ($chatId, $fromId, '$texto', NOW(), 0)");
        $idMensaje = mysqli_insert_id($db);
        $result = mysqli_query($db, "SELECT * FROM mensaje WHERE id_mensaje = $idMensaje");
        $mensaje = mysqli_fetch_assoc($result);
        $mensajeData = [
            'id_mensaje' => (int)$mensaje['id_mensaje'],
            'id_usuario' => (int)$mensaje['id_usuario'],
            'id_chat'    => (int)$mensaje['id_chat'],
            'contenido'  => $mensaje['contenido'],
            'fecha'      => $mensaje['fecha'],
            'leido'      => (int)$mensaje['leido'],
        ];
        if (isset($this->userConnections[$toId])) {
            foreach ($this->userConnections[$toId] as $c) {
                $c->send(json_encode($mensajeData));
            }
        }
        if ($fromId !== $toId) {
            $from->send(json_encode($mensajeData));
        }
    }
    public function onClose(ConnectionInterface $conn): void
    {
        if ($conn->userId !== null && isset($this->userConnections[$conn->userId])) {
            $this->userConnections[$conn->userId] = array_values(
                array_filter(
                    $this->userConnections[$conn->userId],
                    fn($c) => $c !== $conn
                )
            );
        }
        $this->clients->detach($conn);
    }
    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $conn->close();
    }
}