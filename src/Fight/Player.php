<?php

namespace Fight;

class Player
{
    protected $name, $character, $data, $id, $connection; //data from character json object in JS script

    public function __construct($name, $character, $connection)
    {
        $this->id        = md5(microtime());
        $this->name      = $name;
        $this->character = $character;
        $this->connection = $connection;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function getName()
    {
        return $this->name;
    }
}