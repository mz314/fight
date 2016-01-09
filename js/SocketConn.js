var socket;

function SocketConn() {
    var self = this;

    self.socket = null;
    self.session_id = null;
    self.send = function (data) {
        self.socket.send(JSON.stringify(data));
    };

    self.sendSession = function (data) {
        data['session_id'] = self.session_id;
        self.send(data);
    };

    self.handlers = {
        'get_sessions': function (data) {
        },
        'new_session': function (data) {
        },
        'joined_session': function (data) {
            self.session_id = data.session_id;
            console.log('player', data);
            self.handlers.joined_session_after(data);
        },
        'joined_session_after': function (data) {

        },
        'update_player': function (data) {

        }
    };

    self.handleMessage = function (data) {
        data = $.parseJSON(data);
        self.handlers[data.type](data.output);
    };

    self.init = function () {
        try {
            socket = new WebSocket('ws://127.0.0.1:8080');
            //console.log('WebSocket - status ' + socket.readyState);
            self.socket = socket;
            socket.onopen = function (msg) {
                console.log("Welcome - status " + this.readyState);
                socket.send(JSON.stringify({"type": "get_sessions"}));
            };
            socket.onmessage = function (msg) {
                //console.log("Received: " + msg.data);
                self.handleMessage(msg.data);
            };
            socket.onclose = function (msg) {
                console.log("Disconnected - status " + this.readyState);
            };

        }
        catch (ex) {
            console.log(ex);
        }

    };
}


