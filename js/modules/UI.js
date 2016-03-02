var UI = function () {
    var self = this;
    self.socket_conn = Factory.get('SocketConn');

    self.templatedReplace = function (template, replacements) {
        var html = template;

        for (var i in replacements) {
            to_replace = '[[' + i + ']]';
            if (replacements[i]) {
                html = html.replace(to_replace, replacements[i]);
            } else {
                html = html.replace(to_replace, '');
            }
        }

        return html;
    };

    self.init = function () {
        self.socket_conn.handlers['get_sessions'] = function (data) {
            var
                    template_row = $('#session-list thead .template-row').html(),
                    tbody = $('#session-list tbody');

            $(tbody).html('');
            $(data).each(function () {

                html = self.templatedReplace(template_row, {
                    'name': this.name,
                    'session_id': this.session_id,
                    'session_idname': this.session_id,
                    'players': this.count
                });

                $(tbody).append(html);
            });

        };

        self.socket_conn.handlers['get_players'] = function (data) {
            var
                    template_row = $('#player-list thead .template-row').html(),
                    tbody = $('#player-list tbody');
            console.log(data);
            $(data).each(function () {
                
                html = self.templatedReplace(template_row, {
                    'name': this.name,
                    'character': this.character,
                    'id': this.id
                });

                $(tbody).append(html);
            });
        };

        $('#session-form').on('click', '#add-session', function (e) {
            e.preventDefault();
            var sess_name = $('#session-name').val();
            self.socket_conn.send({"type": "new_session", "name": sess_name});
        });

        $('#session-form').on('click', '#register-player', function (e) {
            e.preventDefault();
            self.socket_conn.send({
                "type": "new_player",
                "player": $('#player-name').val()
            });
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