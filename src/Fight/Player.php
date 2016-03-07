<?php

namespace Fight;

class Player implements SerializableInterface
{
    protected
        $name,
        $character,
        $data, $id,
        $connection,
        $state
    ;

    public function __construct($name, $character, $connection)
    {
        $this->id         = md5(microtime());
        $this->name       = $name;
        $this->character  = $character;
        $this->connection = $connection;
        $this->state      = new PlayerState();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getConnection()
    {
        return $this->connection;
    }

    public function getData()
    {
        return [
            'name' => $this->name,
            'id' => $this->id,
            'character' => $this->character,
            'state' => $this->state->getData(),
        ];
    }

    public function getState()
    {
        return $this->state;
    }

    public function getName()
    {
        return $this->name;
    }
}