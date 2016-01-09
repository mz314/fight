<?php

namespace Fight;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Server implements MessageComponentInterface
{
    const
        BCAST_SENDER = 0,
        BCAST_CONNECTIONS = 1,
        BCAST_PLAYERS = 2

    ;
    protected $clients, $sessions, $connection_ids;

    public function __construct()
    {
        $this->clients        = new \SplObjectStorage;
        $this->connection_ids = [];
        $this->sessions       = [];
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        $this->connection_ids[$conn->resourceId] = $conn;
        //var_dump($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    protected function broadcast($connections, $from, $data, $type)
    {
        $msg = json_encode($data);

        if ($type == self::BCAST_SENDER) {
            $from->send($data);
        }

        foreach ($connections as $connection) {
            if ($type == self::BCAST_CONNECTIONS) {
                $connection->send($msg);
            } else if ($type == self::BCAST_PLAYERS) {
                $connection->getConnection()->send($msg);
            }
        }
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        // var_dump($msg);
        $data         = json_decode($msg);
        $result       = new \stdClass;
        $result->type = $data->type;

        switch ($data->type) {
            case 'new_session':
                $session                                  = new Session($data->name);
                $this->sessions[$session->getSessionId()] = $session;
                $result->output                           = ['session_id' => $session->getSessionId()];
                foreach ($this->clients as $connection) {
                    $this->onMessage($connection,
                        json_encode(['type' => 'get_sessions']));
                }
                break;

            case 'get_sessions':
                $sessions = [];
                foreach ($this->sessions as $session) {
                    $sessions[] = $session->getData();
                }

                $result->output = $sessions;
                break;


            case 'join_session':
                $player                            = new Player($data->player,
                    'test_dude', $from);
                $session                           = $this->sessions[$data->session_id];
                $session->addPlayer($player, $from->resourceId);
                $this->sessions[$data->session_id] = $session;
                $result->output                    = [
                    'session_id' => $data->session_id,
                    'player_id' => $player->getId()
                ];
                $result->type                      = 'joined_session';

                foreach ($this->clients as $client) {
                    if ($from == $client) {
                        $result->output['me'] = '1';
                    } else {
                        $result->output['me'] = '0';
                    }

                    $client->send(json_encode($result));
                }
                return;
            //break;
            case 'update_player':
                $session        = $this->sessions[$data->session_id];
                $result->output = $data;
                foreach ($this->clients as $client) {
                    $client->send(json_encode($result));
                }
                return;
        }
        $from->send(json_encode($result));
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {

    }
}