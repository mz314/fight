<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require __DIR__.'/vendor/autoload.php';

if ($argc > 1 && $argv[1] == 'raw') {
    $server = IoServer::factory(
            new Fight\Server(), 8080
    );
} else {
    $ws     = new WsServer( new Fight\Server());
    $ws->disableVersion(0);
    $server = IoServer::factory(
            new HttpServer($ws), 8080
    );
}



echo "Running server...\n";
$server->run();
