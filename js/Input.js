var Input = function (stage_manager, socket_conn) {
    var self = this;
    self.locked = false;
    self.stage_manager = stage_manager;
    self.socket_conn = socket_conn;
    self.speed = 60;

    self.socket_conn.handlers.update_player = function (data) {
        console.log('update player', data);
        self.stage_manager.changePlayerState(data.player.state);
    };

    self.bind = function () {
        $(document).on('keydown', function (e) {
            if (self.locked) {
                return;
            }

            var data = {
                type: 'update_player',
                'player': null
            };

            switch (e.key) {
                case 'a':
                    self.socket_conn.sendSession({
                        'type': 'update_player',
                        'player': {'state': {name: 'move', params: 'left'}},
                         player_id: self.stage_manager.player.id
                    });
                    break;
                case 'd':
                    //'player': self.stage_manager.getPlayerEssential()
                    self.socket_conn.sendSession({
                        'type': 'update_player',
                         player_id: self.stage_manager.player.id,
                        'player': {'state': {name: 'move', params: 'right'}}
                    });
                    break;
                case 'w':
//                    self.stage_manager.changePlayerState({
//                        'name': 'jump'
//                    });
                    break;
                case 's':

                    break;
            }
        }).on('keyup', function (e) {
            if (self.locked) {
                return;
            }

            switch (e.key) {
                case 's':
                case 'w':
//                     self.stage_manager.changePlayerState({
//                        name: 'idle'
//                    });
//                    break;
                    break;
                case 'a':
                case 'd':
                    self.socket_conn.sendSession({
                        'type': 'update_player',
                        'player': {'state': {name: 'stop_movement', params: 'side'}}
                    });
                    break;
            }
        });


    };

    self.bind();
};

