var UI = function () {
    var self = this;
    self.socket_conn = Factory.get('SocketConn');
    self.init = function () {
        self.socket_conn.handlers['get_sessions'] = function (data) {
            $('#session-list tbody').html('');
            $(data).each(function () {
                $('#session-list tbody').append('<tr><td><a href="'
                        + this.session_id + '">'
                        + this.name + '</a></td><td>'
                        + this.session_id + '</td><td>'
                        + this.count + '</td></tr>');
            });
        };

        $('#session-form').submit(function (e) {
            e.preventDefault();
            var sess_name = $('#session-name').val();
            self.socket_conn.send({"type": "new_session", "name": sess_name});
        });

        $('#session-list').on('click', 'a', function (e) {
            e.preventDefault();
            self.socket_conn.send({
                'type': 'join_session', 
                'session_id': $(this).attr('href'),
                'player': $('#player-name').val()
            });
        });
    };
};