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
            $from->userId = (int)$data['userId'];
            $this->userConnections[(int)$data['userId']][] = $from;
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

        if (isset($this->userConnections[$toId])) {
            foreach ($this->userConnections[$toId] as $c) $c->send(json_encode($mensaje));
        }

        $from->send(json_encode($mensaje));
    }

    public function onClose(ConnectionInterface $conn): void
    {
        $this->clients->detach($conn);
    }

    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $conn->close();
    }
}
