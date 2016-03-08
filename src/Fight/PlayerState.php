<?php

namespace Fight;

use Nubs\Vectorix\Vector;

class PlayerState implements SerializableInterface
{
    protected $velocity, $acceleration, $position, $lastTimestamp, $processor;

    public function __construct()
    {
        $this->lastTimestamp = 0;
        $this->velocity        = new Vector(['x' => 0, 'y' => 0]);
        $this->acceleration = new Vector(['x' => 0, 'y' => 0]);
        $this->position     = new Vector(['x' => 0, 'y' => 0]);
    }
    
    static protected function vectorCompareNull($value, $index, Vector $vector) {
        if($value===null) {
            $vector->components()[$index];
        } else {
            return $value;
        }
    }
    
    static protected function vectorSet($x, $y, $vector) {
        
    }
    
    public function setProcessor(StateProcessor $processor)
    {
        $this->processor = $processor;
        return $this;
    }
    
    public function getProcessor()
    {
        return $this->processor;
    }

    public function getVelocity()
    {
        return $this->velocity;
    }

    public function getAcceleration()
    {
        return $this->acceleration;
    }

    public function getPosition()
    {
        return $this->position;
    }

    public function setVelocity($x, $y)
    {
        $this->velocity = new Vector(['x' => $x, 'y' => $y]);
        return $this;
    }

    public function setAcceleration($x, $y)
    {
        $this->acceleration = new Vector(['x' => $x, 'y' => $y]);
        return $this;
    }

    public function setPosition($x, $y)
    {
        $this->position = new Vector(['x' => $x, 'y' => $y]);
        return $this;
    }


    public function getData()
    {
        return [
            'velocity' => $this->velocity->components(),
            'acceleration' => $this->acceleration->components(),
            'position' => $this->position->components(),
        ];
    }
}