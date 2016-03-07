<?php

namespace Fight;

use Nubs\Vectorix\Vector;

class PlayerState implements SerializableInterface
{
    protected $speed, $acceleration, $position, $lastTimestamp;

    public function __construct()
    {
        $this->lastTimestamp = 0;
        $this->speed        = new Vector(['x' => 0, 'y' => 0]);
        $this->acceleration = new Vector(['x' => 0, 'y' => 0]);
        $this->position     = new Vector(['x' => 0, 'y' => 0]);
    }

    public function getSpeed()
    {
        return $this->speed;
    }

    public function getAcceleration()
    {
        return $this->acceleration;
    }

    public function getPosition()
    {
        return $this->position;
    }

    public function setSpeed($speed)
    {
        $this->speed = $speed;
        return $this;
    }

    public function setAcceleration($acceleration)
    {
        $this->acceleration = $acceleration;
        return $this;
    }

    public function setPosition($position)
    {
        $this->position = $position;
        return $this;
    }

  

    public function processState($data)
    {
        echo "Name {$data->player->state->name}, {$data->player->state->params}, {$data->timestamp} \n";


        $timeDiff = $data->timestamp - $this->lastTimestamp;

        switch($data->player->state->name) {

        }
    }

    public function getData()
    {
        return [
            'speed' => $this->speed->components(),
            'acceleration' => $this->acceleration->components(),
            'position' => $this->position->components(),
        ];
    }
}