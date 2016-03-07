var Input = function () {
    var self = this;
    self.locked = false;
    self.stage_manager = Factory.get('StageManager');
    self.socket_conn = Factory.get('SocketConn');
    self.speed = 60;
    self.keystates = self.prev_keystates = {};
    self.socket_conn.handlers.update_player = function (data) {
        self.stage_manager.changePlayerState(data.player.state);
    };

    self.isStateChanged = function () {
        
    };
    
    self.bind = function () {
        $(document).on('keydown', function (e) {
            if (self.locked) {
                return;
            }
            self.oldkeystates = $.extend(true, {}, self.keystates);
            self.keystates[e.keyCode] = true;

            var data = {
                type: 'update_player',
                'player': null
            };

            switch (e.keyCode) {
                case 65: //A
                    self.socket_conn.sendSession({
                        type: 'update_player',
                        player: {'state': {name: 'move', params: 'left'}},
                        player_id: self.stage_manager.player.id
                    });
                    break;
                case 68: //D
                    self.socket_conn.sendSession({
                        type: 'update_player',
                        player: {'state': {name: 'move', params: 'right'}},
                        player_id: self.stage_manager.player.id
                    });
                    break;
                case 'w':
//
                    break;
                case 's':

                    break;
            }
        }).on('keyup', function (e) {
            if (self.locked) {
                return;
            }
            self.oldkeystates = $.extend(true, {}, self.keystates);
            self.keystates[e.keyCode] = false;
            switch (e.key) {
                case 's':
                case 'w':
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

