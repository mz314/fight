<?php

namespace Fight;

use Nubs\Vectorix\Vector;

class StateProcessor
{
    protected $lastTimestamp = 0;

    public function processState($data)
    {
        echo "Name {$data->player->state->name}, {$data->player->state->params}, {$data->timestamp} \n";

        
        $timeDiff = $data->timestamp - $this->lastTimestamp;

        switch($data->player->state->name) {
            
        }
    }
}

