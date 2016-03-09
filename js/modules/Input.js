var Input = function () {
    var self = this;
    self.locked = false;
    self.stage_manager = Factory.get('StageManager');
    self.socket_conn = Factory.get('SocketConn');
    self.speed = 60;
    self.keystates = self.oldkeystates = {};
    self.socket_conn.handlers.update_player = function (data) {
        self.stage_manager.changePlayerState(data.player.state);
    };

    self.isStateChanged = function () {
        
        for(i in self.keystates) {
            if(self.keystates[i]!=self.oldkeystates[i]) {
                return true;
            }
        }
        
        return false;
    };

    self.processKeyChange = function (e, down) {
        if (self.locked) {
            return;
        }
        self.oldkeystates = $.extend(true, {}, self.keystates);
        
        if (down) {
            self.keystates[e.keyCode] = true;
        } else {
            self.keystates[e.keyCode] = false;
        }
        
        if (!self.isStateChanged()) {
            return;
        }
        
        switch (e.keyCode) {
            case 65: //A
                self.socket_conn.sendSession({
                    type: 'update_player',
                    player: {'state': {name: 'move', params: 'left', 'down': down,'delta':self.stage_manager.player.clock.getDelta()}},
                });
                break;
            case 68: //D
                self.socket_conn.sendSession({
                    type: 'update_player',
                    player: {'state': {name: 'move', params: 'right', 'down': down,'delta':self.stage_manager.player.clock.getDelta()}},
                    player_id: self.stage_manager.player.id
                });
                break;
        }
    };

    self.bind = function () {
        $(document).on('keydown', function (e) {
            self.processKeyChange(e, true);
        }).on('keyup', function (e) {
            self.processKeyChange(e, false);
        });
    };

    self.bind();
};

