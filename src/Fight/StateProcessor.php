<?php

namespace Fight;

use Nubs\Vectorix\Vector;

class StateProcessor
{
    protected $delta = 0, $state;

    public function __construct(PlayerState $state)
    {
        $this->state = $state;
    }

    public function getDelta()
    {
        return $this->delta;
    }

    public function calculatePositionChange()
    {
        $velocity = $this->state->getVelocity()->components();
        $postion = $this->state->getPosition()->components();
        //$positionAdd = $velocity->multiplyByScalar($this->delta);

        $positionAdd = [
            'x' => $velocity['x'] * $this->delta + $postion['x'],
            'y' => $velocity['y'] * $this->delta + $postion['y'],
        ];
        return $positionAdd;
    }

    public function process($data)
    {
        $down        = $data->player->state->down;
        $this->delta = $data->player->state->delta - $this->delta;

        echo "Name {$data->player->state->name}, {$data->player->state->params},"
        ." {$data->player->state->delta}, down: $down \n";

        switch ($data->player->state->name) {
            case 'move':
                if ($down) {
                    if ($data->player->state->params == 'left') {
                        $mult = -1;
                    } else {
                        $mult = 1;
                    }
                    $this->state->setVelocity(100 * $mult, null);
                } else {
                    $this->state->setVelocity(0, null);
                }
                break;
        }

        
        $newPosition = $this->calculatePositionChange();
        
        $this->state->setPosition($newPosition['x'], $newPosition['y']);
    }
}