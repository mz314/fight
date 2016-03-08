<?php

namespace Fight;

use Nubs\Vectorix\Vector;

class StateProcessor
{

    protected $lastTimestamp = 0, $state;

    public function __construct(PlayerState $state)
    {
        $this->state = $state;
    }

    public function process($data)
    {
        $down = $data->player->state->down;
        echo "Name {$data->player->state->name}, {$data->player->state->params},"
        . " {$data->timestamp}, down: $down \n";


        $timeDiff = $data->timestamp - $this->lastTimestamp;
        

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
    }
}
