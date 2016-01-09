<?php

namespace Fight;

class Session
{
    protected $name, $players=[], $session_id;

//TODO: level_name
    public function __construct($name)
    {
        $this->name = $name;
        $this->session_id = md5(time());
    }

    public function getData() 
    {
        return [
            'name'=> $this->name,
            'session_id'=>$this->session_id,
            'count'=>$this->countPlayers(),
        ];
    }

    public function countPlayers() {
        return count($this->players);
    }

    public function addPlayer(Player $player, $connection_id)
    {
        $this->players[$connection_id] = $player;
    }

    public function getSessionId()
    {
        return $this->session_id;
    }

    public function getPlayers() {
        return $this->players;
    }

    public function getName()
    {
        return $this->name;
    }
}